import React, { Fragment, useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import Navbar from "../../components/Navbar";
import PageTitle from "../../components/pagetitle";
import Footer from "../../components/footer";
import Scrollbar from "../../components/scrollbar";
import { addToCart } from "../../store/actions/action";
import CategorySelector from "../../components/CategorySelector";
import RentalProductGrid from "../../components/RentalProductGrid";
import { supabase } from "../../lib/supabaseClient";
import { useRouter } from "next/router";

const ShopPage = (props) => {
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const productGridRef = useRef(null);
  const scrollOffset = 140; // adjust for fixed header so first row isn't hidden

  // Fetch products from Supabase
  useEffect(() => {
    fetchProducts();
  }, []);

  // Preselect category from URL query (?category=chair|table|tent|accessories)
  useEffect(() => {
    if (!router.isReady) return;
    const q = (router.query?.category || "").toString().toLowerCase();
    const allowed = new Set(["chair", "table", "tent", "accessories"]);
    if (q && allowed.has(q)) {
      setSelectedCategory(q);
    }
  }, [router.isReady, router.query?.category]);

  // Search term from URL (?search=...)
  const searchQuery = (router.query?.search || "").toString().trim();

  // Auto-scroll to items grid when a category is selected or search is applied
  useEffect(() => {
    if (!selectedCategory && !searchQuery) return;
    if (loading) return;
    // wait for layout/paint
    requestAnimationFrame(() => {
      const el = productGridRef.current;
      if (!el) return;
      const top = el.getBoundingClientRect().top + window.scrollY - scrollOffset;
      window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
    });
  }, [selectedCategory, searchQuery, loading]);

  // Filter products when category or search changes (regex match on search)
  useEffect(() => {
    let filtered = products;

    // Category filter
    if (selectedCategory) {
      filtered = filtered.filter((p) => p.category === selectedCategory);
    }

    // Search filter: regex match + relevance sort (better fits first)
    if (searchQuery) {
      const q = searchQuery.toLowerCase().trim();
      const categoryMap = { chair: "chair", chairs: "chair", table: "table", tables: "table", tent: "tent", tents: "tent", accessory: "accessories", accessories: "accessories", linen: "accessories", linens: "accessories" };
      const exactCategory = categoryMap[q] || (["chair", "table", "tent", "accessories"].includes(q) ? q : null);
      // When search is exactly a category name (e.g. "table"), only show that category
      if (exactCategory) {
        filtered = filtered.filter((p) => (p.category || "").toLowerCase() === exactCategory);
      } else {
        const escaped = searchQuery.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        const regex = new RegExp(escaped, "i");
        const wordRegex = new RegExp(`\\b${escaped}\\b`, "i");

        const scoreProduct = (p) => {
          const name = (p.name || "").toString();
          const desc = (p.description || "").toString();
          const shortDesc = (p.short_description || "").toString();
          const sku = (p.sku || "").toString();
          const cat = (p.category || "").toString();
          const tags = Array.isArray(p.tags)
            ? p.tags.filter((tag) => !String(tag).startsWith("secondary_image:"))
            : [];

          let score = 0;
          if (regex.test(name)) {
            score += 100;
            if (name.toLowerCase().startsWith(q)) score += 30;
            else if (wordRegex.test(name)) score += 15;
          }
          if (regex.test(sku)) score += 90;
          if (regex.test(cat)) score += 70;
          if (tags.some((t) => regex.test(String(t)))) score += 60;
          if (regex.test(shortDesc)) score += 40;
          if (regex.test(desc)) score += 20;

          return score;
        };

        const withScores = filtered.map((p) => ({ p, score: scoreProduct(p) }));
        filtered = withScores
          .filter(({ score }) => score > 0)
          .sort((a, b) => b.score - a.score)
          .map(({ p }) => p);
      }
    }

    setFilteredProducts(filtered);
  }, [selectedCategory, products, searchQuery]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("name", { ascending: true });

      if (error) {
        console.error("Error fetching products:", error);
      } else {
        const normalized = (data || []).map((p) => {
          // Derive local image path: /images/boris/rental_equipment/<category>/<sku>.<ext>
          const safeCategory = (p.category || "").toString().trim().toLowerCase().replace(/\s+/g, "-");
          const safeSku = (p.sku || "").toString().trim().toLowerCase().replace(/\s+/g, "-");
          const imgBase = safeCategory && safeSku ? `/images/boris/rental_equipment/${safeCategory}/${safeSku}` : null;
          // Prefer inventory-provided image paths; fallback to the legacy SKU-derived path.
          const derivedUrl = p.image_url || (imgBase ? `${imgBase}.png` : "/images/placeholder-product.jpg");
          return {
            ...p,
            image_url: derivedUrl,
            active: true, // auto-mark available for now
            imgBase: imgBase,
          };
        });
        setProducts(normalized);
        setFilteredProducts(normalized);
      }
    } catch (err) {
      console.error("Exception fetching products:", err);
    } finally {
      setLoading(false);
    }
  };

  const addToCartProduct = (product, qty = 1) => {
    // Transform Supabase product to match cart format
    const cartProduct = {
      id: product.id,
      title: product.name,
      slug: product.slug,
      price: parseFloat(product.price),
      proImg: product.image_url || "/images/placeholder-product.jpg",
      qty: qty,
    };
    props.addToCart(cartProduct, qty);
  };

  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId);
    // Keep URL in sync so links/bookmarks work
    const nextQuery = { ...router.query };
    if (categoryId) nextQuery.category = categoryId;
    else delete nextQuery.category;
    router.replace({ pathname: "/shop", query: nextQuery }, undefined, { shallow: true });
  };

  const clearSearch = () => {
    const nextQuery = { ...router.query };
    delete nextQuery.search;
    router.replace({ pathname: "/shop", query: nextQuery }, undefined, { shallow: true });
  };

  return (
    <Fragment>
      <Navbar alwaysWhite withOffsetBand />
      <PageTitle pageTitle={"Browse Our Rental Inventory"} pagesub={"Rentals"} />

      <CategorySelector
        selectedCategory={selectedCategory}
        onCategorySelect={handleCategorySelect}
      />

      {searchQuery && (
        <div style={{
          maxWidth: 1200, margin: "0 auto 20px", padding: "0 20px",
          display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap"
        }}>
          <span style={{ color: "rgba(47,47,47,0.8)", fontSize: 15 }}>
            Search results for &ldquo;{searchQuery}&rdquo; ({filteredProducts.length} item{filteredProducts.length !== 1 ? "s" : ""})
          </span>
          <button
            type="button"
            onClick={clearSearch}
            style={{
              padding: "6px 14px", fontSize: 13, background: "#E9E1D3", border: "1px solid #D4C9B8",
              borderRadius: 4, cursor: "pointer", color: "#1B1B1B"
            }}
          >
            Clear search
          </button>
        </div>
      )}

      <div ref={productGridRef}>
        <RentalProductGrid
          products={filteredProducts}
          addToCartProduct={addToCartProduct}
          loading={loading}
          searchQuery={searchQuery}
          selectedCategory={selectedCategory}
        />
      </div>

      <Footer />
      <Scrollbar />
    </Fragment>
  );
};

export default connect(null, { addToCart })(ShopPage);

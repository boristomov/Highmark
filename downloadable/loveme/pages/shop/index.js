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

  // Auto-scroll to items grid when a category is selected
  useEffect(() => {
    if (!selectedCategory) return;
    if (loading) return;
    // wait for layout/paint
    requestAnimationFrame(() => {
      const el = productGridRef.current;
      if (!el) return;
      const top = el.getBoundingClientRect().top + window.scrollY - scrollOffset;
      window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
    });
  }, [selectedCategory, loading]);

  // Filter products when category changes
  useEffect(() => {
    if (selectedCategory) {
      const filtered = products.filter(
        (product) => product.category === selectedCategory
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products);
    }
  }, [selectedCategory, products]);

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
          // Start with .png; component will fallback to other extensions on error
          const derivedUrl = imgBase ? `${imgBase}.png` : (p.image_url || "/images/placeholder-product.jpg");
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

  return (
    <Fragment>
      <Navbar alwaysWhite withOffsetBand />
      <PageTitle pageTitle={"Browse Our Rental Inventory"} pagesub={""} />

      <CategorySelector
        selectedCategory={selectedCategory}
        onCategorySelect={handleCategorySelect}
      />

      <div ref={productGridRef}>
        <RentalProductGrid
          products={filteredProducts}
          addToCartProduct={addToCartProduct}
          loading={loading}
        />
      </div>

      <Footer />
      <Scrollbar />
    </Fragment>
  );
};

export default connect(null, { addToCart })(ShopPage);

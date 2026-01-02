import { useEffect, useState } from 'react';
import { getProducts } from '../lib/api/products';

export default function TestDB() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const data = await getProducts();
                setProducts(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    if (loading) return <div style={{ padding: '50px' }}>Loading...</div>;
    if (error) return <div style={{ padding: '50px', color: 'red' }}>Error: {error}</div>;

    return (
        <div style={{ padding: '50px' }}>
            <h1>✅ Database Connected!</h1>
            <h2>Products ({products.length}):</h2>
            {products.map(p => (
                <div key={p.id} style={{ marginBottom: '20px', padding: '15px', border: '1px solid #ddd' }}>
                    <h3>{p.name}</h3>
                    <p><strong>Category:</strong> {p.category}</p>
                    <p><strong>Price:</strong> ${p.price}/day</p>
                    <p><strong>Stock:</strong> {p.quantity_available}</p>
                    <p><strong>Tags:</strong> {p.tags?.join(', ')}</p>
                </div>
            ))}
        </div>
    );
}


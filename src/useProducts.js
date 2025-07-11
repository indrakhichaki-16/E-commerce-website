import { useEffect, useState } from 'react';

// Custom hook to fetch products and manage search/filter state
export default function useProducts() {
  const [products, setProducts] = useState([]); // All products
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const [search, setSearch] = useState(""); // Search input value

  useEffect(() => {
    setLoading(true);
    setError(null);
    // Fetch products from API
    fetch('https://dummyjson.com/products?limit=100')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch products');
        return res.json();
      })
      .then(data => setProducts(data.products || []))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  // Filter products by title (case-insensitive)
  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(search.toLowerCase())
  );

  // Return filtered products and search state
  return { products: filteredProducts, loading, error, search, setSearch };
} 
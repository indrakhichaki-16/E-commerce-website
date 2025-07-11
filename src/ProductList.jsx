// Displays a grid of all products, includes search bar and product cards
import React from 'react'
import useProducts from './useProducts'
import ProductItem from './ProductItem'
import './App.css'
import { useNavigate } from 'react-router-dom'

function ProductList() {
  // Custom hook for fetching and filtering products
  const { products, loading, error, search, setSearch } = useProducts()
  const navigate = useNavigate();

  // Show nothing while loading
  if (loading) return null;
  // Show error if data fetch fails
  if (error) return <div>Error: {error}</div>

  return (
    <div className="container">
      {/* Search bar with clear (X) button */}
      <div className="search-bar-wrapper" style={{ position: 'relative' }}>
        <input
          className="search-input"
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        {/* Show clear button only if search is not empty */}
        {search && (
          <button
            className="search-clear-btn"
            style={{
              position: 'absolute',
              right: '1rem',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'none',
              border: 'none',
              fontSize: '2rem',
              color: '#888',
              cursor: 'pointer',
              padding: 0,
              lineHeight: 1
            }}
            aria-label="Clear search"
            onClick={() => {
              setSearch("");
              navigate("/");
            }}
          >
            ×
          </button>
        )}
      </div>
      {/* Product grid or no results card */}
      {products.length === 0 ? (
        // Show a styled card if no products match the search
        <div className="card" style={{ width: '100%', maxWidth: '700px', marginTop: '2rem' }}>
          Sorry, we couldn't find any products for your search.
        </div>
      ) : (
        // Render product cards
      <div className="product-grid">
        {products.map(product => (
          <ProductItem key={product.id} product={product} />
        ))}
      </div>
      )}
    </div>
  )
}

export default ProductList 
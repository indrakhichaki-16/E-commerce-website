// Wishlist page: displays all products added to the wishlist
import React from 'react';
import { useSelector } from 'react-redux';
import { selectWishlistItems } from './cartSlice';
import './App.css';
import ProductItem from './ProductItem';

function Wishlist() {
  // Get wishlist items from Redux store
  const wishlist = useSelector(selectWishlistItems);

  // Show message if wishlist is empty
  if (wishlist.length === 0) {
    return <div className="container"><div className="card">Your wishlist is empty.</div></div>;
  }

  return (
    <div className="container">
      {/* Render wishlist products as product cards */}
      <div className="product-grid" style={{ marginTop: '2.5rem', marginBottom: '2.5rem' }}>
        {wishlist.map(product => (
          <ProductItem key={product.id} product={product} fromWishlist />
        ))}
      </div>
    </div>
  );
}

export default Wishlist; 
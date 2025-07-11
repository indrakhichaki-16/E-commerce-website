// Importing necessary modules and hooks
import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCartCount } from './cartSlice';
import logo from './logo.png';

function Header() {
  const cartCount = useSelector(selectCartCount);   // Get the total number of items in the cart from Redux store
  const navigate = useNavigate();   // Hook to navigate programmatically
  return (
    <>
      {/* Main header */}
      <header className="app-header">
        {/* Logo and site name - clicking redirects to home */}
        <div className="header-logo" onClick={() => navigate('/')} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <img src={logo} alt="ShoppyGlobe Logo" className="header-logo-img" style={{ height: '2.2rem', width: '2.2rem', objectFit: 'contain', borderRadius: '6px', boxShadow: '0 1px 4px rgba(80,80,180,0.10)' }} />
          <span style={{ fontWeight: 'bold', fontSize: '1.5rem', letterSpacing: '0.5px' }}>ShoppyGlobe</span>
        </div>
        {/* Center section with Home button */}
        <div className="header-center">
          <button
            className="home-btn"
            onClick={() => navigate('/')}
          >
            Home
          </button>
        </div>
        {/* Right side icons - Wishlist and Cart */}
        <div className="header-icons">
          {/* Wishlist Icon - redirects to wishlist page */}
          <span
            role="img"
            aria-label="wishlist"
            className="wishlist-icon"
            title="View Wishlist"
            onClick={() => navigate('/wishlist')}
          >
          ♥
          </span>
          {/* Cart Icon with item count - redirects to cart page */}
          <div onClick={() => navigate('/cart')} style={{ display: 'flex', alignItems: 'center' }}>
            <span
              role="img"
              aria-label="cart"
              className="cart-icon"
              title="View Cart"
            >
            🛒
            </span>
            <span>{cartCount}</span>
          </div>
        </div>
      </header>
      {/* Placeholder div to prevent layout shift due to fixed header */}
      <div className="header-placeholder"></div>
    </>
  );
}

export default Header; 
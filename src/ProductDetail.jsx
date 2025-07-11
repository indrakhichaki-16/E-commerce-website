// Product detail page: shows detailed info for a single product
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, addToWishlist, removeFromWishlist, selectWishlistItems } from './cartSlice';
import { toast } from 'react-toastify';

function ProductDetail() {
  // Get product ID from URL params
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  // Get wishlist items from Redux store
  const wishlist = useSelector(selectWishlistItems);

  useEffect(() => {
    setLoading(true);
    setError(null);
    // Fetch product details from API
    fetch(`https://dummyjson.com/products/${id}`)
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch product');
        return res.json();
      })
      .then(data => {
        setProduct(data);
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  // Show loading or error states
  if (loading) return <div className="container"><div>Loading product...</div></div>;
  if (error) return <div className="container"><div style={{ color: 'red' }}>{error}</div></div>;
  if (!product) return <div className="container"><div>Product not found.</div></div>;

  // Check if product is in wishlist
  const isWishlisted = wishlist.some(i => i.id === product.id);
  // Convert price to INR
  const inrPrice = Math.round(product.price * 85);

  return (
    <div className="container" style={{ position: 'relative' }}>
      {/* Back button to product list */}
      <button
        className="back-to-products-btn"
        onClick={() => navigate('/')}
      >
        Back to products
      </button>
      <div className="card">
        {/* Product image */}
        <img src={product.thumbnail} alt={product.title} style={{ width: '100%', height: '250px', objectFit: 'contain', borderRadius: '6px', marginBottom: '1rem' }} />
        {/* Product title and wishlist icon */}
        <h2 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          {product.title}
          <span
            role="img"
            aria-label="wishlist"
            className="wishlist-icon"
            style={{ fontSize: '2rem', color: isWishlisted ? '#e11d48' : '#aaa', cursor: 'pointer' }}
            title={isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
            onClick={() => {
              if (isWishlisted) {
                dispatch(removeFromWishlist(product.id));
                toast.info('Product removed from wishlist!');
              } else {
                dispatch(addToWishlist(product));
                toast.success('Product added to wishlist!');
              }
            }}
          >
            {isWishlisted ? '♥' : '♡'}
          </span>
        </h2>
        {/* Product price */}
        <p style={{ fontWeight: 'bold' }}>Price: ₹{inrPrice}</p>
        {/* Product description */}
        <p>{product.description}</p>
        {/* Quantity input and Add to Cart button */}
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
          <label htmlFor="quantity" style={{ marginRight: '0.5rem', fontWeight: 500 }}>Quantity</label>
          <input
            id="quantity"
            type="number"
            min="1"
            value={quantity}
            onChange={e => setQuantity(Math.max(1, Number(e.target.value)))}
            style={{ width: '60px', marginRight: '1rem', padding: '4px 8px', height: '32px' }}
          />
          <button onClick={() => {
            dispatch(addToCart({ ...product, quantity }));
            toast.success('Product added to cart!');
          }}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail; 
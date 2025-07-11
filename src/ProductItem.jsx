// Represents a single product card in the product grid
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, addToWishlist, removeFromWishlist, selectWishlistItems } from './cartSlice'
import { toast } from 'react-toastify'
import './App.css'

function ProductItem({ product, fromWishlist }) {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  // Get wishlist items from Redux store
  const wishlist = useSelector(selectWishlistItems)
  // Check if this product is in the wishlist
  const isWishlisted = wishlist.some(i => i.id === product.id)
  // Convert price to INR
  const inrPrice = Math.round(product.price * 85)

  return (
    <div className="product-card">
      {/* Make the card content clickable to go to product detail */}
      <div
        className="product-card-content clickable"
        onClick={() => navigate(`/product/${product.id}`)}
        style={{ cursor: 'pointer', width: '100%' }}
      >
        <img src={product.thumbnail} alt={product.title} />
        <h3>{product.title}</h3>
        <p>₹{inrPrice}</p>
      </div>
      <div className="card-actions">
        {/* Add to Cart button, also removes from wishlist if on wishlist page */}
        <button
          onClick={e => {
            e.stopPropagation();
            dispatch(addToCart({ ...product, quantity: 1 }))
            if (fromWishlist) {
              dispatch(removeFromWishlist(product.id));
              toast.success('Product added to cart!');
            } else {
              toast.success('Product added to cart!');
            }
          }}
        >Add to Cart</button>
        {/* Wishlist icon toggles wishlist state */}
        <span
          className="wishlist-icon"
          style={{ color: isWishlisted ? '#e11d48' : '#aaa', marginLeft: '1rem', cursor: 'pointer' }}
          onClick={e => {
            e.stopPropagation();
            if (isWishlisted) {
              dispatch(removeFromWishlist(product.id))
              toast.info('Product removed from wishlist!')
            } else {
              dispatch(addToWishlist(product))
              toast.success('Product added to wishlist!')
            }
          }}
        >
          {isWishlisted ? '♥' : '♡'}
        </span>
      </div>
    </div>
  )
}

export default ProductItem 
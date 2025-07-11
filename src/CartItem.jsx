// Represents a single item in the cart, allows quantity update and removal
import React from 'react'
import './App.css'
import { useNavigate } from 'react-router-dom'

function CartItem({ item, updateCartItem, removeFromCart }) {
  const navigate = useNavigate();
  return (
    // Make the entire cart item clickable to go to product detail
    <div className="cart-item" style={{ cursor: 'pointer' }} onClick={() => navigate(`/product/${item.id}`)}>
      <img src={item.thumbnail} alt={item.title} />
      <div>
        <h4>{item.title}</h4>
        {/* Show price in INR and quantity */}
        <p>₹{Math.round(item.price * 85)} x {item.quantity}</p>
        <div className="cart-actions">
          <label className="qty-label" htmlFor={`qty-${item.id}`}>Qty</label>
          {/* Quantity input, stops click propagation */}
          <input
            className="qty-input"
            id={`qty-${item.id}`}
            type="number"
            min="1"
            value={item.quantity}
            onClick={e => e.stopPropagation()}
            onChange={e => updateCartItem(item.id, Number(e.target.value))}
          />
          {/* Remove button, stops click propagation */}
          <button className="remove-btn" onClick={e => { e.stopPropagation(); removeFromCart(item.id); }}>Remove</button>
        </div>
      </div>
    </div>
  )
}
export default CartItem
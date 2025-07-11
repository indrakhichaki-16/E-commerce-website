// Importing necessary modules and hooks
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectCartItems, clearCart } from './cartSlice';
import './App.css';

function Checkout() {
  const cart = useSelector(selectCartItems);  // Getting cart items from Redux state
  const dispatch = useDispatch();   // Hook to dispatch Redux actions
  const navigate = useNavigate();   // Hook to navigate between routes
  // Calculate the total price in INR (price assumed in USD by default, converted to INR using 85 multiplier)
  const total = cart.reduce((sum, item) => sum + Math.round(item.price * 85) * item.quantity, 0);

  return (
    <div className="container">
      <div className="card">
        <h2>Checkout</h2>
        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {cart.map(item => (
                <li key={item.id} style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                  <img src={item.thumbnail} alt={item.title} style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '4px' }} />
                  <span>{item.title} x {item.quantity} = ₹{Math.round(item.price * 85) * item.quantity}</span>
                </li>
              ))}
            </ul>
            <h3>Total: ₹{total}</h3>
            <button
              onClick={() => {
                dispatch(clearCart());
                navigate('/order-success');
              }}
              style={{ padding: '0.5rem 1rem', background: '#282c34', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
            >
              Place Order & Clear Cart
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default Checkout; 
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectCartItems, updateCartItem, removeFromCart, clearCart } from './cartSlice';
import CartItem from './CartItem';
import { toast } from 'react-toastify';
import './App.css';

function Cart() {
  // Get cart items from Redux store
  const cart = useSelector(selectCartItems);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // Calculate total price
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Show message if cart is empty
  if (cart.length === 0) {
    return <div className="container"><div className="card">Cart is empty.</div></div>;
  }

  return (
    <div className="container" style={{ position: 'relative' }}>
      {/* Button to return to product list */}
      <button
        className="back-to-products-btn"
        onClick={() => navigate('/')}
      >
        Keep shopping
      </button>
      <div className="card" style={{ width: '100%', maxWidth: '700px' }}>
        <h2>Your Cart</h2>
        {/* Render each cart item */}
        {cart.map(item => (
          <CartItem
            key={item.id}
            item={item}
            updateCartItem={(id, qty) => dispatch(updateCartItem({ id, quantity: qty }))}
            removeFromCart={id => {
              dispatch(removeFromCart(id));
              toast.error('Product removed from cart!');
            }}
          />
        ))}
        {/* Show total price */}
        <h3 style={{ alignSelf: 'flex-end' }}>Total: ₹{cart.reduce((sum, item) => sum + Math.round(item.price * 85) * item.quantity, 0)}</h3>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'flex-end', 
          gap: '1rem', 
          marginTop: '1.5rem',
          flexWrap: 'wrap'
        }}>
          {/* Button to clear cart */}
          <button 
            onClick={() => {
              dispatch(clearCart());
            }}
          >
            Clear Cart
          </button>
          {/* Button to proceed to checkout */}
          <button onClick={() => navigate('/checkout')}>
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Cart; 
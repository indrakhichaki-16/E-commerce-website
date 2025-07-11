import React from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';

function OrderSuccess() {
  const navigate = useNavigate();
  return (
    // Returns order confirmation message after checkout
    <div style={{ minHeight: 'calc(100vh - 90px)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <div className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '60vh' }}>
        <div className="card" style={{ padding: '2rem 3rem', textAlign: 'center', borderRadius: '20px', boxShadow: '0 2px 12px rgba(0,0,0,0.12)' }}>
          <h1 style={{ color: '#22c55e', fontSize: '2.2rem', marginBottom: '1rem' }}>Order placed successfully!</h1>
          <p style={{ fontSize: '1.1rem', marginBottom: '2rem' }}>Thank you for shopping with us.</p>
          <button onClick={() => navigate('/')} style={{ padding: '0.7rem 2rem', background: '#282c34', color: 'white', border: 'none', borderRadius: '6px', fontSize: '1rem', cursor: 'pointer' }}>
            Go to Home
          </button>
        </div>
      </div>
    </div>
  );
}

export default OrderSuccess; 
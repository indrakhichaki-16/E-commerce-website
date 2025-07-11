import React from 'react';
import { Link } from 'react-router-dom';
import './App.css';

// Display 404 error message and back to home screen link
function NotFound() {
  return (
    <div className="container">
      <div className="card">
        <h2>404 - Page Not Found</h2>
        <p>The page you are looking for does not exist.</p>
        <Link to="/">Go to Home</Link>
      </div>
    </div>
  );
}

export default NotFound; 
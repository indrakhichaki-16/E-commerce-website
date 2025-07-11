// Main entry point for the React app. Sets up routing and global providers
import React, { Suspense, lazy } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './Header'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './toast-custom.css'

// Lazy load pages for better performance
const ProductList = lazy(() => import('./ProductList'))
const ProductDetail = lazy(() => import('./ProductDetail'))
const Cart = lazy(() => import('./Cart'))
const NotFound = lazy(() => import('./NotFound'))
const Checkout = lazy(() => import('./Checkout'))
const Wishlist = lazy(() => import('./Wishlist'))
const OrderSuccess = lazy(() => import('./OrderSuccess'))

function Spinner() {
  // Custom spinner with overlay for perfect centering
  return (
    <div className="spinner-overlay">
      <div className="spinner" />
    </div>
  );
}

// Footer component for the app
function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <span>&copy; {new Date().getFullYear()} ShoppyGlobe. All rights reserved.</span>
        <span>
          <a href="https://mail.google.com/mail/?view=cm&fs=1&to=support@shoppyglobe.com" target="_blank" className="footer-icon" title="Customer Care Email" aria-label="Customer Care Email">
            {/* Email icon (envelope) */}
            <svg width="1.2em" height="1.2em" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2 6.75A2.75 2.75 0 0 1 4.75 4h14.5A2.75 2.75 0 0 1 22 6.75v10.5A2.75 2.75 0 0 1 19.25 20H4.75A2.75 2.75 0 0 1 2 17.25V6.75Zm2.75-1.25A1.25 1.25 0 0 0 3.5 6.75v.38l8.5 5.67 8.5-5.67v-.38A1.25 1.25 0 0 0 19.25 5H4.75Zm15.75 3.12-7.7 5.14a1 1 0 0 1-1.1 0L3.5 8.12v9.13A1.25 1.25 0 0 0 4.75 18.5h14.5a1.25 1.25 0 0 0 1.25-1.25V8.12Z" fill="currentColor"/></svg>
          </a>
          <a href="tel:+91 9800064000" className="footer-icon" title="Customer Care Phone" aria-label="Customer Care Phone">
            {/* Phone icon */}
            <svg width="1.2em" height="1.2em" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.62 10.79a15.053 15.053 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C10.07 21 3 13.93 3 5a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.46.57 3.58a1 1 0 0 1-.24 1.01l-2.2 2.2Z" fill="currentColor"/></svg>
          </a>
        </span>
      </div>
    </footer>
  );
}

function App() {
  return (
    <>
      <Router>
        {/* Toast notifications for user feedback */}
        <ToastContainer
          position="bottom-center"
          autoClose={2000}
          hideProgressBar
          closeButton={false}
          icon={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss={false}
          draggable={false}
          pauseOnHover={false}
          toastClassName="custom-toast"
          bodyClassName="custom-toast-body"
        />
        {/* Suspense fallback for lazy-loaded routes */}
        <Suspense fallback={<Spinner />}>
          <Routes>
            {/* Each route renders Header and the corresponding page */}
            <Route path="/" element={<><Header /><ProductList /></>} />
            <Route path="/product/:id" element={<><Header /><ProductDetail /></>} />
            <Route path="/cart" element={<><Header /><Cart /></>} />
            <Route path="/checkout" element={<><Header /><Checkout /></>} />
            <Route path="/wishlist" element={<><Header /><Wishlist /></>} />
            <Route path="/order-success" element={<><Header /><OrderSuccess /></>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </Router>
      <Footer />
    </>
  )
}
export default App

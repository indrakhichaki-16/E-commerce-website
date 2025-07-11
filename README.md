# ShoppyGlobe
A modern, responsive e-commerce web application built using React and Vite.

## Key Features
```
- Responsive design with a mobile-friendly user interface
- Header with navigation link for wishlist and shopping cart
- Footer with copyright and customer support contact
- Browse a catalog of products on the Home page, with images, prices (INR), and product details
- View detailed information and images for each product
- Dynamic vertical scrollbar on the product list page for smooth navigation
- Add or remove products from the Wishlist
- Add, update, or remove products in the Cart
- Clear the entire cart with a single click
- Toast notifications implemented to inform users of cart and wishlist actions
- Simple checkout flow with an 'Order Successful' confirmation message
- Local storage used to persist wishlist and cart data across page refreshes
- Custom 404 - Page Not Found for unknown routes
```

## Project Structure
```
ShoppyGlobe/
├── public/
│   └── vite.svg
├── src/
│   ├── assets/
│   │   └── react.svg
│   ├── App.jsx             (Main app component, sets up routing and global providers)
│   ├── App.css
│   ├── Header.jsx          (Top navigation bar with Home, Wishlist, Cart)
│   ├── ProductList.jsx     (Displays all products)
│   ├── ProductDetail.jsx   (Shows details for a single product)
│   ├── ProductItem.jsx
│   ├── Cart.jsx            (Shopping cart logic)
│   ├── CartItem.jsx        (Individual cart item logic)
│   ├── Wishlist.jsx        (Wishlist page logic)
│   ├── Checkout.jsx        (Checkout flow logic)
│   ├── OrderSuccess.jsx    (order confirmation message displayed after checkout)
│   ├── NotFound.jsx
│   ├── cartSlice.js        (Redux slice for cart and wishlist state management)
│   ├── store.js            (Redux store setup)
│   ├── useProducts.js
│   ├── toast-custom.css
│   ├── logo.png, shoppyglobe_icon.png
│   └── index.css
├── index.html
├── package.json
├── vite.config.js
├── eslint.config.js
└── README.md
```

## Technologies Used
```
- React
- Vite - For fast development/build
- Redux Toolkit - state management
- React Router - For routing
- React Toastify - For toast notifications
- CSS - Custom responsive designs
- Javascript - Scripting language
```

## Website Design Flow
```
- Home Page: Product grid, search bar, header navigation
- Product Details: Detailed view, add to cart/wishlist, quantity selection
- Cart: List of cart items, update quantity, remove, clear cart, checkout
- Wishlist: List of wishlisted products, add to cart/remove
- Checkout: Simple checkout and order success page
- 404: Not found page for invalid routes
```

## Running the Application
1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the development server:
   ```bash
   npm run dev
   ```
   The app will be available at [http://localhost:5173] by default.

## GitHub Repository link
```
https://github.com/indrakhichaki-16/E-commerce-website
```

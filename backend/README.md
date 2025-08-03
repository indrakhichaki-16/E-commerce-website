# E-commerce Backend API
A Node.js/Express backend API for the ShoppyGlobe e-commerce application with MongoDB integration, JWT authentication, and comprehensive cart management.

## Features
- **Node.js & Express API Setup** - Complete RESTful API with proper routing
- **MongoDB Integration** - Full CRUD operations on Products and Cart collections
- **JWT Authentication** - Secure user registration and login with token-based auth
- **Cart Management** - Add, update, remove items with quantity validation
- **Error Handling** - Comprehensive error handling and validation
- **Product Management** - Fetch products from external API and store in database

## Project Structure
```
backend/
├── controller/
│   ├── product.controller.js
│   ├── cart.controller.js
│   └── user.controller.js
├── model/
│   ├── product.model.js
│   ├── cart.model.js
│   └── user.model.js
├── routes/
│   ├── product.routes.js
│   ├── cart.routes.js
│   └── user.routes.js
├── server.js
├── package.json
└── README.md
```

## API Endpoints
# Authentication Routes
- `POST /api/register` - Register a new user
- `POST /api/login` - Login user and get JWT token

# Product Routes (Public)
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product by ID

# Cart Routes (Protected - Requires JWT)
- `GET /api/cart` - Get user's cart
- `POST /api/cart` - Add item to cart
- `PUT /api/cart` - Update cart item quantity
- `DELETE /api/cart` - Remove item from cart

## Setup Instructions
# 1. Install Dependencies
```bash
npm install
```

# 2. Environment Variables
A `.env` file is already created in the root directory

# 3. Start the Server
```bash
npm start
```

The server will start on `http://localhost:8080`

## API Usage Examples

# Register a User
```bash
curl -X POST http://localhost:8080/api/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@gmail.com",
    "password": "password123"
  }'
```

# Login
```bash
curl -X POST http://localhost:8080/api/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@gmail.com",
    "password": "password123"
  }'
```

# Get All Products
```bash
curl http://localhost:8080/api/products
```

# Add Item to Cart (Requires JWT)
```bash
curl -X POST http://localhost:8080/api/cart \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "productId": "PRODUCT_ID_HERE",
    "quantity": 2
  }'
```

## Database Schema

### Product Collection
- `id` - Unique product ID
- `title` - Product name
- `description` - Product description
- `category` - Product category
- `price` - Product price
- `stock` - Available stock quantity
- `brand` - Product brand
- `images` - Product images array
- `thumbnail` - Product thumbnail
- And many more fields...

### Cart Collection
- `userId` - Reference to user
- `productId` - Reference to product
- `quantity` - Item quantity
- `price` - Item price
- `title` - Product title
- `brand` - Product brand
- `thumbnail` - Product thumbnail

### User Collection
- `name` - User's full name
- `email` - User's email (unique)
- `password` - User's password
- `isActive` - Account status
- `lastLogin` - Last login timestamp

## Error Handling

The API includes comprehensive error handling:
- Input validation
- Database connection errors
- JWT token validation
- Stock availability checks
- Duplicate user prevention

## Technologies Used

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variables


import express from 'express';
import { getCart, addToCart, updateCartItem, removeFromCart } from "../controller/cart.controller.js";
import { verifyToken } from '../controller/user.controller.js';

const router = express.Router();

// All cart routes require authentication
router.use(verifyToken);

// GET /api/cart - Get user's cart
router.get('/cart', getCart);

// POST /api/cart - Add item to cart
router.post('/cart', addToCart);

// PUT /api/cart - Update cart item quantity
router.put('/cart', updateCartItem);

// DELETE /api/cart - Remove item from cart
router.delete('/cart', removeFromCart);

export default router;
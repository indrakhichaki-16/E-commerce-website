import express from 'express';
import { getAllProducts, getProductById } from "../controller/product.controller.js";

const router = express.Router();

// GET /api/products - Get all products (no authentication required)
router.get('/products', getAllProducts);

// GET /api/products/:id - Get single product by ID (no authentication required)
router.get('/products/:id', getProductById);

export default router;
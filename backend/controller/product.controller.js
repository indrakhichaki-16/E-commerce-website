import Product from "../model/product.model.js";
import fetch from "node-fetch";

// Get all products
export const getAllProducts = async (req, res) => {
    try {
        // Check if products exist in database
        let products = await Product.find({}).sort({ id: 1 });

        // If no products in database, fetch from API and populate
        if (products.length === 0) {
            console.log(' Fetching products from external API...');
            
            const response = await fetch('https://dummyjson.com/products?limit=100');
            
            if (!response.ok) {
                throw new Error(`Failed to fetch products: ${response.status}`);
            }
            
            const data = await response.json();
            // Ensure response contains expected structure
            if (!data.products || !Array.isArray(data.products)) {
                throw new Error('Invalid data structure received from API');
            }

            // Insert products into database
            await Product.insertMany(data.products);
            products = await Product.find({}).sort({ id: 1 });
            console.log(` Successfully imported ${products.length} products`);
        }
        // Respond with products
        res.status(200).json({
            success: true,
            count: products.length,
            data: products
        });
    } catch (error) {
        console.error(' Error fetching products:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch products',
            error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
        });
    }
};

// Get single product by ID
export const getProductById = async (req, res) => {
    try {
        const { id } = req.params;

        // Validate ID format
        if (!id) {
            return res.status(400).json({
                success: false,
                message: 'Product ID is required'
            });
        }

        // Try to find by MongoDB ObjectId first, then by product id
        let product = await Product.findById(id);
        
        if (!product) {
            // Try finding by the numeric id field
            product = await Product.findOne({ id: parseInt(id) });
        }

        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }

        res.status(200).json({
            success: true,
            data: product
        });
    } catch (error) {
        console.error(' Error fetching product:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch product',
            error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
        });
    }
};
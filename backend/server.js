//indrakhi16
//Ix8mbFQwvYxd8yqg
//mongodb+srv://indrakhi16:<db_password>@cluster0.ti4dade.mongodb.net/

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import productRoutes from './routes/product.routes.js';
import cartRoutes from "./routes/cart.routes.js";
import userRoutes from "./routes/user.routes.js";

// Load environment variables
dotenv.config();

const port = process.env.PORT || 8080;
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
const mongoURI = process.env.MONGODB_URI || "mongodb+srv://indrakhi16:Ix8mbFQwvYxd8yqg@cluster0.ti4dade.mongodb.net/ecommerce";

// Connect to MongoDB
mongoose.connect(mongoURI)
    .then(() => {
        console.log(' Connected to MongoDB Atlas successfully!');
        console.log(' Database connected!');
    })
    .catch((err) => {
        console.error(' MongoDB connection failed:', err.message);
        process.exit(1);
    });

// Routes - Order matters! User routes first, then protected routes
app.use('/api', userRoutes);
app.use('/api', productRoutes);
app.use('/api', cartRoutes);

// Global error handler
app.use((err, req, res, next) => {
    console.error(' Server Error:', err.stack);
    res.status(500).json({ 
        message: "Internal server error", 
        error: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong!' 
    });
});

// 404 handler
app.use('*', (req, res) => {
    res.status(404).json({ message: "Route not found!" });
});

// Start server with port conflict handling
const startServer = (port) => {
    const server = app.listen(port, () => {
        console.log(` Server running on http://localhost:${port}`);
        console.log(` JWT Secret: ${process.env.SECRET_KEY ? 'Configured' : 'Using default'}`);
    }).on('error', (err) => {
        if (err.code === 'EADDRINUSE') {
            console.log(`  Port ${port} is already in use. Trying port ${port + 1}...`);
            startServer(port + 1);
        } else {
            console.error(' Server error:', err.message);
            process.exit(1);
        }
    });
};

startServer(port);
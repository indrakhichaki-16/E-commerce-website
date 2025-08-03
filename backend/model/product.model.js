import mongoose from "mongoose";

// Define schema for Product
const productSchema = new mongoose.Schema({
    // Custom numeric ID
    id: {
        type: Number,
        required: true,
        unique: true
    },
    // Name of the product
    title: {
        type: String,
        required: true,
        trim: true
    },
    // Detailed description of the product
    description: {
        type: String,
        required: true
    },
    // Category in which the product belongs
    category: {
        type: String,
        required: true
    },
    // Price of the product
    price: {
        type: Number,
        required: true,
        min: 0
    },
    // Discount percentage if applicable
    discountPercentage: {
        type: Number,
        default: 0,
        min: 0,
        max: 100
    },
    // Average rating of the product
    rating: {
        type: Number,
        default: 0,
        min: 0,
        max: 5
    },
    // Number of products available in stock
    stock: {
        type: Number,
        required: true,
        min: 0
    },
    // Array of tags
    tags: [{
        type: String
    }],
    // Brand of the product
    brand: {
        type: String,
        required: true
    },
    // Product's unique SKU (Stock Keeping Unit)
    sku: {
        type: String,
        unique: true
    },
    // Product's weight
    weight: {
        type: Number,
        default: 0
    },
    // Dimensions of the product
    dimensions: {
        width: Number,
        height: Number,
        depth: Number
    },
    // Warranty information
    warrantyInformation: String,
    // Shipping information
    shippingInformation: String,
    // Availability status
    availabilityStatus: {
        type: String,
        enum: ['In Stock', 'Out of Stock', 'Low Stock'],
        default: 'In Stock'
    },
    // Array of reviews by customers
    reviews: [{
        rating: {
            type: Number,
            min: 1,
            max: 5
        },
        comment: String,
        date: {
            type: Date,
            default: Date.now
        },
        reviewerName: String,
        reviewerEmail: String
    }],
    // Return policy for the product
    returnPolicy: String,
    minimumOrderQuantity: {
        type: Number,
        default: 1,
        min: 1
    },
    // Metadata like creation date, barcode, QR code
    meta: {
        createdAt: {
            type: Date,
            default: Date.now
        },
        updatedAt: {
            type: Date,
            default: Date.now
        },
        barcode: String,
        qrCode: String
    },
    // Array of image URLs
    images: [{
        type: String
    }],
    // Thumbnail image URL
    thumbnail: String
}, {
    // Automatically adds createdAt and updatedAt timestamps
    timestamps: true
});

// Index for better query performance
productSchema.index({ category: 1, brand: 1 });
productSchema.index({ price: 1 });
productSchema.index({ rating: -1 });

// Create the Product model
const Product = mongoose.model('Product', productSchema);
export default Product;
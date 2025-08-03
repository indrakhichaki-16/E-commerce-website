import mongoose from "mongoose";

//Defing the schema for a cart item
const cartItemSchema = new mongoose.Schema({
    // Reference to the user who owns the cart item
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    // Reference to the product added to the cart
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    // Quantity of the product in the cart (default value is 1)
    quantity: {
        type: Number,
        required: true,
        min: 1,
        default: 1
    },
    // Price at the time the item was added
    price: {
        type: Number,
        required: true,
        min: 0
    },
    // Title of the product
    title: {
        type: String,
        required: true
    },
    // Additional product details
    brand: String,
    thumbnail: String,
    addedAt: {
        type: Date,
        default: Date.now
    }
},
// Automatically adds createdAt and updatedAt timestamps 
{
    timestamps: true
});

// Compound index to ensure unique product per user
cartItemSchema.index({ userId: 1, productId: 1 }, { unique: true });

// Create the model from the schema
const Cart = mongoose.model('Cart', cartItemSchema);
export default Cart;
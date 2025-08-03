import Cart from "../model/cart.model.js";
import Product from "../model/product.model.js";

// Get user's cart
export const getCart = async (req, res) => {
    try {
        // Extract user ID from authenticated request
        const userId = req.user.uId;
        // Fetch cart items for the user and populate product details
        const cartItems = await Cart.find({ userId })
            .populate('productId', 'title price thumbnail brand stock') // Only fetch selected fields
            .sort({ createdAt: -1 }); // Most recently added items first
        // Calculate total quantity of items
        const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
        // Calculate total price of cart
        const totalPrice = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

        // Respond with cart details
        res.status(200).json({
            success: true,
            data: {
                items: cartItems,
                totalItems,
                totalPrice: parseFloat(totalPrice.toFixed(2)) // Round to 2 decimal places
            }
        });
    } catch (error) {
        console.error(' Error fetching cart:', error);
        // Return appropriate error in production vs development
        res.status(500).json({
            success: false,
            message: 'Failed to fetch cart',
            error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
        });
    }
};

// Add item to cart
export const addToCart = async (req, res) => {
    try {
        const userId = req.user.uId;
        const { productId, quantity = 1 } = req.body;

        // Validate product ID
        if (!productId) {
            return res.status(400).json({
                success: false,
                message: 'Product ID is required'
            });
        }
        // Validate quantity
        if (quantity < 1) {
            return res.status(400).json({
                success: false,
                message: 'Quantity must be at least 1'
            });
        }
        // Check if product exists
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }
        // Check if product is in stock
        if (product.stock < quantity) {
            return res.status(400).json({
                success: false,
                message: `Only ${product.stock} items available in stock`
            });
        }
        // Check if item already exists in cart
        let cartItem = await Cart.findOne({ userId, productId });
        if (cartItem) {
            // Update quantity if item exists
            const newQuantity = cartItem.quantity + quantity;
            
            if (newQuantity > product.stock) {
                return res.status(400).json({
                    success: false,
                    message: `Cannot add more items. Only ${product.stock} available in stock`
                });
            }
            cartItem.quantity = newQuantity;
            await cartItem.save();
            res.status(200).json({
                success: true,
                message: 'Cart item quantity updated',
                data: cartItem
            });
        } else {
            // Add new item to cart
            const newCartItem = new Cart({
                userId,
                productId,
                quantity,
                price: product.price,
                title: product.title,
                brand: product.brand,
                thumbnail: product.thumbnail
            });
            await newCartItem.save();
            res.status(201).json({
                success: true,
                message: 'Item added to cart successfully',
                data: newCartItem
            });
        }
    } catch (error) {
        console.error(' Error adding to cart:', error);
        // Return appropriate error in production vs development
        res.status(500).json({
            success: false,
            message: 'Failed to add item to cart',
            error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
        });
    }
};

// Update cart item quantity
export const updateCartItem = async (req, res) => {
    try {
        const userId = req.user.uId;
        const { cartItemId, quantity } = req.body;

        // Validate cart item id
        if (!cartItemId) {
            return res.status(400).json({
                success: false,
                message: 'Cart item ID is required'
            });
        }
        // Validate quantity
        if (!quantity || quantity < 1) {
            return res.status(400).json({
                success: false,
                message: 'Valid quantity is required (minimum 1)'
            });
        }
        // Find cart item
        const cartItem = await Cart.findOne({ _id: cartItemId, userId })
            .populate('productId', 'stock');
        // Check if cart item exists
        if (!cartItem) {
            return res.status(404).json({
                success: false,
                message: 'Cart item not found'
            });
        }
        // Check stock availability
        if (quantity > cartItem.productId.stock) {
            return res.status(400).json({
                success: false,
                message: `Only ${cartItem.productId.stock} items available in stock`
            });
        }
        // Update quantity and save
        cartItem.quantity = quantity;
        await cartItem.save();
        res.status(200).json({
            success: true,
            message: 'Cart item updated successfully',
            data: cartItem
        });
    } 
    catch (error) {
        console.error(' Error updating cart item:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to update cart item',
            error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
        });
    }
};

// Remove item from cart
export const removeFromCart = async (req, res) => {
    try {
        const userId = req.user.uId;
        const { cartItemId } = req.body;

        // Validate cart item id
        if (!cartItemId) {
            return res.status(400).json({
                success: false,
                message: 'Cart item ID is required'
            });
        }

        // Find and delete cart item
        const deletedItem = await Cart.findOneAndDelete({ _id: cartItemId, userId });

        if (!deletedItem) {
            return res.status(404).json({
                success: false,
                message: 'Cart item not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Item removed from cart successfully',
            data: deletedItem
        });
    } catch (error) {
        console.error(' Error removing from cart:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to remove item from cart',
            error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
        });
    }
};
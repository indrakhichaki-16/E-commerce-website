import mongoose from "mongoose";

// Define schema for User
const userSchema = new mongoose.Schema({
    // User's full name with validation
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true,
        minlength: [2, 'Name must be at least 2 characters long'],
        maxlength: [50, 'Name cannot exceed 50 characters']
    },
    // User's email
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true,
        trim: true,
        match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
    },
    // User's password
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [6, 'Password must be at least 6 characters long']
    },
    // Account status
    isActive: {
        type: Boolean,
        default: true
    },
    // Last login timestamp
    lastLogin: {
        type: Date,
        default: Date.now
    }
}, 
{
    // Automatically adds createdAt and updatedAt timestamps
    timestamps: true
});

// Create the model
const User = mongoose.model('User', userSchema);
export default User;
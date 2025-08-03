import express from 'express';
import { registerUser, loginUser } from '../controller/user.controller.js';

const router = express.Router();

// POST /api/register - Register new user
router.post('/register', registerUser);

// POST /api/login - Login user
router.post('/login', loginUser);

export default router; 
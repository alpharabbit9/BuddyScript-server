import express from 'express';
import { login, logout, signUp } from '../controllers/auth.controller.js';
import { protectRoute } from '../middleware/auth.middleware.js';


const router = express.Router();

router.post('/signup', signUp)
router.post('/login', login)
router.post('/logout', logout)
router.get('/check', protectRoute, (req, res) => res.status(200).json(req.user))



export default router;
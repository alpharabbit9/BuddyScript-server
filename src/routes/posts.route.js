import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { createPost, getAllPosts } from "../controllers/posts.controller.js";


const router = express.Router();

// Create a new post
router.post("/createPost", protectRoute, createPost);

// Get all posts (sorted by newest first)
router.get("/getAllPost", protectRoute, getAllPosts);

export default router;

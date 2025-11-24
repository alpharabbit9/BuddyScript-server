import express from "express";
import { addComment, getComments, deleteComment } from "../controllers/comment.controller.js";
import {  protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

// Add comment
router.post("/", protectRoute, addComment);

// Get comments for a post
router.get("/:postId", protectRoute, getComments);

// Delete comment
router.delete("/:commentId", protectRoute, deleteComment);

export default router;

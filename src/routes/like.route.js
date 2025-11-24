import express from "express";
import { getLikesByPost, toggleLike } from "../controllers/like.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();


router.get("/:postId", protectRoute, getLikesByPost);
router.post("/toggle", protectRoute, toggleLike);

export default router;

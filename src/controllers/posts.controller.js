
import Post from "../models/Post.js";

// ===============================
// CREATE POST


// ===============================
export const createPost = async (req, res) => {
  try {
    const { text, images } = req.body;

    if (!text && (!images || images.length === 0)) {
      return res.status(400).json({ message: "Post cannot be empty." });
    }

    const newPost = await Post.create({
      user: req.user._id,
      text,
      images,
    });

    res.status(201).json({
      success: true,
      message: "Post created successfully",
      post: newPost,
    });
  } catch (error) {
    console.error("Create Post Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ===============================
// GET ALL POSTS (Newest First)
// ===============================
export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("user", "name email avatar")   // populate user info
      .populate("comments.user", "name avatar")
      .sort({ createdAt: -1 });               // SORT NEWEST FIRST

    res.status(200).json({
      success: true,
      count: posts.length,
      posts,
    });
  } catch (error) {
    console.error("Get Posts Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

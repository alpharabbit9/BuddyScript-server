
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

    // req.user comes from auth middleware
    const newPost = await Post.create({
      user: req.user._id,
      userFullName: req.user.fullName,   
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


export const toggleLikePost = async (req, res) => {
    try {
        const { id } = req.params;     // postId
        const { userId } = req.body;   // liker userId

        const post = await Post.findById(id);

        if (!post) {
            return res.status(404).json({ success: false, message: "Post not found" });
        }

        const alreadyLiked = post.likes.some(
            (uid) => uid.toString() === userId.toString()
        );

        if (alreadyLiked) {
            // UNLIKE
            post.likes = post.likes.filter(
                (uid) => uid.toString() !== userId.toString()
            );
        } else {
            // LIKE
            post.likes.push(userId);
        }

        await post.save();

        return res.status(200).json({
            success: true,
            message: alreadyLiked ? "Post unliked" : "Post liked",
            likes: post.likes.map((u) => u.toString()) // ensure frontend gets strings
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};


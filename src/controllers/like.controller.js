import Like from "../models/Like.js";
import Post from "../models/Post.js";


export const toggleLike = async (req, res) => {
  try {
    const userId = req.user._id;     // from auth middleware
    const { postId } = req.body;

    // Check if postId is valid
    const postExists = await Post.findById(postId);
    if (!postExists) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Check if like already exists
    const existingLike = await Like.findOne({ postId, userId });

    if (existingLike) {
      // UNLIKE
      await Like.deleteOne({ _id: existingLike._id });

      const likeCount = await Like.countDocuments({ postId });

      return res.json({
        message: "Post unliked",
        liked: false,
        likeCount,
      });
    }

    // LIKE
    await Like.create({ postId, userId });

    const likeCount = await Like.countDocuments({ postId });

    return res.json({
      message: "Post liked",
      liked: true,
      likeCount,
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error", error });
  }
};


export const getLikesByPost = async (req, res) => {
  try {
    const { postId } = req.params;
    const userId = req.user._id;

    // Find all likes for this post
    const likes = await Like.find({ postId });

    // Check if current user liked it
    const isLiked = likes.some((like) => like.userId.toString() === userId.toString());

    return res.json({
      success: true,
      likesCount: likes.length,
      isLiked,
    });
  } catch (error) {
    console.error("Error fetching likes:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

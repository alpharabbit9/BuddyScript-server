import Comment from "../models/Comment.js";


export const addComment = async (req, res) => {
    try {
        const { postId, text } = req.body;
        const userId = req.user._id; // from auth middleware

        if (!text) {
            return res.status(400).json({ message: "Comment text is required" });
        }

        const comment = await Comment.create({
            postId,
            userId,
            text,
        });

        return res.status(201).json({
            message: "Comment added",
            comment,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error" });
    }
};

export const getComments = async (req, res) => {
    try {
        const { postId } = req.params;

        const comments = await Comment.find({ postId })
            .populate("userId", "fullName avatar")
            .sort({ createdAt: -1 });

        res.json(comments);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error" });
    }
};


export const deleteComment = async (req, res) => {
    try {
        const { commentId } = req.params;
        const userId = req.user._id;

        const comment = await Comment.findById(commentId);

        if (!comment) {
            return res.status(404).json({ message: "Comment not found" });
        }

        // Check if delete permission
        if (comment.userId.toString() !== userId.toString()) {
            return res.status(403).json({ message: "Not authorized" });
        }

        await Comment.findByIdAndDelete(commentId);

        res.json({ message: "Comment deleted" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error" });
    }
};



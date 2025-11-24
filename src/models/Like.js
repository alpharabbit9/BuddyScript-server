import mongoose from "mongoose";

const LikeSchema = new mongoose.Schema(
  {
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

// Prevent duplicate likes on same post by same user
LikeSchema.index({ postId: 1, userId: 1 }, { unique: true });

const Like = mongoose.model("Like", LikeSchema);

export default Like;

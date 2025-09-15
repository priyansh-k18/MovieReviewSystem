import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    review: {
      type: String,
      required: true,
      trim: true,
    },
    rating: {
      type: Number,
      min: 1,
      max: 10,
      required: function () {
        return !this.parentComment; //iska mtlb hai ki parent comment null hua toh woh function true return krega
      },
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    movie: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Movie",
      required: function () {
        return !this.parentComment; //mtlb ydi h movie pr comment h toh required hoga hi
      },
    },
    parentComment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
      default: null,
    },
  },
  { timestamps: true }
);

export const Comment = mongoose.model("Comment", commentSchema);

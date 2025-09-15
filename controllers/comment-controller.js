import { Comment } from "../models/comment.js";

export const movieComment = async (req, res) => {
  try {
    const { review, rating, author } = req.body;
    const movieId = req.params.movieId;

    const newComment = await Comment.create({
      review,
      rating,
      author,
      movie: movieId,
    });

    return res.status(201).json({
      success: true,
      message: "comment posted successfully",
      data: newComment,
    });
  } catch (e) {
    return res.status(500).json({
      success: false,
      message: "Internal error occured! Please try again",
      error: e.message,
    });
  }
};

export const getAllComment = async (req, res) => {
  try {
    const movieId = req.params.movieId;
    const comments = await Comment.find({ movie: movieId })
      .populate("author", "username")
      .sort({ createdAt: -1 });

    if (comments.length === 0) {
      return res.status(200).json({
        success: true,
        message: "No comments found",
        data: [],
      });
    }
    return res.status(200).json({
      success: true,
      message: "successfully fetched all comments",
      data: comments,
    });
  } catch (e) {
    return res.status(500).json({
      success: false,
      message: "Internal error occured! Please try again",
      error: e.message,
    });
  }
};

export const commentReply = async (req, res) => {
  try {
    const { review, author} = req.body;
    const commentId = req.params.commentId;
    

    const parent = await Comment.findById(commentId);
    if (!parent) {
      return res.status(404).json({
        success: false,
        message: "Parent comment not found",
      });
    }

    const newReply = await Comment.create({
      review,
      author,
      parentComment : commentId,
      movie: parent.movie,
    });

    return res.status(201).json({
      success: true,
      message: "successfully created a reply on the comment",
      data: newReply,
    });
  } catch (e) {
    return res.status(500).json({
      success: false,
      message: "Internal error occured! Please try again",
      error: e.message,
    });
  }
};


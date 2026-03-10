import Comment from "../models/comment.model.js";
import type { Request, Response, NextFunction } from "express";
import Post from "../models/post.model.js";

const comment = async (req: Request, res: Response, next: NextFunction) => {
 
  try {
    const { userName, content } = req.body;
    const { postId } = req.params;

    if (!content) {
      const error = new Error("Content is required") as CustomError;
      error.status = 400;
      return next(error);
    }

    const newComment = new Comment({
      userName: userName || "anonymous",
      content,
    });

    await newComment.save();

    const updatedPost = await Post.findByIdAndUpdate(
      { _id: postId },
      { $push: { comments: newComment._id } },
      { new: true },
    );

    res.status(201).json({
      message: "Comment created successfully",
      data: newComment,
      post: updatedPost,
    });
  } catch (err) {
    next(err);
  }
};

const deleteComment = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { postId, commentId } = req.params;

    if (!commentId || !postId) {
      const error = new Error(
        " Post id and Comment id are required",
      ) as CustomError;
      error.status = 400;
      return next(error);
    }

    const removeComment = await Post.findByIdAndUpdate(postId, {
      $pull: { comments: commentId },
    });

    await Post.findOneAndUpdate(
      { _id: postId },
      { $pull: { comment: commentId } },
    );

    res.status(200).json({
      message: "Comment deleted successfully",
      data: removeComment,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error", err });
    next(new Error("Comment cannot be updated"));
  }
};

export { comment, deleteComment };

import Post from "../models/post.model.js";
import type { Request, Response, NextFunction } from "express";

const deletePost = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    if (!id) {
      const error = new Error(" Post id is required") as CustomError;
      error.status = 400;
      return next(error);
    }

    const removePost = await Post.findOneAndDelete({ _id: id });

    if (!removePost) {
      const error = new Error("Post not found") as CustomError;
      error.status = 404;
      return next(error);
    }

    res.status(200).json({
      message: "Post deleted successfully",
      data: removePost,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error", err });
    next(new Error("Post cannot be updated"));
  }
};

export { deletePost };

import Post from "../models/post.model.js";
import type { Response, Request, NextFunction } from "express";

const updateById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const { content, title } = req.body;

    if (!id) {
      const error = new Error("Post id is required") as CustomError;
      error.status = 400;
      return next(error);
    }

    const updatePost = await Post.findByIdAndUpdate(
      { _id: id },
      { $set: { content, title } },
      { new: true },
    );

    if (!updatePost) {
      const error = new Error("Post not found") as CustomError;
      error.status = 404;
      return next(error);
    }

    res.status(200).json({
      message: "Post updated successfully",
      data: updatePost,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error", err });
    next(err);
  }
};

export { updateById };

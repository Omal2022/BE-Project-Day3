import Post from "../models/post.model.js";
import type { Request, Response, NextFunction } from "express";

const getAllPost = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const getALlPost = await Post.find();

    res
      .status(200)
      .json({ Message: "Successfully cretaed a post", data: [...getALlPost] });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error", err });
  }
};

const getPostById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const post = await Post.findById(id).populate('comments');

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    res.status(200).json({
      success: true,
      data: post,
    });
  } catch (err) {
    next(err);
  }
};

export { getAllPost, getPostById };

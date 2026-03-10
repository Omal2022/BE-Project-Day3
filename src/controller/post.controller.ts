import Post from "../models/post.model.js";
import type { Request, Response, NextFunction } from "express";
// import { Post } from "../types/post.js";

const post = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { title, content } = req.body;
    if (!title || !content) {
      const error = new Error("Title and Content are required") as CustomError;
      error.status = 400;
      return next(error);
    }

    const newPost = new Post({ title, content });

    await newPost.save();

    res.status(201).json({ Message: "Successfully cretaed a post", newPost });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error", err });
  }
};

export { post };

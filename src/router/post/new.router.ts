import express from "express";
import { post } from "../../controller/post.controller.js";
import { deletePost } from "../../controller/delete.controller.js";
import {
  getPostById,
  getAllPost,
} from "../../controller/getAllPost.controller.js";
import { comment, deleteComment } from "../../controller/comment.controller.js";

const router = express.Router();

// new.router.js
router.get("/test", (req, res) => {
  res.status(200).json({ message: "Router alive" });
});

router.post("/", post);
router.get("/", getAllPost);

// comment routes FIRST
// new.router.js
router.post("/:postId/comments", comment); // POST /api/post/123abc/comments
router.delete("/:postId/comments/:commentId", deleteComment); // DELETE /api/post/123abc/comments/456def

// post routes after
router.get("/:id", getPostById);
router.delete("/:id", deletePost);

export default router;

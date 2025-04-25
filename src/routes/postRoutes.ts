import { Router } from "express";
import {
  createComment,
  getCommentsForPost,
  getPostById,
  getPosts,
  toggleLikeComment,
  toggleLikePost,
} from "../controllers/postController";

const router = Router();

router.get("/posts", getPosts);
router.get("/posts/:id", getPostById);
router.post("/posts/:id/like", toggleLikePost);
router.post("/posts/:id/comments/:commentId/like", toggleLikeComment);
router.post("/posts/:id/comments", createComment);
router.get("/posts/:id/comments", getCommentsForPost);

export default router;

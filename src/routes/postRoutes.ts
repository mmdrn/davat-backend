import { Router } from "express";
import {
  createComment,
  getCommentsForPost,
  getPosts,
  toggleLike,
} from "../controllers/postController";

const router = Router();

router.get("/posts", getPosts);
router.post("/posts/:id/like", toggleLike);
router.post("/posts/:id/comments", createComment);
router.get("/posts/:id/comments", getCommentsForPost);

export default router;

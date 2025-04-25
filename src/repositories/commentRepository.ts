import Comment, { IComment } from "../models/commentModel";
import { ICommentRepository } from "./interfaces/ICommentRepository";
import { Types } from "mongoose";

export class CommentRepository implements ICommentRepository {
  async toggleLike(
    commentId: Types.ObjectId,
    userId: Types.ObjectId
  ): Promise<IComment | null> {
    const comment = await Comment.findById(commentId);
    if (!comment) return null;

    const alreadyLiked = comment.likes.some((id) => id.equals(userId));

    if (alreadyLiked) {
      comment.likes = comment.likes.filter((id) => !id.equals(userId));
    } else {
      comment.likes.push(userId);
    }

    return await comment.save();
  }

  async addComment(comment: Partial<IComment>): Promise<IComment> {
    return await Comment.create(comment);
  }

  async getCommentsByPost(postId: Types.ObjectId): Promise<IComment[]> {
    return await Comment.find({ postId }).sort({ createdAt: 1 }).lean();
  }
}

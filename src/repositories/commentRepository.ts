import Comment, { IComment } from "../models/commentModel";
import { ICommentRepository } from "./interfaces/ICommentRepository";
import { Types } from "mongoose";

export class CommentRepository implements ICommentRepository {
  async addComment(comment: Partial<IComment>): Promise<IComment> {
    return await Comment.create(comment);
  }

  async getCommentsByPost(postId: Types.ObjectId): Promise<IComment[]> {
    return await Comment.find({ postId }).sort({ createdAt: 1 }).lean();
  }
}

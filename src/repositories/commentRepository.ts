import Comment from "../models/commentModel";
import { ICommentRepository } from "./interfaces/ICommentRepository";
import { Types } from "mongoose";
import { IComment } from "./types";

export class CommentRepository implements ICommentRepository {
  async toggleLike(
    commentId: string,
    userId: string
  ): Promise<IComment | null> {
    const comment = await Comment.findById(new Types.ObjectId(commentId));
    if (!comment) return null;

    const alreadyLiked = comment.likes.some((id) =>
      id.equals(new Types.ObjectId(userId))
    );

    if (alreadyLiked) {
      comment.likes = comment.likes.filter(
        (id) => !id.equals(new Types.ObjectId(userId))
      );
    } else {
      comment.likes.push(new Types.ObjectId(userId));
    }

    const savedComment = await comment.save();
    return {
      id: commentId,
      postId: savedComment.postId.toString(),
      parentCommentId: savedComment.parentCommentId?.toString(),
      author: savedComment.author,
      content: savedComment.content,
      createdAt: savedComment.createdAt,
      likes: savedComment.likes.map((id) => id.toString()),
    };
  }

  async addComment({
    postId,
    parentCommentId,
    author,
    content,
  }: {
    postId: string;
    parentCommentId?: string;
    author: string;
    content: string;
  }): Promise<IComment> {
    const _comment = new Comment({
      postId: new Types.ObjectId(postId),
      parentCommentId: parentCommentId
        ? new Types.ObjectId(parentCommentId)
        : undefined,
      author,
      content,
    });

    const addedComment = await Comment.create(_comment);
    return {
      id: (addedComment._id as Types.ObjectId).toString(),
      postId: addedComment.postId.toString(),
      parentCommentId: addedComment.parentCommentId?.toString(),
      author: addedComment.author,
      content: addedComment.content,
      createdAt: addedComment.createdAt,
      likes: addedComment.likes.map((id) => id.toString()),
    };
  }

  async getCommentsByPost(postId: string): Promise<IComment[]> {
    const comments = await Comment.find({ postId: new Types.ObjectId(postId) })
      .sort({ createdAt: 1 })
      .lean();

    return comments.map((comment) => ({
      id: comment._id.toString(),
      postId: comment.postId.toString(),
      parentCommentId: comment.parentCommentId?.toString(),
      author: comment.author,
      content: comment.content,
      createdAt: comment.createdAt,
      likes: comment.likes.map((id) => id.toString()),
    }));
  }
}

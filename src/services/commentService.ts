import { ICommentService } from "./interfaces/ICommentService";
import { ICommentRepository } from "../repositories/interfaces/ICommentRepository";
import { Types } from "mongoose";
import { IComment } from "./types";

export class CommentService implements ICommentService {
  constructor(private commentRepo: ICommentRepository) {}

  async toggleLike(
    commentId: string,
    userId: string
  ): Promise<IComment | null> {
    const updatedComment = await this.commentRepo.toggleLike(commentId, userId);

    if (!updatedComment) return null;

    return {
      id: updatedComment.id,
      postId: updatedComment.postId,
      parentCommentId: updatedComment.parentCommentId,
      author: updatedComment.author,
      content: updatedComment.content,
      createdAt: updatedComment.createdAt,
      likes: updatedComment.likes,
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
  }) {
    const comment = await this.commentRepo.addComment({
      postId: postId,
      parentCommentId: parentCommentId ? parentCommentId : undefined,
      author,
      content,
    });
    return comment;
  }

  async getThreadedComments(postId: string) {
    const comments = await this.commentRepo.getCommentsByPost(postId);

    // Basic nesting by parentCommentId
    const map = new Map<string, any>();
    const roots: any[] = [];

    for (const comment of comments) {
      const id = comment.id.toString();
      const commentObj = {
        id: comment.id,
        postId: comment.postId,
        parentCommentId: comment.parentCommentId,
        author: comment.author,
        content: comment.content,
        createdAt: comment.createdAt,
        likes: comment.likes,
      };
      map.set(id, { ...commentObj, replies: [] });
    }

    for (const comment of comments) {
      const parentId = (comment as any).parentCommentId?.toString();
      const node = map.get(comment.id.toString());

      if (parentId && map.has(parentId)) {
        map.get(parentId).replies.push(node);
      } else {
        roots.push(node);
      }
    }

    return roots;
  }
}

import { ICommentService } from "./interfaces/ICommentService";
import { ICommentRepository } from "../repositories/interfaces/ICommentRepository";
import { Types } from "mongoose";

export class CommentService implements ICommentService {
  constructor(private commentRepo: ICommentRepository) {}

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
      postId: new Types.ObjectId(postId),
      parentCommentId: parentCommentId
        ? new Types.ObjectId(parentCommentId)
        : undefined,
      author,
      content,
      createdAt: new Date(),
    });
    return comment;
  }

  async getThreadedComments(postId: string) {
    const comments = await this.commentRepo.getCommentsByPost(
      new Types.ObjectId(postId)
    );

    // Basic nesting by parentCommentId
    const map = new Map<string, any>();
    const roots: any[] = [];

    for (const comment of comments) {
      const id = (comment as any)._id.toString();
      const commentObj = {
        _id: comment._id,
        postId: comment.postId,
        parentCommentId: comment.parentCommentId,
        author: comment.author,
        content: comment.content,
        createdAt: comment.createdAt,
      };
      map.set(id, { ...commentObj, replies: [] });
    }

    for (const comment of comments) {
      const parentId = (comment as any).parentCommentId?.toString();
      const node = map.get((comment as any)._id.toString());

      if (parentId && map.has(parentId)) {
        map.get(parentId).replies.push(node);
      } else {
        roots.push(node);
      }
    }

    return roots;
  }
}

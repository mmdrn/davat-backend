import { IComment } from "../../models/commentModel";
import { Types } from "mongoose";

export interface ICommentService {
  addComment(data: {
    postId: string;
    parentCommentId?: string;
    author: string;
    content: string;
  }): Promise<IComment>;
  getThreadedComments(postId: string): Promise<any[]>; // can replace with structured DTO later
  toggleLike(commentId: string, userId: string): Promise<IComment | null>;
}

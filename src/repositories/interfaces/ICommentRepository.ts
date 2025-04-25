import { IComment } from "../../models/commentModel";
import { Types } from "mongoose";

export interface ICommentRepository {
  addComment(comment: Partial<IComment>): Promise<IComment>;
  getCommentsByPost(postId: Types.ObjectId): Promise<IComment[]>;
  toggleLike(
    commentId: Types.ObjectId,
    userId: Types.ObjectId
  ): Promise<IComment | null>;
}

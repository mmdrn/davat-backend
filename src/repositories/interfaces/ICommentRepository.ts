import { IComment } from "../../models/commentModel";
import { Types } from "mongoose";

export interface ICommentRepository {
  addComment(comment: Partial<IComment>): Promise<IComment>;
  getCommentsByPost(postId: Types.ObjectId): Promise<IComment[]>;
}

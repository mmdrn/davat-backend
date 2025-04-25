import { IPost } from "../../models/postModel";
import { Types } from "mongoose";

export interface IPostRepository {
  toggleLike(
    postId: Types.ObjectId,
    userId: Types.ObjectId
  ): Promise<IPost | null>;

  getAllPosts(): Promise<IPost[]>;

  getPostById(postId: Types.ObjectId): Promise<IPost | null>;
}

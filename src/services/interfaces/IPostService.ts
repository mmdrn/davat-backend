import { IPost } from "../../models/postModel";
import { Types } from "mongoose";

export interface IPostService {
  toggleLike(postId: string, userId: string): Promise<IPost | null>;
  getPostsWithDetails(): Promise<any[]>; // New method for getting posts with likes count and comments
}

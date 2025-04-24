import { IPostService } from "./interfaces/IPostService";
import { IPostRepository } from "../repositories/interfaces/IPostRepository";
import { Types } from "mongoose";
import { IPost } from "../models/postModel";
import { ICommentRepository } from "../repositories/interfaces/ICommentRepository";

export class PostService implements IPostService {
  constructor(
    private postRepo: IPostRepository,
    private commentRepo: ICommentRepository
  ) {}

  async toggleLike(postId: string, userId: string): Promise<IPost | null> {
    return await this.postRepo.toggleLike(
      new Types.ObjectId(postId),
      new Types.ObjectId(userId)
    );
  }

  async getPostsWithDetails(): Promise<any[]> {
    const posts = await this.postRepo.getAllPosts(); // Assume this method fetches all posts from the repository
    // Fetch comments for each post
    const postsWithDetails = await Promise.all(
      posts.map(async (post) => {
        // @ts-ignore
        const comments = await this.commentRepo.getCommentsByPost(post._id);
        const likesCount = post.likes.length;

        return {
          post,
          likesCount,
          comments,
        };
      })
    );

    return postsWithDetails;
  }
}

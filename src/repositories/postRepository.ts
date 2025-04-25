import Post, { IPost } from "../models/postModel";
import { IPostRepository } from "./interfaces/IPostRepository";
import { Types } from "mongoose";

export class PostRepository implements IPostRepository {
  async getPostById(postId: Types.ObjectId): Promise<IPost | null> {
    const post = await Post.findById(postId);
    if (!post) return null;

    return post;
  }

  async toggleLike(postId: Types.ObjectId, userId: Types.ObjectId) {
    const post = await Post.findById(postId);
    if (!post) return null;

    const alreadyLiked = post.likes.some((id) => id.equals(userId));

    if (alreadyLiked) {
      post.likes = post.likes.filter((id) => !id.equals(userId));
    } else {
      post.likes.push(userId);
    }

    return await post.save();
  }

  // New method to get all posts
  async getAllPosts(): Promise<IPost[]> {
    return await Post.find().lean();
  }
}

import Post from "../models/postModel";
import { IPostRepository } from "./interfaces/IPostRepository";
import { Types } from "mongoose";
import { IPost } from "./types";

export class PostRepository implements IPostRepository {
  async getPostById(postId: string): Promise<IPost | null> {
    const post = await Post.findById(new Types.ObjectId(postId));
    if (!post) return null;

    return {
      id: post._id.toString(),
      title: post.title,
      content: post.content,
      author: post.author,
      description: post.description,
      likes: post.likes.map((id) => id.toString()),
    };
  }

  async toggleLike(postId: string, userId: string) {
    const post = await Post.findById(postId);
    if (!post) return null;

    const alreadyLiked = post.likes.some((id) =>
      id.equals(new Types.ObjectId(userId))
    );

    if (alreadyLiked) {
      post.likes = post.likes.filter(
        (id) => !id.equals(new Types.ObjectId(userId))
      );
    } else {
      post.likes.push(new Types.ObjectId(userId));
    }

    const savedPost = await post.save();

    return {
      id: savedPost._id.toString(),
      title: savedPost.title,
      content: savedPost.content,
      author: savedPost.author,
      description: savedPost.description,
      likes: savedPost.likes.map((id) => id.toString()),
    };
  }

  async getAllPosts(): Promise<IPost[]> {
    const posts = await Post.find().lean();

    return posts.map((post) => ({
      id: post._id.toString(),
      title: post.title,
      content: post.content,
      author: post.author,
      description: post.description,
      likes: post.likes.map((id) => id.toString()),
    }));
  }
}

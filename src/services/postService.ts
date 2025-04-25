import { IPostService } from "./interfaces/IPostService";
import { IPostRepository } from "../repositories/interfaces/IPostRepository";
import { Types } from "mongoose";
import { ICommentRepository } from "../repositories/interfaces/ICommentRepository";
import { IPost } from "./types";

export class PostService implements IPostService {
  constructor(
    private postRepo: IPostRepository,
    private commentRepo: ICommentRepository
  ) {}
  async getPostById(postId: string): Promise<IPost | null> {
    const post = await this.postRepo.getPostById(postId);

    if (!post) return null;

    const comments = await this.commentRepo.getCommentsByPost(post.id);

    return {
      id: post.id,
      title: post.title,
      content: post.content,
      author: post.author,
      description: post.description,
      likes: post.likes,
      commentsCount: comments.length,
    };
  }

  async toggleLike(
    postId: string,
    userId: string
  ): Promise<Omit<IPost, "commentsCount"> | null> {
    const post = await this.postRepo.toggleLike(postId, userId);

    if (!post) return null;

    return {
      id: post.id,
      title: post.title,
      content: post.content,
      author: post.author,
      description: post.description,
      likes: post.likes,
    };
  }

  async getPosts(): Promise<IPost[]> {
    const posts = await this.postRepo.getAllPosts();
    const postsWithDetails = await Promise.all(
      posts.map(async (post) => {
        const comments = await this.commentRepo.getCommentsByPost(post.id);

        return {
          ...post,
          commentsCount: comments.length,
        };
      })
    );

    return postsWithDetails;
  }
}

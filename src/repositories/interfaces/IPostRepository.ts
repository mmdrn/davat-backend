import { Types } from "mongoose";
import { IPost } from "../types";

export interface IPostRepository {
  /**
   * Toggles the like status of a post for a specific user
   * @param postId The ID of the post to toggle like
   * @param userId The ID of the user toggling the like
   * @returns Promise containing the updated post or null if post not found
   */
  toggleLike(postId: string, userId: string): Promise<IPost | null>;

  /**
   * Retrieves all posts from the database
   * @returns Promise containing an array of posts
   */
  getAllPosts(): Promise<IPost[]>;

  /**
   * Retrieves a post by its ID from the database
   * @param postId The ID of the post to retrieve
   * @returns Promise containing the post or null if not found
   */
  getPostById(postId: string): Promise<IPost | null>;
}

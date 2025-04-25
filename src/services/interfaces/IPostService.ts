import { IPost } from "../types";

export interface IPostService {
  /**
   * Toggles like status for a post
   * @param postId - The ID of the post to toggle like
   * @param userId - The ID of the user performing the like action
   * @returns Promise resolving to the updated post or null if not found
   */
  toggleLike(
    postId: string,
    userId: string
  ): Promise<Omit<IPost, "commentsCount"> | null>;

  /**
   * Retrieves all posts with additional details including likes count and comments
   * @returns Promise resolving to an array of posts with detailed information
   */
  getPosts(): Promise<IPost[]>;

  /**
   * Retrieves a specific post by its ID
   * @param postId - The ID of the post to retrieve
   * @returns Promise resolving to the found post or null if not found
   */
  getPostById(postId: string): Promise<IPost | null>;
}

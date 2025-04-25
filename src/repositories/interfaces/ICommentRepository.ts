import { IComment } from "../types";

export interface ICommentRepository {
  /**
   * Adds a new comment to a post or as a reply to another comment
   * @param params Object containing comment details
   * @param params.postId The ID of the post to add the comment to
   * @param params.parentCommentId Optional ID of the parent comment if this is a reply
   * @param params.author The ID of the user creating the comment
   * @param params.content The text content of the comment
   * @returns Promise containing the newly created comment
   */
  addComment({
    postId,
    parentCommentId,
    author,
    content,
  }: {
    postId: string;
    parentCommentId?: string;
    author: string;
    content: string;
  }): Promise<IComment>;
  
  /**
   * Retrieves all comments for a specific post
   * @param postId The ID of the post to get comments for
   * @returns Promise containing an array of comments
   */
  getCommentsByPost(postId: string): Promise<IComment[]>;

  /**
   * Toggles the like status for a comment by a specific user
   * @param commentId The ID of the comment to toggle like
   * @param userId The ID of the user toggling the like
   * @returns Promise containing the updated comment or null if not found
   */
  toggleLike(commentId: string, userId: string): Promise<IComment | null>;
}

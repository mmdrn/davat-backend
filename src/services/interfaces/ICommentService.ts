import { IComment } from "../types";

/**
 * Interface defining the comment service operations
 */
export interface ICommentService {
  /**
   * Creates a new comment
   * @param data Object containing comment data
   * @param data.postId ID of the post the comment belongs to
   * @param data.parentCommentId Optional ID of the parent comment if this is a reply
   * @param data.author Username or ID of the comment author
   * @param data.content Text content of the comment
   * @returns Promise resolving to the created comment
   */
  addComment(data: {
    postId: string;
    parentCommentId?: string;
    author: string;
    content: string;
  }): Promise<IComment>;

  /**
   * Retrieves comments for a post in a threaded structure
   * @param postId ID of the post to get comments for
   * @returns Promise resolving to an array of threaded comments
   * @todo Replace any[] with structured DTO
   */
  getThreadedComments(postId: string): Promise<any[]>;

  /**
   * Toggles like status on a comment for a user
   * @param commentId ID of the comment to toggle like on
   * @param userId ID of the user toggling the like
   * @returns Promise resolving to the updated comment or null if comment not found
   */
  toggleLike(commentId: string, userId: string): Promise<IComment | null>;
}

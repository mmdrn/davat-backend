import { Request, Response } from "express";
import { CommentService } from "../services/commentService";
import { CommentRepository } from "../repositories/commentRepository";
import { PostRepository } from "../repositories/postRepository";
import { PostService } from "../services/postService";

const commentService = new CommentService(new CommentRepository());
const postService = new PostService(
  new PostRepository(),
  new CommentRepository()
);

/**
 * Retrieves all posts with their associated details
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 * @returns {Promise<void>} - Returns array of posts with details or error response
 */
export const getPosts = async (req: Request, res: Response) => {
  try {
    // Fetch all posts with their associated details
    const postsWithDetails = await postService.getPostsWithDetails();
    // Return successful response with posts
    res.status(200).json(postsWithDetails);
  } catch (error) {
    // Handle any errors that occur during fetch
    res
      .status(500)
      .json({ message: "Failed to fetch posts with details", error });
  }
};

/**
 * Toggles the like status of a post for a specific user
 * @param {Request} req - Express request object containing post ID in params and user ID in body
 * @param {Response} res - Express response object
 * @returns {Promise<void>} - Returns the updated post object or error response
 */
export const toggleLike = async (req: Request, res: Response) => {
  try {
    // Extract post ID from request parameters
    const { id } = req.params;
    // Extract user ID from request body
    const userId = req.body.userId;

    // Toggle like status and get updated post
    const post = await postService.toggleLike(id, userId);
    if (!post) {
      res.status(404).json({ message: "Post not found" });
      return;
    }
    // Return updated post with new like status
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: "Failed to toggle like", error });
  }
};

/**
 * Retrieves all threaded comments for a specific post
 * @param {Request} req - Express request object containing post ID in params
 * @param {Response} res - Express response object
 * @returns {Promise<void>} - Returns array of threaded comments or error response
 */
export const getCommentsForPost = async (req: Request, res: Response) => {
  try {
    // Extract post ID from request parameters
    const { id } = req.params;
    // Fetch threaded comments for the post
    const comments = await commentService.getThreadedComments(id);
    // Return comments array
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch comments", error });
  }
};

/**
 * Creates a new comment for a specific post
 * @param {Request} req - Express request object containing post ID in params and comment details in body
 * @param {Response} res - Express response object
 * @returns {Promise<void>} - Returns the created comment object or error response
 */
export const createComment = async (req: Request, res: Response) => {
  try {
    // Extract post ID from request parameters
    const { id } = req.params;
    // Extract comment details from request body
    const { parentCommentId, author, content } = req.body;
    // Create new comment using comment service
    const comment = await commentService.addComment({
      postId: id,
      parentCommentId,
      author,
      content,
    });
    // Return created comment with 201 status
    res.status(201).json(comment);
  } catch (error) {
    // Handle any errors that occur during comment creation
    res.status(500).json({ message: "Failed to add comment", error });
  }
};

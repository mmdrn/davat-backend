export interface IPostDTO {
  id: string;
  title: string;
  content: string;
  author: string;
  description: string;
  likes: string[];
  comments: ICommentDTO[];
}

export interface ICommentDTO {
  id: string;
  postId: string;
  parentCommentId: string | null;
  authorId: string;
  content: string;
  likes: string[];
  createdAt: Date;
  replies: ICommentDTO[];
}

export interface IPost {
  id: string;
  title: string;
  content: string;
  author: string;
  description: string;
  likes: string[];
}

export interface IComment {
  id: string;
  postId: string;
  parentCommentId?: string;
  author: string;
  content: string;
  createdAt: Date;
  likes: string[];
}

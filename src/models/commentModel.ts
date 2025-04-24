import { Schema, model, Document, Types } from 'mongoose';

export interface IComment extends Document {
  postId: Types.ObjectId;
  parentCommentId?: Types.ObjectId;
  author: string;
  content: string;
  createdAt: Date;
}

const commentSchema = new Schema<IComment>(
  {
    postId: { type: Schema.Types.ObjectId, ref: 'Post', required: true },
    parentCommentId: { type: Schema.Types.ObjectId, ref: 'Comment', default: null },
    author: { type: String, required: true },
    content: { type: String, required: true }
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

export default model<IComment>('Comment', commentSchema);

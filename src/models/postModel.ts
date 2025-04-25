import { Schema, model, Types } from "mongoose";

export interface IPost {
  _id: string;
  title: string;
  content: string;
  author: string;
  description: string;
  likes: Types.ObjectId[]; // userIds
}

const postSchema = new Schema<IPost>({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: String, required: true },
  description: { type: String, required: true },
  likes: [{ type: Schema.Types.ObjectId, ref: "User" }],
});

export default model<IPost>("Post", postSchema);

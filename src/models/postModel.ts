import { Schema, model, Types } from "mongoose";

export interface IPost {
  title: string;
  content: string;
  author: string;
  likes: Types.ObjectId[]; // userIds
}

const postSchema = new Schema<IPost>({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: String, required: true },
  likes: [{ type: Schema.Types.ObjectId, ref: "User" }],
});

export default model<IPost>("Post", postSchema);

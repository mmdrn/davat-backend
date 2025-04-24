import { Schema, model } from "mongoose";

export interface IUser {
  name: string;
  email: string;
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true },
});

export default model<IUser>("User", userSchema);

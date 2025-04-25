import { Schema, model, models } from "mongoose";

export interface IUser {
  clerkId: string;
  email: string;
  username: string;
  firstName?: string;
  lastName?: string;
  photo?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const UserSchema = new Schema({
  clerkId: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  firstName: { type: String },
  lastName: { type: String },
  photo: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const User = models?.User || model("User", UserSchema);

export default User;

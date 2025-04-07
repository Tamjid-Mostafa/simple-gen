import { Schema, model, models } from "mongoose";

export interface IUser {
  clerkId: string; // Unique ID from authentication provider
  email: string; // User's email address
  username: string; // Display name or username
  firstName?: string; // User's first name
  lastName?: string; // User's last name
  photo?: string; // Profile picture URL
  planId?: number; // Membership plan ID
  joinDate?: Date; // Date when the user joined
  membershipStatus?: "active" | "inactive" | "cancelled"; // Membership status
  workoutPreferences?: string[]; // User's workout preferences or goals
  nutritionGoals?: string; // User's nutrition goals
  createdAt?: Date; // Record creation date
  updatedAt?: Date; // Record update date
}

const UserSchema = new Schema({
  clerkId: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  firstName: { type: String },
  lastName: { type: String },
  photo: { type: String },
  planId: { type: Number, default: 1 }, // Default to basic plan
  joinDate: { type: Date, default: Date.now },
  membershipStatus: {
    type: String,
    required: true,
    enum: ["active", "inactive", "cancelled"],
    default: "active",
  },
  workoutPreferences: { type: [String] }, // Array of workout goals or types
  nutritionGoals: { type: String }, // Description of nutrition goals
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const User = models?.User || model("User", UserSchema);

export default User;

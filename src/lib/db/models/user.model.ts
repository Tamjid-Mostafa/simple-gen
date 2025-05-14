import { IUser } from "@/types/user";
import { Model, Schema, model, models } from "mongoose";


const UserSchema = new Schema<IUser>({
  clerkId: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  firstName: { type: String },
  lastName: { type: String },
  photo: { type: String },

  hasOnboard: { type: Boolean, default: false },
  isAdmin: { type: Boolean, default: false },
  hasActiveSubscription: { type: Boolean, default: false },

  account: {
    imageCredits: { type: Number, default: 0 },
    postCredits: { type: Number, default: 0 },
    subscription: { type: String, default: null },
  },

  settings: {
    headline: { type: String, default: null },
    shareContent: { type: [String], default: [] },
    postPurpose: { type: [String], default: [] },
    writingStyle: { type: [String], default: [] },
    industry: { type: [String], default: [] },
    jobDescription: { type: [String], default: [] },
    fineTuning: { type: String, default: "" },
    cta: { type: String, default: null },
    topics: { type: [String], default: [] },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },

  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const User: Model<IUser> = models?.User || model<IUser>("User", UserSchema);
export default User;


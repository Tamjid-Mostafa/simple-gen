"use server";

import { revalidatePath } from "next/cache";

import { handleError } from "../utils";
import { connectDB } from "../db/connect";
import User from "../db/models/user.model";
import { IUser, UserCreateInput, UserUpdateInput } from "@/types/user";

// CREATE
export async function createUser(user: UserCreateInput): Promise<IUser | null> {
  try {
    await connectDB();

    const newUser = await User.create(user);
    return JSON.parse(JSON.stringify(newUser));
  } catch (error) {
    handleError(error);
    return null;
  }
}

// READ
export async function getUserById(userId: string): Promise<IUser | null> {
  try {
    await connectDB();

    const user = await User.findOne({ clerkId: userId });

    if (!user) throw new Error("User not found");

    return JSON.parse(JSON.stringify(user));
  } catch (error) {
    handleError(error);
    return null;
  }
}
export async function getUserByUsername(username: string) {
  try {
    await connectDB();

    const user = await User.findOne({ username });

    if (!user) throw new Error("User not found");

    return JSON.parse(JSON.stringify(user));
  } catch (error) {
    handleError(error);
  }
}

export async function getAllUsers() {
  try {
    await connectDB();
    const users = await User.find();
    if (!users) throw new Error("User not found");
    return JSON.parse(JSON.stringify(users));
  } catch (error) {
    handleError(error);
  }
}

// UPDATE
export async function updateUser(clerkId: string, user: UserUpdateInput) {
  try {
    await connectDB();

    const updatedUser = await User.findOneAndUpdate({ clerkId }, user, {
      new: true,
    });

    if (!updatedUser) throw new Error("User update failed");

    return JSON.parse(JSON.stringify(updatedUser));
  } catch (error) {
    handleError(error);
  }
}
// Filter User
interface QueryParams {
  filter?: { [key: string]: any }; // Filtering conditions
  sort?: { [key: string]: 1 | -1 }; // Sorting conditions (1 for ASC, -1 for DESC)
  page?: number; // Page number for pagination
  limit?: number; // Number of results per page
}

export async function getFilteredUsers(query: QueryParams) {
  try {
    await connectDB();

    const { filter = {}, sort = {}, page = 1, limit = 1 } = query;

    // Ensure page and limit are positive integers
    const pageNum = Math.max(1, page);
    const limitNum = Math.max(1, limit);

    // Build query filters and sorting conditions
    const queryFilter = filter;
    const querySort = sort;

    // Fetch filtered users with pagination
    const users = await User.find(queryFilter)
      .sort(querySort) // Sorting by provided conditions
      .skip((pageNum - 1) * limitNum) // Skip based on the current page
      .limit(limitNum); // Limit results to the specified page size

    // Count the total number of matching users
    const totalUsers = await User.countDocuments(queryFilter);

    // Manually serialize data to remove non-serializable fields like ObjectId
    const serializedData = users.map((user) => {
      return {
        ...user.toObject(),
        _id: user._id.toString(), // Convert ObjectId to string
        createdAt: user.createdAt ? user.createdAt.toISOString() : null,
        updatedAt: user.updatedAt ? user.updatedAt.toISOString() : null,
      };
    });

    return {
      metadata: {
        total: totalUsers,
        page: pageNum,
      },
      data: serializedData,
    };
  } catch (error) {
    handleError(error);
    return { metadata: { total: 0, page: 1 }, data: [] };
  }
}

// DELETE
export async function deleteUser(clerkId: string) {
  try {
    await connectDB();

    // Find user to delete
    const userToDelete = await User.findOne({ clerkId });

    if (!userToDelete) {
      throw new Error("User not found");
    }

    // Delete user
    const deletedUser = await User.findByIdAndDelete(userToDelete._id);
    revalidatePath("/");

    return deletedUser ? JSON.parse(JSON.stringify(deletedUser)) : null;
  } catch (error) {
    handleError(error);
  }
}

// USE CREDITS
export async function updateCredits(userId: string, creditFee: number) {
  try {
    await connectDB();

    const updatedUserCredits = await User.findOneAndUpdate(
      { _id: userId },
      { $inc: { creditBalance: creditFee } },
      { new: true }
    );

    if (!updatedUserCredits) throw new Error("User credits update failed");

    return JSON.parse(JSON.stringify(updatedUserCredits));
  } catch (error) {
    handleError(error);
  }
}

// export async function normalizeUsers() {
//   try {
//     const users = await User.find({});

//     for (const user of users) {
//       let updated = false;

//       // Add missing top-level flags
//       if (user.hasOnboard === undefined) {
//         user.hasOnboard = false;
//         updated = true;
//       }

//       if (user.isAdmin === undefined) {
//         user.isAdmin = false;
//         updated = true;
//       }

//       if (user.hasActiveSubscription === undefined) {
//         user.hasActiveSubscription = false;
//         updated = true;
//       }

//       // Add or normalize account
//       if (!user.account) {
//         user.account = {
//           imageCredits: 0,
//           postCredits: 0,
//           subscription: null,
//         };
//         updated = true;
//       }

//       // Add or normalize settings
//       if (!user.settings) {
//         user.settings = {
//           headline: null,
//           shareContent: [],
//           postPurpose: [],
//           writingStyle: [],
//           industry: [],
//           jobDescription: [],
//           fineTuning: "",
//           cta: null,
//           topics: [],
//           createdAt: new Date(),
//           updatedAt: new Date(),
//         };
//         updated = true;
//       } else {
//         // Ensure all keys exist (for partially filled settings)
//         const s = user.settings;

//         if (s.headline === undefined) s.headline = null;
//         if (!Array.isArray(s.shareContent)) s.shareContent = [];
//         if (!Array.isArray(s.postPurpose)) s.postPurpose = [];
//         if (!Array.isArray(s.writingStyle)) s.writingStyle = [];
//         if (!Array.isArray(s.industry)) s.industry = [];
//         if (!Array.isArray(s.jobDescription)) s.jobDescription = [];
//         if (s.fineTuning === undefined) s.fineTuning = "";
//         if (s.cta === undefined) s.cta = null;
//         if (!Array.isArray(s.topics)) s.topics = [];
//         if (!s.createdAt) s.createdAt = new Date();
//         if (!s.updatedAt) s.updatedAt = new Date();

//         updated = true;
//       }

//       if (updated) {
//         await user.save();
//         console.log(`✅ Updated user: ${user.email}`);
//       }
//     }

//     console.log("🎉 All users normalized successfully.");
//   } catch (error) {
//     console.error("❌ Failed to normalize users:", error);
//   }
// }

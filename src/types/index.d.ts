/* eslint-disable no-unused-vars */
// ====== USER PARAMS
declare type CreateUserParams = {
  clerkId: string;
  email: string;
  username: string;
  firstName?: string;
  lastName?: string;
  photo?: string;
  onboarding?: boolean;
  planId?: number;
  creditBalance?: number;
  membershipStatus?: "active" | "inactive" | "cancelled";
  createdAt?: Date;
  updatedAt?: Date;
};

declare type UpdateUserParams = {
  email?: string;
  username?: string;
  firstName?: string;
  lastName?: string;
  photo?: string;
  onboarding?: boolean;
  planId?: number;
  creditBalance?: number;
  membershipStatus?: "active" | "inactive" | "cancelled";
  createdAt?: Date;
  updatedAt?: Date;
};

export interface UserAccount {
  imageCredits: number;
  postCredits: number;
  subscription: string | null;
}

export interface UserSettings {
  headline: string | null;
  shareContent: string[];
  postPurpose: string[];
  writingStyle: string[];
  industry: string[];
  jobDescription: string[];
  fineTuning: string;
  cta: string | null;
  topics: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IUser {
  _id?: string;
  clerkId: string;
  email: string;
  username: string;
  firstName?: string;
  lastName?: string;
  photo?: string;
  hasOnboard: boolean;
  isAdmin: boolean;
  hasActiveSubscription: boolean;
  account: UserAccount;
  settings: UserSettings;
  createdAt?: Date;
  updatedAt?: Date;
}
export type UserDocument = IUser;

export type UserCreateInput = Partial<Omit<IUser, "createdAt" | "updatedAt">>;

export type UserUpdateInput = Partial<UserCreateInput>;
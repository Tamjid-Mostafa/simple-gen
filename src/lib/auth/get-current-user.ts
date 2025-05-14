import { auth } from "@clerk/nextjs/server";
import { getUserById } from "../actions/user.action";

export async function getCurrentUser() {
  const { userId } = await auth();
  if (!userId) return null;

  const user = await getUserById(userId);
  return user;
}

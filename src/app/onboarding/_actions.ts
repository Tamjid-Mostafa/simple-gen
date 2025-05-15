'use server'

import { auth, clerkClient } from '@clerk/nextjs/server'

export const completeOnboarding = async () => {
  const client = await clerkClient()
  const { userId } = await auth()

  if (!userId) {
    return { message: 'No Logged In User' }
  }

  try {
    await client.users.updateUserMetadata(userId, {
      publicMetadata: {
        hasOnboard: true,
      },
    })
    console.log('User metadata updated successfully');
    return { message: 'User metadata Updated' }
  } catch (e) {
    console.log('error', e)
    return { message: 'Error Updating User Metadata' }
  }
}
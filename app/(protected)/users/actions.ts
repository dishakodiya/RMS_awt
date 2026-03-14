'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export async function deleteUser(userId: string) {
  await prisma.users.delete({
    where: {
      user_id: Number(userId),
    },
  })

  // Revalidate users page so UI updates
  revalidatePath('/users')
}
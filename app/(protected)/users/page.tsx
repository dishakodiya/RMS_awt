import { prisma } from '@/lib/prisma'
import UsersClient from './UsersClient'

export default async function UsersPage() {
  const data = await prisma.users.findMany({
    select: {
      user_id: true,
      name: true,
      email: true,
      role: true,
      created_at: true,
    },
    orderBy: {
      created_at: 'desc',
    },
  });

  // Convert DB rows → theme User type
  const users = data.map(u => ({
    id: u.user_id.toString(),
    name: u.name,
    email: u.email,
    role: u.role,
    createdAt: u.created_at?.toISOString() ?? '',
  }));

  return <UsersClient users={users} />;

}

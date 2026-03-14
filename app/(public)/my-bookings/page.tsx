'use server'

import { prisma } from '@/lib/prisma'
import { cookies } from 'next/headers'
import { verifyToken } from '@/lib/auth'
import { redirect } from 'next/navigation'
import MyBookingsClient from './MyBookingsClient'

export default async function MyBookingsPage() {
  const cookieStore = await cookies()
  const token = cookieStore.get('token')?.value
  
  if (!token) {
     redirect('/login')
  }

  const payload = verifyToken(token)
  
  if (!payload) {
     redirect('/login')
  }

  const data = await prisma.bookings.findMany({
    where: {
       user_id: payload.userId
    },
    include: {
      resources: {
         include: {
             resource_types: true,
             buildings: true
         }
      },
      users_bookings_approver_idTousers: true,
    },
    orderBy: {
      start_datetime: 'desc',
    },
  })

  // Serialize dates
  const bookings = data.map(b => ({
    ...b,
    start_datetime: b.start_datetime.toISOString(),
    end_datetime: b.end_datetime.toISOString(),
    created_at: b.created_at ? b.created_at.toISOString() : null,
  }))

  return <MyBookingsClient initialBookings={bookings} />
}

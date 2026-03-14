
'use server'

import { prisma } from '@/lib/prisma'
import BookingsClient from './BookingsClient'

export default async function BookingsPage() {
  const data = await prisma.bookings.findMany({
    include: {
      resources: true,
      users_bookings_user_idTousers: true,
      users_bookings_approver_idTousers: true,
    },
    orderBy: {
      booking_id: 'desc',
    },
  })

  // Serialize dates
  const bookings = data.map(b => ({
    ...b,
    start_datetime: b.start_datetime.toISOString(),
    end_datetime: b.end_datetime.toISOString(),
    created_at: b.created_at ? b.created_at.toISOString() : null,
  }))

  return <BookingsClient bookings={bookings} />
}

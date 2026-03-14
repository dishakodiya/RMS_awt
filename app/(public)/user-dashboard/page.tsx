'use server'

import { prisma } from '@/lib/prisma'
import UserDashboardClient from './UserDashboardClient'

export default async function UserDashboardPage() {
  const data = await prisma.resources.findMany({
    include: {
      resource_types: true,
      buildings: true,
      facilities: true,
      cupboards: {
         include: {
            shelves: true
         }
      }
    },
    orderBy: {
      resource_name: 'asc'
    },
  })

  // We fetch bookings and maintenance to calculate availability on the client side based on the selected date
  const activeBookings = await prisma.bookings.findMany({
     where: { end_datetime: { gte: new Date(new Date().setHours(0,0,0,0)) } }
  });

  const activeMaintenance = await prisma.maintenance.findMany({
     where: { status: { not: 'Completed' } }
  });

  // Serialize everything to pass to Client Component safely
  const resources = data.map(r => ({
      ...r,
  }))

  const serializedBookings = activeBookings.map(b => ({
    ...b,
    start_datetime: b.start_datetime.toISOString(),
    end_datetime: b.end_datetime.toISOString(),
    created_at: b.created_at ? b.created_at.toISOString() : null,
  }));

  const serializedMaintenance = activeMaintenance.map(m => ({
    ...m,
    scheduled_date: m.scheduled_date ? m.scheduled_date.toISOString() : null,
  }));

  return (
    <UserDashboardClient 
      resources={resources} 
      activeBookings={serializedBookings} 
      activeMaintenance={serializedMaintenance} 
    />
  )
}



'use server'

import { prisma } from '@/lib/prisma'
import MaintenanceClient from './MaintenanceClient'

export default async function MaintenancePage() {
  const data = await prisma.maintenance.findMany({
    include: {
      resources: true,
      users: true,
    },
    orderBy: {
      maintenance_id: 'desc',
    },
  })

  // Serialize dates
  const maintenance = data.map(m => ({
    ...m,
    scheduled_date: m.scheduled_date ? m.scheduled_date.toISOString() : null,
  }))

  return <MaintenanceClient maintenance={maintenance} />
}

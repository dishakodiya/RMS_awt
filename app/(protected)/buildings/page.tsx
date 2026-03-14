
'use server'

import { prisma } from '@/lib/prisma'
import BuildingsClient from './BuildingsClient'

export default async function BuildingsPage() {
  const data = await prisma.buildings.findMany({
    orderBy: {
      building_id: 'asc',
    },
  })

  return <BuildingsClient buildings={data} />
}
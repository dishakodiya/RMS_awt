
'use server'

import { prisma } from '@/lib/prisma'
import ResourcesClient from './ResourcesClient'

export default async function ResourcesPage() {
  // Fetch resources with relations
  const data = await prisma.resources.findMany({
    include: {
      resource_types: true,
      buildings: true,
    },
    orderBy: {
      resource_id: 'asc',
    },
  })

  return <ResourcesClient resources={data} />
}

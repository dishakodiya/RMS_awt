
'use server'

import { prisma } from '@/lib/prisma'
import ResourceTypesClient from './ResourceTypesClient'

export default async function ResourceTypesPage() {
  const data = await prisma.resource_types.findMany({
    orderBy: {
      resource_type_id: 'asc',
    },
  })

  return <ResourceTypesClient resourceTypes={data} />
}

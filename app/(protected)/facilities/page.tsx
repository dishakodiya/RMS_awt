
'use server'

import { prisma } from '@/lib/prisma'
import FacilitiesClient from './FacilitiesClient'

export default async function FacilitiesPage() {
  const data = await prisma.facilities.findMany({
    include: {
      resources: true,
    },
    orderBy: {
      facility_id: 'asc',
    },
  })

  return <FacilitiesClient facilities={data} />
}
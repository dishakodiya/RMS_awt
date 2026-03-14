
'use server'

import { prisma } from '@/lib/prisma'
import CupboardsClient from './CupboardsClient'

export default async function CupboardsPage() {
  const data = await prisma.cupboards.findMany({
    include: {
      resources: true,
    },
    orderBy: {
      cupboard_id: 'asc',
    },
  })

  return <CupboardsClient cupboards={data} />
}

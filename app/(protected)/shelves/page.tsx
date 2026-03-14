
'use server'

import { prisma } from '@/lib/prisma'
import ShelvesClient from './ShelvesClient'

export default async function ShelvesPage() {
  const data = await prisma.shelves.findMany({
    include: {
      cupboards: true,
    },
    orderBy: {
      shelf_id: 'asc',
    },
  })

  return <ShelvesClient shelves={data} />
}

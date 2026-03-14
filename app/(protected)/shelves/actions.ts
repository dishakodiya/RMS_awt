
'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function createShelf(formData: FormData) {
    const cupboard_id = Number(formData.get('cupboard_id'))
    const shelf_number = formData.get('shelf_number') ? Number(formData.get('shelf_number')) : null
    const capacity = formData.get('capacity') ? Number(formData.get('capacity')) : null
    const description = String(formData.get('description')) || null

    await prisma.shelves.create({
        data: {
            cupboard_id,
            shelf_number,
            capacity,
            description,
        },
    })

    redirect('/shelves')
}

export async function updateShelf(id: number, formData: FormData) {
    const cupboard_id = Number(formData.get('cupboard_id'))
    const shelf_number = formData.get('shelf_number') ? Number(formData.get('shelf_number')) : null
    const capacity = formData.get('capacity') ? Number(formData.get('capacity')) : null
    const description = String(formData.get('description')) || null

    await prisma.shelves.update({
        where: { shelf_id: id },
        data: {
            cupboard_id,
            shelf_number,
            capacity,
            description,
        },
    })

    redirect('/shelves')
}

export async function deleteShelf(id: number) {
    await prisma.shelves.delete({
        where: {
            shelf_id: id,
        },
    })

    revalidatePath('/shelves')
}

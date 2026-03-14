
'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function createCupboard(formData: FormData) {
    const cupboard_name = String(formData.get('cupboard_name')) || null
    const resource_id = Number(formData.get('resource_id'))
    const total_shelves = formData.get('total_shelves') ? Number(formData.get('total_shelves')) : null

    await prisma.cupboards.create({
        data: {
            cupboard_name,
            resource_id,
            total_shelves,
        },
    })

    redirect('/cupboards')
}

export async function updateCupboard(id: number, formData: FormData) {
    const cupboard_name = String(formData.get('cupboard_name')) || null
    const resource_id = Number(formData.get('resource_id'))
    const total_shelves = formData.get('total_shelves') ? Number(formData.get('total_shelves')) : null

    await prisma.cupboards.update({
        where: { cupboard_id: id },
        data: {
            cupboard_name,
            resource_id,
            total_shelves,
        },
    })

    redirect('/cupboards')
}

export async function deleteCupboard(id: number) {
    await prisma.cupboards.delete({
        where: {
            cupboard_id: id,
        },
    })

    revalidatePath('/cupboards')
}


'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function createResource(formData: FormData) {
    const resource_name = String(formData.get('resource_name'))
    const resource_type_id = Number(formData.get('resource_type_id'))
    const building_id = Number(formData.get('building_id'))
    const floor_number = formData.get('floor_number') ? Number(formData.get('floor_number')) : null
    const description = String(formData.get('description')) || null

    await prisma.resources.create({
        data: {
            resource_name,
            resource_type_id,
            building_id,
            floor_number,
            description,
        },
    })

    redirect('/resources')
}

export async function updateResource(id: number, formData: FormData) {
    const resource_name = String(formData.get('resource_name'))
    const resource_type_id = Number(formData.get('resource_type_id'))
    const building_id = Number(formData.get('building_id'))
    const floor_number = formData.get('floor_number') ? Number(formData.get('floor_number')) : null
    const description = String(formData.get('description')) || null

    await prisma.resources.update({
        where: { resource_id: id },
        data: {
            resource_name,
            resource_type_id,
            building_id,
            floor_number,
            description,
        },
    })

    redirect('/resources')
}

export async function deleteResource(id: number) {
    await prisma.resources.delete({
        where: {
            resource_id: id,
        },
    })

    revalidatePath('/resources')
}

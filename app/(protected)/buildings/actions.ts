
'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function createBuilding(formData: FormData) {
    const building_name = String(formData.get('building_name'))
    const building_number = String(formData.get('building_number')) || null
    const total_floors = formData.get('total_floors') ? Number(formData.get('total_floors')) : null

    await prisma.buildings.create({
        data: {
            building_name,
            building_number,
            total_floors,
        },
    })

    redirect('/buildings')
}

export async function updateBuilding(id: number, formData: FormData) {
    const building_name = String(formData.get('building_name'))
    const building_number = String(formData.get('building_number')) || null
    const total_floors = formData.get('total_floors') ? Number(formData.get('total_floors')) : null

    await prisma.buildings.update({
        where: { building_id: id },
        data: {
            building_name,
            building_number,
            total_floors,
        },
    })

    redirect('/buildings')
}

export async function deleteBuilding(id: number) {
    await prisma.buildings.delete({
        where: {
            building_id: id,
        },
    })

    revalidatePath('/buildings')
}

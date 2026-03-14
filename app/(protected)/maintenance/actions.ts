
'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function createMaintenance(formData: FormData) {
    const resource_id = Number(formData.get('resource_id'))
    const user_id = Number(formData.get('user_id'))
    const maintenance_type = String(formData.get('maintenance_type')) || null
    const scheduled_date = formData.get('scheduled_date') ? new Date(String(formData.get('scheduled_date'))) : null
    const status = String(formData.get('status')) || 'Pending'
    const notes = String(formData.get('notes')) || null

    await prisma.maintenance.create({
        data: {
            resource_id,
            user_id,
            maintenance_type,
            scheduled_date,
            status,
            notes,
        },
    })

    redirect('/maintenance')
}

export async function updateMaintenance(id: number, formData: FormData) {
    const resource_id = Number(formData.get('resource_id'))
    const user_id = Number(formData.get('user_id'))
    const maintenance_type = String(formData.get('maintenance_type')) || null
    const scheduled_date = formData.get('scheduled_date') ? new Date(String(formData.get('scheduled_date'))) : null
    const status = String(formData.get('status')) || 'Pending'
    const notes = String(formData.get('notes')) || null

    await prisma.maintenance.update({
        where: { maintenance_id: id },
        data: {
            resource_id,
            user_id,
            maintenance_type,
            scheduled_date,
            status,
            notes,
        },
    })

    redirect('/maintenance')
}

export async function deleteMaintenance(id: number) {
    await prisma.maintenance.delete({
        where: {
            maintenance_id: id,
        },
    })

    revalidatePath('/maintenance')
}

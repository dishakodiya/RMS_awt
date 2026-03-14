
'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function createFacility(formData: FormData) {
    const facility_name = String(formData.get('facility_name'))
    const resource_id = Number(formData.get('resource_id'))
    const details = String(formData.get('details')) || null

    await prisma.facilities.create({
        data: {
            facility_name,
            resource_id,
            details,
        },
    })

    redirect('/facilities')
}

export async function updateFacility(id: number, formData: FormData) {
    const facility_name = String(formData.get('facility_name'))
    const resource_id = Number(formData.get('resource_id'))
    const details = String(formData.get('details')) || null

    await prisma.facilities.update({
        where: { facility_id: id },
        data: {
            facility_name,
            resource_id,
            details,
        },
    })

    redirect('/facilities')
}

export async function deleteFacility(id: number) {
    await prisma.facilities.delete({
        where: {
            facility_id: id,
        },
    })

    revalidatePath('/facilities')
}

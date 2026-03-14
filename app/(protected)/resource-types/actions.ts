
'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function createResourceType(formData: FormData) {
    const type_name = String(formData.get('type_name'))

    await prisma.resource_types.create({
        data: {
            type_name,
        },
    })

    redirect('/resource-types')
}

export async function updateResourceType(id: number, formData: FormData) {
    const type_name = String(formData.get('type_name'))

    await prisma.resource_types.update({
        where: { resource_type_id: id },
        data: {
            type_name,
        },
    })

    redirect('/resource-types')
}

export async function deleteResourceType(id: number) {
    await prisma.resource_types.delete({
        where: {
            resource_type_id: id,
        },
    })

    revalidatePath('/resource-types')
}


'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function createBooking(formData: FormData) {
    const resource_id = Number(formData.get('resource_id'))
    const user_id = Number(formData.get('user_id'))
    const start_datetime = new Date(String(formData.get('start_datetime')))
    const end_datetime = new Date(String(formData.get('end_datetime')))
    const status = String(formData.get('status')) || 'Pending'
    const approver_id = formData.get('approver_id') ? Number(formData.get('approver_id')) : null

    await prisma.bookings.create({
        data: {
            resource_id,
            user_id,
            start_datetime,
            end_datetime,
            status,
            approver_id,
        },
    })

    redirect('/bookings')
}

export async function updateBooking(id: number, formData: FormData) {
    const resource_id = Number(formData.get('resource_id'))
    const user_id = Number(formData.get('user_id'))
    const start_datetime = new Date(String(formData.get('start_datetime')))
    const end_datetime = new Date(String(formData.get('end_datetime')))
    const status = String(formData.get('status')) || 'Pending'
    const approver_id = formData.get('approver_id') ? Number(formData.get('approver_id')) : null

    await prisma.bookings.update({
        where: { booking_id: id },
        data: {
            resource_id,
            user_id,
            start_datetime,
            end_datetime,
            status,
            approver_id,
        },
    })

    redirect('/bookings')
}

export async function deleteBooking(id: number) {
    await prisma.bookings.delete({
        where: {
            booking_id: id,
        },
    })

    revalidatePath('/bookings')
}

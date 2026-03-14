
'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import { verifyToken } from '@/lib/auth'

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

async function getCurrentApproverId(): Promise<number | null> {
    const cookieStore = await cookies()
    const token = cookieStore.get('token')?.value
    if (!token) return null

    const payload = verifyToken(token)
    if (!payload) return null

    if (payload.role !== 'Approver' && payload.role !== 'Admin') {
        return null
    }

    return payload.userId
}

export async function approveBooking(id: number) {
    const approverId = await getCurrentApproverId()
    if (!approverId) {
        throw new Error('Not authorized to approve bookings')
    }

    await prisma.bookings.update({
        where: { booking_id: id },
        data: {
            status: 'Approved',
            approver_id: approverId,
        },
    })

    revalidatePath('/bookings')
}

export async function rejectBooking(id: number) {
    const approverId = await getCurrentApproverId()
    if (!approverId) {
        throw new Error('Not authorized to reject bookings')
    }

    await prisma.bookings.update({
        where: { booking_id: id },
        data: {
            status: 'Rejected',
            approver_id: approverId,
        },
    })

    revalidatePath('/bookings')
}

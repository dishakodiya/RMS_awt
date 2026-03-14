'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'
import { verifyToken } from '@/lib/auth'

export async function createUserDashboardBooking(formData: FormData) {
    const resource_id = Number(formData.get('resource_id'))
    const start_datetime = new Date(String(formData.get('start_datetime')))
    const end_datetime = new Date(String(formData.get('end_datetime')))
    
    // Get user from token
    const cookieStore = await cookies()
    const token = cookieStore.get('token')?.value
    if (!token) throw new Error('Not authenticated')
    
    const payload = verifyToken(token)
    if (!payload) throw new Error('Invalid token')
    
    const user_id = payload.userId

    // Auto-approve or pending? Usually admin approves, so default to Pending.
    const status = 'Pending'

    await prisma.bookings.create({
        data: {
            resource_id,
            user_id,
            start_datetime,
            end_datetime,
            status,
        },
    })

    revalidatePath('/user-dashboard')
    revalidatePath('/my-bookings')
}



import { prisma } from '@/lib/prisma'
import { updateBooking } from '../../actions'
import { redirect } from 'next/navigation'
import Link from 'next/link'

export default async function EditBookingPage({ params }: { params: { id: string } }) {
    const { id } = await params

    const booking = await prisma.bookings.findUnique({
        where: { booking_id: Number(id) },
    })

    if (!booking) {
        redirect('/bookings')
    }

    const resources = await prisma.resources.findMany()
    const users = await prisma.users.findMany()

    const updateAction = updateBooking.bind(null, booking.booking_id)

    return (
        <div className="container py-4" style={{ maxWidth: '600px' }}>
            <div className="page-header">
                <h1>Edit Booking</h1>
            </div>

            <form action={updateAction} className="card">
                <div className="card-body">
                    <div className="mb-3">
                        <label className="form-label">Resource</label>
                        <select
                            name="resource_id"
                            defaultValue={booking.resource_id}
                            className="form-select"
                            required
                        >
                            <option value="">Select Resource</option>
                            {resources.map(r => (
                                <option key={r.resource_id} value={r.resource_id}>
                                    {r.resource_name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="mb-3">
                        <label className="form-label">User</label>
                        <select
                            name="user_id"
                            defaultValue={booking.user_id}
                            className="form-select"
                            required
                        >
                            <option value="">Select User</option>
                            {users.map(u => (
                                <option key={u.user_id} value={u.user_id}>
                                    {u.name} ({u.email})
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <label className="form-label">Start Date & Time</label>
                            <input
                                name="start_datetime"
                                type="datetime-local"
                                defaultValue={booking.start_datetime.toISOString().slice(0, 16)}
                                className="form-control"
                                required
                            />
                        </div>
                        <div className="col-md-6 mb-3">
                            <label className="form-label">End Date & Time</label>
                            <input
                                name="end_datetime"
                                type="datetime-local"
                                defaultValue={booking.end_datetime.toISOString().slice(0, 16)}
                                className="form-control"
                                required
                            />
                        </div>
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Status</label>
                        <select
                            name="status"
                            defaultValue={booking.status || 'Pending'}
                            className="form-select"
                        >
                            <option value="Pending">Pending</option>
                            <option value="Approved">Approved</option>
                            <option value="Rejected">Rejected</option>
                        </select>
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Approver (Optional)</label>
                        <select
                            name="approver_id"
                            defaultValue={booking.approver_id || ''}
                            className="form-select"
                        >
                            <option value="">None</option>
                            {users.filter(u => u.role === 'Approver' || u.role === 'Admin').map(u => (
                                <option key={u.user_id} value={u.user_id}>
                                    {u.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="d-flex justify-content-end gap-2">
                        <Link href="/bookings" className="btn btn-secondary">
                            Cancel
                        </Link>
                        <button type="submit" className="btn btn-primary">
                            Update
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}

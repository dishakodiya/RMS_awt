
import { createBooking } from '../actions'
import { prisma } from '@/lib/prisma'
import Link from 'next/link'

export default async function NewBookingPage() {
    const resources = await prisma.resources.findMany()
    const users = await prisma.users.findMany()

    return (
        <div className="container py-4" style={{ maxWidth: '600px' }}>
            <div className="page-header">
                <h1>New Booking</h1>
            </div>

            <form action={createBooking} className="card">
                <div className="card-body">
                    <div className="mb-3">
                        <label className="form-label">Resource</label>
                        <select name="resource_id" className="form-select" required>
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
                        <select name="user_id" className="form-select" required>
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
                            <input name="start_datetime" type="datetime-local" className="form-control" required />
                        </div>
                        <div className="col-md-6 mb-3">
                            <label className="form-label">End Date & Time</label>
                            <input name="end_datetime" type="datetime-local" className="form-control" required />
                        </div>
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Status</label>
                        <select name="status" className="form-select">
                            <option value="Pending">Pending</option>
                            <option value="Approved">Approved</option>
                            <option value="Rejected">Rejected</option>
                        </select>
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Approver (Optional)</label>
                        <select name="approver_id" className="form-select">
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
                            Save
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}

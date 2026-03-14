
import { createMaintenance } from '../actions'
import { prisma } from '@/lib/prisma'
import Link from 'next/link'

export default async function NewMaintenancePage() {
    const resources = await prisma.resources.findMany()
    const users = await prisma.users.findMany()

    return (
        <div className="container py-4" style={{ maxWidth: '600px' }}>
            <div className="page-header">
                <h1>Schedule Maintenance</h1>
            </div>

            <form action={createMaintenance} className="card">
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
                        <label className="form-label">Reported By (User)</label>
                        <select name="user_id" className="form-select" required>
                            <option value="">Select User</option>
                            {users.map(u => (
                                <option key={u.user_id} value={u.user_id}>
                                    {u.name} ({u.email})
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Maintenance Type</label>
                        <input name="maintenance_type" className="form-control" placeholder="e.g. Repair, Cleaning" />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Scheduled Date</label>
                        <input name="scheduled_date" type="date" className="form-control" />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Status</label>
                        <select name="status" className="form-select">
                            <option value="Pending">Pending</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Completed">Completed</option>
                        </select>
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Notes</label>
                        <textarea name="notes" className="form-control" rows={3}></textarea>
                    </div>

                    <div className="d-flex justify-content-end gap-2">
                        <Link href="/maintenance" className="btn btn-secondary">
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


import { prisma } from '@/lib/prisma'
import { updateMaintenance } from '../../actions'
import { redirect } from 'next/navigation'
import Link from 'next/link'

export default async function EditMaintenancePage({ params }: { params: { id: string } }) {
    const { id } = await params

    const maintenance = await prisma.maintenance.findUnique({
        where: { maintenance_id: Number(id) },
    })

    if (!maintenance) {
        redirect('/maintenance')
    }

    const resources = await prisma.resources.findMany()
    const users = await prisma.users.findMany()

    const updateAction = updateMaintenance.bind(null, maintenance.maintenance_id)

    return (
        <div className="container py-4" style={{ maxWidth: '600px' }}>
            <div className="page-header">
                <h1>Edit Maintenance Record</h1>
            </div>

            <form action={updateAction} className="card">
                <div className="card-body">
                    <div className="mb-3">
                        <label className="form-label">Resource</label>
                        <select
                            name="resource_id"
                            defaultValue={maintenance.resource_id}
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
                        <label className="form-label">Reported By (User)</label>
                        <select
                            name="user_id"
                            defaultValue={maintenance.user_id}
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

                    <div className="mb-3">
                        <label className="form-label">Maintenance Type</label>
                        <input
                            name="maintenance_type"
                            defaultValue={maintenance.maintenance_type || ''}
                            className="form-control"
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Scheduled Date</label>
                        <input
                            name="scheduled_date"
                            type="date"
                            defaultValue={maintenance.scheduled_date ? maintenance.scheduled_date.toISOString().split('T')[0] : ''}
                            className="form-control"
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Status</label>
                        <select
                            name="status"
                            defaultValue={maintenance.status || 'Pending'}
                            className="form-select"
                        >
                            <option value="Pending">Pending</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Completed">Completed</option>
                        </select>
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Notes</label>
                        <textarea
                            name="notes"
                            defaultValue={maintenance.notes || ''}
                            className="form-control"
                            rows={3}
                        ></textarea>
                    </div>

                    <div className="d-flex justify-content-end gap-2">
                        <Link href="/maintenance" className="btn btn-secondary">
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


import { prisma } from '@/lib/prisma'
import { updateFacility } from '../../actions'
import { redirect } from 'next/navigation'
import Link from 'next/link'

export default async function EditFacilityPage({ params }: { params: { id: string } }) {
    const { id } = await params

    const facility = await prisma.facilities.findUnique({
        where: { facility_id: Number(id) },
    })

    if (!facility) {
        redirect('/facilities')
    }

    const resources = await prisma.resources.findMany()

    const updateAction = updateFacility.bind(null, facility.facility_id)

    return (
        <div className="container py-4" style={{ maxWidth: '600px' }}>
            <div className="page-header">
                <h1>Edit Facility</h1>
            </div>

            <form action={updateAction} className="card">
                <div className="card-body">
                    <div className="mb-3">
                        <label className="form-label">Facility Name</label>
                        <input
                            name="facility_name"
                            defaultValue={facility.facility_name}
                            className="form-control"
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Located In (Resource)</label>
                        <select
                            name="resource_id"
                            defaultValue={facility.resource_id}
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
                        <label className="form-label">Details</label>
                        <textarea
                            name="details"
                            defaultValue={facility.details || ''}
                            className="form-control"
                            rows={3}
                        ></textarea>
                    </div>

                    <div className="d-flex justify-content-end gap-2">
                        <Link href="/facilities" className="btn btn-secondary">
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

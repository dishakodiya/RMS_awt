
import { createFacility } from '../actions'
import { prisma } from '@/lib/prisma'
import Link from 'next/link'

export default async function NewFacilityPage() {
    const resources = await prisma.resources.findMany()

    return (
        <div className="container py-4" style={{ maxWidth: '600px' }}>
            <div className="page-header">
                <h1>Add Facility</h1>
            </div>

            <form action={createFacility} className="card">
                <div className="card-body">
                    <div className="mb-3">
                        <label className="form-label">Facility Name</label>
                        <input name="facility_name" className="form-control" required placeholder="e.g. WiFi, Air Conditioning" />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Located In (Resource)</label>
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
                        <label className="form-label">Details</label>
                        <textarea name="details" className="form-control" rows={3} placeholder="Additional details..."></textarea>
                    </div>

                    <div className="d-flex justify-content-end gap-2">
                        <Link href="/facilities" className="btn btn-secondary">
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

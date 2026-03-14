
import { createResource } from '../actions'
import { prisma } from '@/lib/prisma'
import Link from 'next/link'

export default async function NewResourcePage() {
    const types = await prisma.resource_types.findMany()
    const buildings = await prisma.buildings.findMany()

    return (
        <div className="container py-4" style={{ maxWidth: '600px' }}>
            <div className="page-header">
                <h1>Add Resource</h1>
            </div>

            <form action={createResource} className="card">
                <div className="card-body">
                    <div className="mb-3">
                        <label className="form-label">Resource Name</label>
                        <input name="resource_name" className="form-control" required placeholder="e.g. Conference Room A" />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Resource Type</label>
                        <select name="resource_type_id" className="form-select" required>
                            <option value="">Select Type</option>
                            {types.map(t => (
                                <option key={t.resource_type_id} value={t.resource_type_id}>
                                    {t.type_name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Building</label>
                        <select name="building_id" className="form-select" required>
                            <option value="">Select Building</option>
                            {buildings.map(b => (
                                <option key={b.building_id} value={b.building_id}>
                                    {b.building_name} {b.building_number ? `(${b.building_number})` : ''}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Floor Number</label>
                        <input name="floor_number" type="number" className="form-control" placeholder="e.g. 2" />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Description</label>
                        <textarea name="description" className="form-control" rows={3} placeholder="Optional description..."></textarea>
                    </div>

                    <div className="d-flex justify-content-end gap-2">
                        <Link href="/resources" className="btn btn-secondary">
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

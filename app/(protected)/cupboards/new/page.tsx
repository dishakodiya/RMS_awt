
import { createCupboard } from '../actions'
import { prisma } from '@/lib/prisma'
import Link from 'next/link'

export default async function NewCupboardPage() {
    const resources = await prisma.resources.findMany()

    return (
        <div className="container py-4" style={{ maxWidth: '600px' }}>
            <div className="page-header">
                <h1>Add Cupboard</h1>
            </div>

            <form action={createCupboard} className="card">
                <div className="card-body">
                    <div className="mb-3">
                        <label className="form-label">Cupboard Name</label>
                        <input name="cupboard_name" className="form-control" placeholder="e.g. Storage A" />
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
                        <label className="form-label">Total Shelves</label>
                        <input name="total_shelves" type="number" className="form-control" placeholder="e.g. 4" />
                    </div>

                    <div className="d-flex justify-content-end gap-2">
                        <Link href="/cupboards" className="btn btn-secondary">
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

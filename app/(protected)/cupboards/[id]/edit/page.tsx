
import { prisma } from '@/lib/prisma'
import { updateCupboard } from '../../actions'
import { redirect } from 'next/navigation'
import Link from 'next/link'

export default async function EditCupboardPage({ params }: { params: { id: string } }) {
    const { id } = await params

    const cupboard = await prisma.cupboards.findUnique({
        where: { cupboard_id: Number(id) },
    })

    if (!cupboard) {
        redirect('/cupboards')
    }

    const resources = await prisma.resources.findMany()

    const updateAction = updateCupboard.bind(null, cupboard.cupboard_id)

    return (
        <div className="container py-4" style={{ maxWidth: '600px' }}>
            <div className="page-header">
                <h1>Edit Cupboard</h1>
            </div>

            <form action={updateAction} className="card">
                <div className="card-body">
                    <div className="mb-3">
                        <label className="form-label">Cupboard Name</label>
                        <input
                            name="cupboard_name"
                            defaultValue={cupboard.cupboard_name || ''}
                            className="form-control"
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Located In (Resource)</label>
                        <select
                            name="resource_id"
                            defaultValue={cupboard.resource_id}
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
                        <label className="form-label">Total Shelves</label>
                        <input
                            name="total_shelves"
                            type="number"
                            defaultValue={cupboard.total_shelves ?? ''}
                            className="form-control"
                        />
                    </div>

                    <div className="d-flex justify-content-end gap-2">
                        <Link href="/cupboards" className="btn btn-secondary">
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

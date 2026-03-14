
import { prisma } from '@/lib/prisma'
import { updateShelf } from '../../actions'
import { redirect } from 'next/navigation'
import Link from 'next/link'

export default async function EditShelfPage({ params }: { params: { id: string } }) {
    const { id } = await params

    const shelf = await prisma.shelves.findUnique({
        where: { shelf_id: Number(id) },
    })

    if (!shelf) {
        redirect('/shelves')
    }

    const cupboards = await prisma.cupboards.findMany()

    const updateAction = updateShelf.bind(null, shelf.shelf_id)

    return (
        <div className="container py-4" style={{ maxWidth: '600px' }}>
            <div className="page-header">
                <h1>Edit Shelf</h1>
            </div>

            <form action={updateAction} className="card">
                <div className="card-body">
                    <div className="mb-3">
                        <label className="form-label">Cupboard</label>
                        <select
                            name="cupboard_id"
                            defaultValue={shelf.cupboard_id}
                            className="form-select"
                            required
                        >
                            <option value="">Select Cupboard</option>
                            {cupboards.map(c => (
                                <option key={c.cupboard_id} value={c.cupboard_id}>
                                    {c.cupboard_name || `Cupboard #${c.cupboard_id}`}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Shelf Number</label>
                        <input
                            name="shelf_number"
                            type="number"
                            defaultValue={shelf.shelf_number ?? ''}
                            className="form-control"
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Capacity</label>
                        <input
                            name="capacity"
                            type="number"
                            defaultValue={shelf.capacity ?? ''}
                            className="form-control"
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Description</label>
                        <textarea
                            name="description"
                            defaultValue={shelf.description || ''}
                            className="form-control"
                            rows={3}
                        ></textarea>
                    </div>

                    <div className="d-flex justify-content-end gap-2">
                        <Link href="/shelves" className="btn btn-secondary">
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

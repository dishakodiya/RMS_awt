
import { createShelf } from '../actions'
import { prisma } from '@/lib/prisma'
import Link from 'next/link'

export default async function NewShelfPage() {
    const cupboards = await prisma.cupboards.findMany()

    return (
        <div className="container py-4" style={{ maxWidth: '600px' }}>
            <div className="page-header">
                <h1>Add Shelf</h1>
            </div>

            <form action={createShelf} className="card">
                <div className="card-body">
                    <div className="mb-3">
                        <label className="form-label">Cupboard</label>
                        <select name="cupboard_id" className="form-select" required>
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
                        <input name="shelf_number" type="number" className="form-control" placeholder="e.g. 1" />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Capacity</label>
                        <input name="capacity" type="number" className="form-control" placeholder="e.g. 10" />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Description</label>
                        <textarea name="description" className="form-control" rows={3} placeholder="Optional description..."></textarea>
                    </div>

                    <div className="d-flex justify-content-end gap-2">
                        <Link href="/shelves" className="btn btn-secondary">
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

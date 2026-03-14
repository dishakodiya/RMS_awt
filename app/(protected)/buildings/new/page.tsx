
'use client'

import { createBuilding } from '../actions'
import Link from 'next/link'

export default function NewBuildingPage() {
    return (
        <div className="container py-4" style={{ maxWidth: '600px' }}>
            <div className="page-header">
                <h1>Add Building</h1>
            </div>

            <form action={createBuilding} className="card">
                <div className="card-body">
                    <div className="mb-3">
                        <label className="form-label">Building Name</label>
                        <input name="building_name" className="form-control" required placeholder="e.g. Science Block" />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Building Number</label>
                        <input name="building_number" className="form-control" placeholder="e.g. B-101" />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Total Floors</label>
                        <input name="total_floors" type="number" className="form-control" placeholder="e.g. 5" />
                    </div>

                    <div className="d-flex justify-content-end gap-2">
                        <Link href="/buildings" className="btn btn-secondary">
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

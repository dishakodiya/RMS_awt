
'use client'

import { createResourceType } from '../actions'
import Link from 'next/link'

export default function NewResourceTypePage() {
    return (
        <div className="container py-4" style={{ maxWidth: '600px' }}>
            <div className="page-header">
                <h1>Add Resource Type</h1>
            </div>

            <form action={createResourceType} className="card">
                <div className="card-body">
                    <div className="mb-3">
                        <label className="form-label">Type Name</label>
                        <input name="type_name" className="form-control" required placeholder="e.g. Hall, Lab, Projector" />
                    </div>

                    <div className="d-flex justify-content-end gap-2">
                        <Link href="/resource-types" className="btn btn-secondary">
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

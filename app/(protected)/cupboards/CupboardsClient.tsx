
'use client'

import { useState } from 'react'
import Link from 'next/link'
import { deleteCupboard } from './actions'

import DeleteConfirmationModal from '@/components/DeleteConfirmationModal'

type Cupboard = {
    cupboard_id: number
    cupboard_name: string | null
    total_shelves: number | null
    resources: {
        resource_name: string
    }
}

export default function CupboardsClient({ cupboards }: { cupboards: Cupboard[] }) {
    const [search, setSearch] = useState('')
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [deleteId, setDeleteId] = useState<number | null>(null)

    const filteredCupboards = cupboards.filter(c =>
        (c.cupboard_name && c.cupboard_name.toLowerCase().includes(search.toLowerCase())) ||
        c.resources.resource_name.toLowerCase().includes(search.toLowerCase())
    )

    const confirmDelete = (id: number) => {
        setDeleteId(id)
        setShowDeleteModal(true)
    }

    const handleDelete = async () => {
        if (deleteId) {
            await deleteCupboard(deleteId)
            setShowDeleteModal(false)
            setDeleteId(null)
        }
    }

    return (
        <div>
            <div className="page-header d-flex justify-content-between align-items-center">
                <div>
                    <h1>
                        <i className="bi bi-archive me-2 text-primary"></i>
                        Cupboards
                    </h1>
                    <p className="text-muted mb-0">Manage storage cupboards</p>
                </div>
                <Link href="/cupboards/new" className="btn btn-primary">
                    <i className="bi bi-plus-circle me-2"></i>
                    Add Cupboard
                </Link>
            </div>

            <div className="card mb-4">
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-4">
                            <div className="search-input-wrapper">
                                <i className="bi bi-search"></i>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Search cupboards..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="card">
                <div className="card-body p-0">
                    <div className="table-responsive">
                        <table className="table table-hover mb-0">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Resource (Location)</th>
                                    <th>Shelves</th>
                                    <th className="text-end">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredCupboards.length === 0 ? (
                                    <tr>
                                        <td colSpan={5} className="text-center text-muted py-4">
                                            No cupboards found
                                        </td>
                                    </tr>
                                ) : (
                                    filteredCupboards.map((cupboard) => (
                                        <tr key={cupboard.cupboard_id}>
                                            <td>{cupboard.cupboard_id}</td>
                                            <td className="fw-semibold">{cupboard.cupboard_name || 'Unnamed Cupboard'}</td>
                                            <td>{cupboard.resources.resource_name}</td>
                                            <td>{cupboard.total_shelves ?? '-'}</td>
                                            <td className="text-end">
                                                <Link
                                                    href={`/cupboards/${cupboard.cupboard_id}/edit`}
                                                    className="btn btn-sm btn-outline-primary me-2"
                                                >
                                                    <i className="bi bi-pencil"></i>
                                                </Link>
                                                <button
                                                    className="btn btn-sm btn-outline-danger"
                                                    onClick={() => confirmDelete(cupboard.cupboard_id)}
                                                >
                                                    <i className="bi bi-trash"></i>
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <DeleteConfirmationModal
                show={showDeleteModal}
                title="Delete Cupboard"
                message="Are you sure you want to delete this cupboard?"
                onClose={() => setShowDeleteModal(false)}
                onConfirm={handleDelete}
            />
        </div>
    )
}

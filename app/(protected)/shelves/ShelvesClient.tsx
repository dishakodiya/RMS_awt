
'use client'

import { useState } from 'react'
import Link from 'next/link'
import { deleteShelf } from './actions'

import DeleteConfirmationModal from '@/components/DeleteConfirmationModal'

type Shelf = {
    shelf_id: number
    shelf_number: number | null
    capacity: number | null
    description: string | null
    cupboards: {
        cupboard_name: string | null
    }
}

export default function ShelvesClient({ shelves }: { shelves: Shelf[] }) {
    const [search, setSearch] = useState('')
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [deleteId, setDeleteId] = useState<number | null>(null)

    const filteredShelves = shelves.filter(s =>
        (s.description && s.description.toLowerCase().includes(search.toLowerCase())) ||
        (s.cupboards.cupboard_name && s.cupboards.cupboard_name.toLowerCase().includes(search.toLowerCase()))
    )

    const confirmDelete = (id: number) => {
        setDeleteId(id)
        setShowDeleteModal(true)
    }

    const handleDelete = async () => {
        if (deleteId) {
            await deleteShelf(deleteId)
            setShowDeleteModal(false)
            setDeleteId(null)
        }
    }

    return (
        <div>
            <div className="page-header d-flex justify-content-between align-items-center">
                <div>
                    <h1>
                        <i className="bi bi-grid-3x3 me-2 text-primary"></i>
                        Shelves
                    </h1>
                    <p className="text-muted mb-0">Manage shelves within cupboards</p>
                </div>
                <Link href="/shelves/new" className="btn btn-primary">
                    <i className="bi bi-plus-circle me-2"></i>
                    Add Shelf
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
                                    placeholder="Search shelves..."
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
                                    <th>Cupboard</th>
                                    <th>Shelf Number</th>
                                    <th>Capacity</th>
                                    <th>Description</th>
                                    <th className="text-end">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredShelves.length === 0 ? (
                                    <tr>
                                        <td colSpan={6} className="text-center text-muted py-4">
                                            No shelves found
                                        </td>
                                    </tr>
                                ) : (
                                    filteredShelves.map((shelf) => (
                                        <tr key={shelf.shelf_id}>
                                            <td>{shelf.shelf_id}</td>
                                            <td className="fw-semibold">{shelf.cupboards.cupboard_name || 'Unnamed Cupboard'}</td>
                                            <td>{shelf.shelf_number ?? '-'}</td>
                                            <td>{shelf.capacity ?? '-'}</td>
                                            <td className="text-truncate" style={{ maxWidth: '200px' }}>
                                                {shelf.description || '-'}
                                            </td>
                                            <td className="text-end">
                                                <Link
                                                    href={`/shelves/${shelf.shelf_id}/edit`}
                                                    className="btn btn-sm btn-outline-primary me-2"
                                                >
                                                    <i className="bi bi-pencil"></i>
                                                </Link>
                                                <button
                                                    className="btn btn-sm btn-outline-danger"
                                                    onClick={() => confirmDelete(shelf.shelf_id)}
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
                title="Delete Shelf"
                message="Are you sure you want to delete this shelf?"
                onClose={() => setShowDeleteModal(false)}
                onConfirm={handleDelete}
            />
        </div>
    )
}

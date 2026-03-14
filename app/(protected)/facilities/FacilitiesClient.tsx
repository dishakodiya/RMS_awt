
'use client'

import { useState } from 'react'
import Link from 'next/link'
import { deleteFacility } from './actions'

import DeleteConfirmationModal from '@/components/DeleteConfirmationModal'

type Facility = {
    facility_id: number
    facility_name: string
    details: string | null
    resources: {
        resource_name: string
    }
}

export default function FacilitiesClient({ facilities }: { facilities: Facility[] }) {
    const [search, setSearch] = useState('')
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [deleteId, setDeleteId] = useState<number | null>(null)

    const filteredFacilities = facilities.filter(f =>
        f.facility_name.toLowerCase().includes(search.toLowerCase()) ||
        f.resources.resource_name.toLowerCase().includes(search.toLowerCase())
    )

    const confirmDelete = (id: number) => {
        setDeleteId(id)
        setShowDeleteModal(true)
    }

    const handleDelete = async () => {
        if (deleteId) {
            await deleteFacility(deleteId)
            setShowDeleteModal(false)
            setDeleteId(null)
        }
    }

    return (
        <div>
            <div className="page-header d-flex justify-content-between align-items-center">
                <div>
                    <h1>
                        <i className="bi bi-tools me-2 text-primary"></i>
                        Facilities
                    </h1>
                    <p className="text-muted mb-0">Manage facilities</p>
                </div>
                <Link href="/facilities/new" className="btn btn-primary">
                    <i className="bi bi-plus-circle me-2"></i>
                    Add Facility
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
                                    placeholder="Search facilities..."
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
                                    <th>Location</th>
                                    <th>Details</th>
                                    <th className="text-end">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredFacilities.length === 0 ? (
                                    <tr>
                                        <td colSpan={5} className="text-center text-muted py-4">
                                            No facilities found
                                        </td>
                                    </tr>
                                ) : (
                                    filteredFacilities.map((facility) => (
                                        <tr key={facility.facility_id}>
                                            <td>{facility.facility_id}</td>
                                            <td className="fw-semibold">{facility.facility_name}</td>
                                            <td>{facility.resources.resource_name}</td>
                                            <td className="text-truncate" style={{ maxWidth: '200px' }}>
                                                {facility.details || '-'}
                                            </td>
                                            <td className="text-end">
                                                <Link
                                                    href={`/facilities/${facility.facility_id}/edit`}
                                                    className="btn btn-sm btn-outline-primary me-2"
                                                >
                                                    <i className="bi bi-pencil"></i>
                                                </Link>
                                                <button
                                                    className="btn btn-sm btn-outline-danger"
                                                    onClick={() => confirmDelete(facility.facility_id)}
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
                title="Delete Facility"
                message="Are you sure you want to delete this facility?"
                onClose={() => setShowDeleteModal(false)}
                onConfirm={handleDelete}
            />
        </div>
    )
}

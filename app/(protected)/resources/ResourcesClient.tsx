
'use client'
import { useState } from 'react'
import Link from 'next/link'
import { deleteResource } from './actions'

import DeleteConfirmationModal from '@/components/DeleteConfirmationModal'

type Resource = {
    resource_id: number
    resource_name: string
    floor_number: number | null
    description: string | null
    resource_types: {
        type_name: string
    }
    buildings: {
        building_name: string
        building_number: string | null
    }
}

export default function ResourcesClient({ resources }: { resources: Resource[] }) {
    const [search, setSearch] = useState('')
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [deleteId, setDeleteId] = useState<number | null>(null)

    const filteredResources = resources.filter(r =>
        r.resource_name.toLowerCase().includes(search.toLowerCase()) ||
        r.resource_types.type_name.toLowerCase().includes(search.toLowerCase()) ||
        r.buildings.building_name.toLowerCase().includes(search.toLowerCase())
    )

    const confirmDelete = (id: number) => {
        setDeleteId(id)
        setShowDeleteModal(true)
    }

    const handleDelete = async () => {
        if (deleteId) {
            await deleteResource(deleteId)
            setShowDeleteModal(false)
            setDeleteId(null)
        }
    }

    return (
        <div>
            <div className="page-header d-flex justify-content-between align-items-center">
                <div>
                    <h1>
                        <i className="bi bi-box-seam me-2 text-primary"></i>
                        Resources
                    </h1>
                    <p className="text-muted mb-0">Manage all system resources</p>
                </div>
                <Link href="/resources/new" className="btn btn-primary">
                    <i className="bi bi-plus-circle me-2"></i>
                    Add Resource
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
                                    placeholder="Search resources..."
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
                                    <th>Name</th>
                                    <th>Type</th>
                                    <th>Building</th>
                                    <th>Floor</th>
                                    <th>Description</th>
                                    <th className="text-end">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredResources.length === 0 ? (
                                    <tr>
                                        <td colSpan={6} className="text-center text-muted py-4">
                                            No resources found
                                        </td>
                                    </tr>
                                ) : (
                                    filteredResources.map((resource) => (
                                        <tr key={resource.resource_id}>
                                            <td className="fw-semibold">{resource.resource_name}</td>
                                            <td>
                                                <span className="badge bg-light text-dark border">
                                                    {resource.resource_types.type_name}
                                                </span>
                                            </td>
                                            <td>
                                                {resource.buildings.building_name}
                                                {resource.buildings.building_number &&
                                                    <small className="text-muted ms-1">({resource.buildings.building_number})</small>
                                                }
                                            </td>
                                            <td>{resource.floor_number ?? '-'}</td>
                                            <td className="text-truncate" style={{ maxWidth: '200px' }}>
                                                {resource.description || '-'}
                                            </td>
                                            <td className="text-end">
                                                <Link
                                                    href={`/resources/${resource.resource_id}/edit`}
                                                    className="btn btn-sm btn-outline-primary me-2"
                                                >
                                                    <i className="bi bi-pencil"></i>
                                                </Link>
                                                <button
                                                    className="btn btn-sm btn-outline-danger"
                                                    onClick={() => confirmDelete(resource.resource_id)}
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
                    title="Delete Resource Type"
                    message="Are you sure you want to delete this resource type?"
                    onClose={() => setShowDeleteModal(false)}
                    onConfirm={handleDelete}
        />
        </div>
    )
}

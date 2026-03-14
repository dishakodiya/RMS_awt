'use client'

import { useState } from 'react'
import Link from 'next/link'
import { deleteMaintenance } from './actions'

import DeleteConfirmationModal from '@/components/DeleteConfirmationModal'

type MaintenanceItem = {
    maintenance_id: number
    maintenance_type: string | null
    scheduled_date: string | null
    status: string | null
    notes: string | null
    resources: {
        resource_name: string
    }
    users: {
        name: string
    }
}

export default function MaintenanceClient({ maintenance }: { maintenance: MaintenanceItem[] }) {
    const [search, setSearch] = useState('')
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [deleteId, setDeleteId] = useState<number | null>(null)

    const filteredMaintenance = maintenance.filter(m =>
        (m.maintenance_type && m.maintenance_type.toLowerCase().includes(search.toLowerCase())) ||
        m.resources.resource_name.toLowerCase().includes(search.toLowerCase()) ||
        m.users.name.toLowerCase().includes(search.toLowerCase()) ||
        (m.status && m.status.toLowerCase().includes(search.toLowerCase()))
    )

    const confirmDelete = (id: number) => {
        setDeleteId(id)
        setShowDeleteModal(true)
    }

    const handleDelete = async () => {
        if (deleteId) {
            await deleteMaintenance(deleteId)
            setShowDeleteModal(false)
            setDeleteId(null)
        }
    }

    return (
        <div>
            <div className="page-header d-flex justify-content-between align-items-center">
                <div>
                    <h1>
                        <i className="bi bi-wrench me-2 text-primary"></i>
                        Maintenance
                    </h1>
                    <p className="text-muted mb-0">Track resource maintenance</p>
                </div>
                <Link href="/maintenance/new" className="btn btn-primary">
                    <i className="bi bi-plus-circle me-2"></i>
                    Schedule Maintenance
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
                                    placeholder="Search maintenance..."
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
                                    <th>Resource</th>
                                    <th>Type</th>
                                    <th>Reported By</th>
                                    <th>Scheduled Date</th>
                                    <th>Status</th>
                                    <th className="text-end">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredMaintenance.length === 0 ? (
                                    <tr>
                                        <td colSpan={7} className="text-center text-muted py-4">
                                            No maintenance records found
                                        </td>
                                    </tr>
                                ) : (
                                    filteredMaintenance.map((item) => (
                                        <tr key={item.maintenance_id}>
                                            <td>{item.maintenance_id}</td>
                                            <td className="fw-semibold">{item.resources.resource_name}</td>
                                            <td>{item.maintenance_type || '-'}</td>
                                            <td>{item.users.name}</td>
                                            <td>
                                                {item.scheduled_date
                                                    ? new Date(item.scheduled_date).toLocaleDateString()
                                                    : '-'}
                                            </td>
                                            <td>
                                                <span className={`badge ${item.status === 'Completed' ? 'bg-success' :
                                                    item.status === 'In Progress' ? 'bg-primary' :
                                                        'bg-warning'
                                                    }`}>
                                                    {item.status || 'Pending'}
                                                </span>
                                            </td>
                                            <td className="text-end">
                                                <Link
                                                    href={`/maintenance/${item.maintenance_id}/edit`}
                                                    className="btn btn-sm btn-outline-primary me-2"
                                                >
                                                    <i className="bi bi-pencil"></i>
                                                </Link>
                                                <button
                                                    className="btn btn-sm btn-outline-danger"
                                                    onClick={() => confirmDelete(item.maintenance_id)}
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
                title="Delete Maintenance Record"
                message="Are you sure you want to delete this maintenance record?"
                onClose={() => setShowDeleteModal(false)}
                onConfirm={handleDelete}
            />
        </div>
    )
}

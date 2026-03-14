
'use client'

import { useState } from 'react'
import Link from 'next/link'
import { deleteBuilding } from './actions'

import DeleteConfirmationModal from '@/components/DeleteConfirmationModal'

type Building = {
    building_id: number
    building_name: string
    building_number: string | null
    total_floors: number | null
}

export default function BuildingsClient({ buildings }: { buildings: Building[] }) {
    const [search, setSearch] = useState('')
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [deleteId, setDeleteId] = useState<number | null>(null)

    const filteredBuildings = buildings.filter(b =>
        b.building_name.toLowerCase().includes(search.toLowerCase()) ||
        (b.building_number && b.building_number.toLowerCase().includes(search.toLowerCase()))
    )

    const confirmDelete = (id: number) => {
        setDeleteId(id)
        setShowDeleteModal(true)
    }

    const handleDelete = async () => {
        if (deleteId) {
            await deleteBuilding(deleteId)
            setShowDeleteModal(false)
            setDeleteId(null)
        }
    }

    return (
        <div>
            <div className="page-header d-flex justify-content-between align-items-center">
                <div>
                    <h1>
                        <i className="bi bi-building me-2 text-primary"></i>
                        Buildings
                    </h1>
                    <p className="text-muted mb-0">Manage campus buildings</p>
                </div>
                <Link href="/buildings/new" className="btn btn-primary">
                    <i className="bi bi-plus-circle me-2"></i>
                    Add Building
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
                                    placeholder="Search buildings..."
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
                                    <th>Number</th>
                                    <th>Floors</th>
                                    <th className="text-end">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredBuildings.length === 0 ? (
                                    <tr>
                                        <td colSpan={5} className="text-center text-muted py-4">
                                            No buildings found
                                        </td>
                                    </tr>
                                ) : (
                                    filteredBuildings.map((building) => (
                                        <tr key={building.building_id}>
                                            <td>{building.building_id}</td>
                                            <td className="fw-semibold">{building.building_name}</td>
                                            <td>{building.building_number || '-'}</td>
                                            <td>{building.total_floors || '-'}</td>
                                            <td className="text-end">
                                                <Link
                                                    href={`/buildings/${building.building_id}/edit`}
                                                    className="btn btn-sm btn-outline-primary me-2"
                                                >
                                                    <i className="bi bi-pencil"></i>
                                                </Link>
                                                <button
                                                    className="btn btn-sm btn-outline-danger"
                                                    onClick={() => confirmDelete(building.building_id)}
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
        </div>
    )
}

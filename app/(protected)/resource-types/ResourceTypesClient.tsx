
'use client'

import { useState } from 'react'
import Link from 'next/link'
import { deleteResourceType } from './actions'

import DeleteConfirmationModal from '@/components/DeleteConfirmationModal'

type ResourceType = {
  resource_type_id: number
  type_name: string
}

export default function ResourceTypesClient({ resourceTypes }: { resourceTypes: ResourceType[] }) {
  const [search, setSearch] = useState('')
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [deleteId, setDeleteId] = useState<number | null>(null)

  const filteredTypes = resourceTypes.filter(type =>
    type.type_name.toLowerCase().includes(search.toLowerCase())
  )

  const confirmDelete = (id: number) => {
    setDeleteId(id)
    setShowDeleteModal(true)
  }

  const handleDelete = async () => {
    if (deleteId) {
      await deleteResourceType(deleteId)
      setShowDeleteModal(false)
      setDeleteId(null)
    }
  }

  return (
    <div>
      <div className="page-header d-flex justify-content-between align-items-center">
        <div>
          <h1>
            <i className="bi bi-tags me-2 text-primary"></i>
            Resource Types
          </h1>
          <p className="text-muted mb-0">Manage types of resources available</p>
        </div>
        <Link href="/resource-types/new" className="btn btn-primary">
          <i className="bi bi-plus-circle me-2"></i>
          Add Type
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
                  placeholder="Search types..."
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
                  <th>Type Name</th>
                  <th className="text-end">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredTypes.length === 0 ? (
                  <tr>
                    <td colSpan={3} className="text-center text-muted py-4">
                      No resource types found
                    </td>
                  </tr>
                ) : (
                  filteredTypes.map((type) => (
                    <tr key={type.resource_type_id}>
                      <td>{type.resource_type_id}</td>
                      <td className="fw-semibold">{type.type_name}</td>
                      <td className="text-end">
                        <Link
                          href={`/resource-types/${type.resource_type_id}/edit`}
                          className="btn btn-sm btn-outline-primary me-2"
                        >
                          <i className="bi bi-pencil"></i>
                        </Link>
                        <button
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => confirmDelete(type.resource_type_id)}
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

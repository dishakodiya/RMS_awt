'use client'
import SearchFilter from '@/components/SearchFilter'
import type { User } from '@/lib/data'
import { deleteUser } from './actions'
import Link from 'next/link'
import { useState } from 'react'

import DeleteConfirmationModal from '@/components/DeleteConfirmationModal'


export default function UsersClient({ users: u }: { users: User[] }) {
  const [search, setSearch] = useState('')
  const [role, setRole] = useState('All')
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [userToDelete, setUserToDelete] = useState<string | null>(null)

  const filteredUsers = u.filter(user => {
    const matchSearch =
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase())

    const matchRole =
      role === 'All' || user.role === role

    return matchSearch && matchRole
  })

  const confirmDelete = (id: string) => {
    setUserToDelete(id)
    setShowDeleteModal(true)
  }

  const handleDelete = async () => {
    if (userToDelete) {
      try {
        await deleteUser(userToDelete)
        setShowDeleteModal(false)
        setUserToDelete(null)
      } catch (error) {
        alert('Failed to delete user')
      }
    }
  }

  return (
    <div>
      <div className="page-header d-flex justify-content-between align-items-center">
        <div>
          <h1>
            <i className="bi bi-people me-2 text-primary"></i>
            Users Management
          </h1>
          <p className="text-muted mb-0">Manage system users and their roles</p>
        </div>
        <Link href="/users/new" className="btn btn-primary">
          <i className="bi bi-plus-circle me-2"></i>
          Add User
        </Link>
      </div>

      <SearchFilter
        onSearch={setSearch}
        onRole={setRole}
      />
      <div className="card">
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover mb-0">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Created At</th>
                  <th className="text-end">Actions</th>
                </tr>
              </thead>
              <tbody>
                {u.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="text-center text-muted py-4">
                      <i className="bi bi-inbox me-2"></i>
                      No users found
                    </td>
                  </tr>
                ) : (
                  filteredUsers.map((user) => (
                    <tr key={user.id}>
                      <td className="fw-semibold">{user.name}</td>
                      <td>{user.email}</td>
                      <td>
                        <span className={`badge ${user.role === 'Admin'
                          ? 'bg-danger'
                          : user.role === 'Approver'
                            ? 'bg-warning'
                            : 'bg-info'
                          }`}>
                          {user.role}
                        </span>
                      </td>
                      <td>
                        {user.createdAt
                          ? new Date(user.createdAt).toLocaleDateString()
                          : '-'}
                      </td>
                      <td className="text-end">
                        <Link
                          href={`/users/${user.id}/edit`}
                          className="btn btn-sm btn-outline-primary me-2"
                        >
                          <i className="bi bi-pencil"></i>
                        </Link>


                        <button
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => confirmDelete(user.id)}
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
        title="Delete User"
        message="Are you sure you want to delete this user? This action cannot be undone."
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDelete}
      />
    </div>

  )
}



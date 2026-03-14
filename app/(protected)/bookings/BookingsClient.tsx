
'use client'

import { useState, useTransition } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { deleteBooking, approveBooking, rejectBooking } from './actions'

import DeleteConfirmationModal from '@/components/DeleteConfirmationModal'

type Booking = {
    booking_id: number
    start_datetime: string
    end_datetime: string
    status: string | null
    resources: {
        resource_name: string
    }
    users_bookings_user_idTousers: {
        name: string
        email: string
    }
    users_bookings_approver_idTousers: {
        name: string
    } | null
}

export default function BookingsClient({ bookings }: { bookings: Booking[] }) {
    const [search, setSearch] = useState('')
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [deleteId, setDeleteId] = useState<number | null>(null)
    const [pendingId, setPendingId] = useState<number | null>(null)
    const [isPending, startTransition] = useTransition()
    const router = useRouter()

    const filteredBookings = bookings.filter(b =>
        b.resources.resource_name.toLowerCase().includes(search.toLowerCase()) ||
        b.users_bookings_user_idTousers.name.toLowerCase().includes(search.toLowerCase()) ||
        b.users_bookings_user_idTousers.email.toLowerCase().includes(search.toLowerCase()) ||
        (b.status && b.status.toLowerCase().includes(search.toLowerCase()))
    )

    const confirmDelete = (id: number) => {
        setDeleteId(id)
        setShowDeleteModal(true)
    }

    const handleDelete = async () => {
        if (deleteId) {
            await deleteBooking(deleteId)
            setShowDeleteModal(false)
            setDeleteId(null)
            router.refresh()
        }
    }

    const handleApprove = (id: number) => {
        setPendingId(id)
        startTransition(async () => {
            try {
                await approveBooking(id)
                router.refresh()
            } finally {
                setPendingId(null)
            }
        })
    }

    const handleReject = (id: number) => {
        setPendingId(id)
        startTransition(async () => {
            try {
                await rejectBooking(id)
                router.refresh()
            } finally {
                setPendingId(null)
            }
        })
    }

    return (
        <div>
            <div className="page-header d-flex justify-content-between align-items-center">
                <div>
                    <h1 className="mb-1">
                        <i className="bi bi-calendar-check me-2 text-primary"></i>
                        Bookings
                    </h1>
                    <p className="text-muted mb-0">Review and approve user bookings</p>
                </div>
                <div className="d-flex flex-column align-items-end gap-2">
                    <div className="d-flex align-items-center gap-2 small text-muted">
                        <span className="badge bg-warning text-dark rounded-pill px-2">
                            <i className="bi bi-clock-history me-1"></i> Pending
                        </span>
                        <span className="badge bg-success rounded-pill px-2">
                            <i className="bi bi-check2-circle me-1"></i> Approved
                        </span>
                        <span className="badge bg-danger rounded-pill px-2">
                            <i className="bi bi-x-circle me-1"></i> Rejected
                        </span>
                    </div>
                    <Link href="/bookings/new" className="btn btn-primary btn-sm">
                        <i className="bi bi-plus-circle me-2"></i>
                        New Booking
                    </Link>
                </div>
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
                                    placeholder="Search bookings..."
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
                                    <th>User</th>
                                    <th>Start Time</th>
                                    <th>End Time</th>
                                    <th>Status</th>
                                    <th>Approver</th>
                                    <th className="text-end">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredBookings.length === 0 ? (
                                    <tr>
                                        <td colSpan={8} className="text-center text-muted py-4">
                                            No bookings found
                                        </td>
                                    </tr>
                                ) : (
                                    filteredBookings.map((booking) => {
                                        const isRowPending = booking.status === 'Pending' || !booking.status
                                        const isRowBusy = pendingId === booking.booking_id && isPending

                                        return (
                                            <tr
                                                key={booking.booking_id}
                                                className={isRowPending ? 'table-warning-subtle' : ''}
                                            >
                                                <td>{booking.booking_id}</td>
                                                <td className="fw-semibold">{booking.resources.resource_name}</td>
                                                <td>
                                                    {booking.users_bookings_user_idTousers.name}
                                                    <div className="text-muted small">{booking.users_bookings_user_idTousers.email}</div>
                                                </td>
                                                <td>{new Date(booking.start_datetime).toLocaleString()}</td>
                                                <td>{new Date(booking.end_datetime).toLocaleString()}</td>
                                                <td>
                                                    <span className={`badge ${booking.status === 'Approved' ? 'bg-success' :
                                                        booking.status === 'Rejected' ? 'bg-danger' :
                                                            'bg-warning text-dark'
                                                        }`}>
                                                        {booking.status || 'Pending'}
                                                    </span>
                                                </td>
                                                <td>{booking.users_bookings_approver_idTousers?.name || '-'}</td>
                                                <td className="text-end">
                                                    {/* {isRowPending && (
                                                        <div className="btn-group me-2">
                                                            <button
                                                                type="button"
                                                                className="btn btn-sm btn-success"
                                                                disabled={isRowBusy}
                                                                onClick={() => handleApprove(booking.booking_id)}
                                                            >
                                                                {isRowBusy && pendingId === booking.booking_id
                                                                    ? <span className="spinner-border spinner-border-sm" />
                                                                    : <i className="bi bi-check2" />}
                                                            </button>
                                                            <button
                                                                type="button"
                                                                className="btn btn-sm btn-danger"
                                                                disabled={isRowBusy}
                                                                onClick={() => handleReject(booking.booking_id)}
                                                            >
                                                                {isRowBusy && pendingId === booking.booking_id
                                                                    ? <span className="spinner-border spinner-border-sm" />
                                                                    : <i className="bi bi-x" />}
                                                            </button>
                                                        </div>
                                                    )} */}
                                                    {isRowPending && (
                                                        <div className="btn-group me-2">
                                                            <button
                                                                type="button"
                                                                className="btn btn-sm btn-outline-success border border-success"
                                                                disabled={isRowBusy}
                                                                onClick={() => handleApprove(booking.booking_id)}
                                                            >
                                                                {isRowBusy && pendingId === booking.booking_id
                                                                    ? <span className="spinner-border spinner-border-sm" />
                                                                    : <i className="bi bi-check2" />}
                                                            </button>

                                                            <button
                                                                type="button"
                                                                className="btn btn-sm btn-outline-danger border border-danger"
                                                                disabled={isRowBusy}
                                                                onClick={() => handleReject(booking.booking_id)}
                                                            >
                                                                {isRowBusy && pendingId === booking.booking_id
                                                                    ? <span className="spinner-border spinner-border-sm" />
                                                                    : <i className="bi bi-x" />}
                                                            </button>
                                                        </div>
                                                    )}
                                                    <Link
                                                        href={`/bookings/${booking.booking_id}/edit`}
                                                        className="btn btn-sm btn-outline-primary me-2"
                                                    >
                                                        <i className="bi bi-pencil"></i>
                                                    </Link>
                                                    <button
                                                        className="btn btn-sm btn-outline-danger"
                                                        onClick={() => confirmDelete(booking.booking_id)}
                                                    >
                                                        <i className="bi bi-trash"></i>
                                                    </button>
                                                </td>
                                            </tr>
                                        )
                                    })
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <DeleteConfirmationModal
                show={showDeleteModal}
                title="Delete Booking"
                message="Are you sure you want to delete this booking?"
                onClose={() => setShowDeleteModal(false)}
                onConfirm={handleDelete}
            />
        </div>
    )
}

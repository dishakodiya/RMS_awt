
// 'use client'

// import { useState } from 'react'
// import Link from 'next/link'
// import { deleteBooking } from './actions'

// import DeleteConfirmationModal from '@/components/DeleteConfirmationModal'

// type Booking = {
//     booking_id: number
//     start_datetime: string
//     end_datetime: string
//     status: string | null
//     resources: {
//         resource_name: string
//     }
//     users_bookings_user_idTousers: {
//         name: string
//         email: string
//     }
//     users_bookings_approver_idTousers: {
//         name: string
//     } | null
// }

// export default function BookingsClient({ bookings }: { bookings: Booking[] }) {
//     const [search, setSearch] = useState('')
//     const [showDeleteModal, setShowDeleteModal] = useState(false)
//     const [deleteId, setDeleteId] = useState<number | null>(null)

//     const filteredBookings = bookings.filter(b =>
//         b.resources.resource_name.toLowerCase().includes(search.toLowerCase()) ||
//         b.users_bookings_user_idTousers.name.toLowerCase().includes(search.toLowerCase()) ||
//         b.users_bookings_user_idTousers.email.toLowerCase().includes(search.toLowerCase()) ||
//         (b.status && b.status.toLowerCase().includes(search.toLowerCase()))
//     )

//     const confirmDelete = (id: number) => {
//         setDeleteId(id)
//         setShowDeleteModal(true)
//     }

//     const handleDelete = async () => {
//         if (deleteId) {
//             await deleteBooking(deleteId)
//             setShowDeleteModal(false)
//             setDeleteId(null)
//         }
//     }

//     return (
//         <div>
//             <div className="page-header d-flex justify-content-between align-items-center">
//                 <div>
//                     <h1>
//                         <i className="bi bi-calendar-check me-2 text-primary"></i>
//                         Bookings
//                     </h1>
//                     <p className="text-muted mb-0">Manage resource bookings</p>
//                 </div>
//                 <Link href="/bookings/new" className="btn btn-primary">
//                     <i className="bi bi-plus-circle me-2"></i>
//                     New Booking
//                 </Link>
//             </div>

//             <div className="card mb-4">
//                 <div className="card-body">
//                     <div className="row">
//                         <div className="col-md-4">
//                             <div className="search-input-wrapper">
//                                 <i className="bi bi-search"></i>
//                                 <input
//                                     type="text"
//                                     className="form-control"
//                                     placeholder="Search bookings..."
//                                     value={search}
//                                     onChange={(e) => setSearch(e.target.value)}
//                                 />
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             <div className="card">
//                 <div className="card-body p-0">
//                     <div className="table-responsive">
//                         <table className="table table-hover mb-0">
//                             <thead>
//                                 <tr>
//                                     <th>ID</th>
//                                     <th>Resource</th>
//                                     <th>User</th>
//                                     <th>Start Time</th>
//                                     <th>End Time</th>
//                                     <th>Status</th>
//                                     <th>Approver</th>
                                    
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {filteredBookings.length === 0 ? (
//                                     <tr>
//                                         <td colSpan={8} className="text-center text-muted py-4">
//                                             No bookings found
//                                         </td>
//                                     </tr>
//                                 ) : (
//                                     filteredBookings.map((booking) => (
//                                         <tr key={booking.booking_id}>
//                                             <td>{booking.booking_id}</td>
//                                             <td className="fw-semibold">{booking.resources.resource_name}</td>
//                                             <td>
//                                                 {booking.users_bookings_user_idTousers.name}
//                                                 <div className="text-muted small">{booking.users_bookings_user_idTousers.email}</div>
//                                             </td>
//                                             <td>{new Date(booking.start_datetime).toLocaleString()}</td>
//                                             <td>{new Date(booking.end_datetime).toLocaleString()}</td>
//                                             <td>
//                                                 <span className={`badge ${booking.status === 'Approved' ? 'bg-success' :
//                                                     booking.status === 'Rejected' ? 'bg-danger' :
//                                                         'bg-warning'
//                                                     }`}>
//                                                     {booking.status || 'Pending'}
//                                                 </span>
//                                             </td>
//                                             <td>{booking.users_bookings_approver_idTousers?.name || '-'}</td>
//                                         </tr>
//                                     ))
//                                 )}
//                             </tbody>
//                         </table>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }



// 'use client'

// import { useState } from 'react'
// import Link from 'next/link'
// import { deleteBooking } from './actions'
// import DeleteConfirmationModal from '@/components/DeleteConfirmationModal'

// const tableStyles = `
//   @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@300;400;500&display=swap');

//   .bc-root { font-family: 'DM Sans', sans-serif; color: #fff; }

//   .bc-header {
//     display: flex;
//     align-items: flex-start;
//     justify-content: space-between;
//     gap: 1rem;
//     flex-wrap: wrap;
//     margin-bottom: 1.75rem;
//   }

//   .bc-page-title {
//     font-family: 'Syne', sans-serif;
//     font-size: 1.8rem;
//     font-weight: 800;
//     color: #fff;
//     letter-spacing: -0.04em;
//     margin: 0 0 0.2rem;
//     display: flex;
//     align-items: center;
//     gap: 10px;
//   }

//   .bc-page-title-icon {
//     width: 40px;
//     height: 40px;
//     background: linear-gradient(135deg, #ffb93c, #ff7b00);
//     border-radius: 10px;
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     font-size: 1rem;
//     color: #000;
//     box-shadow: 0 4px 14px rgba(255,185,60,0.3);
//     flex-shrink: 0;
//   }

//   .bc-page-sub {
//     font-size: 0.85rem;
//     color: rgba(255,255,255,0.35);
//     margin: 0;
//   }

//   .bc-new-btn {
//     display: inline-flex;
//     align-items: center;
//     gap: 7px;
//     background: linear-gradient(135deg, #ffb93c, #ff7b00);
//     color: #000;
//     font-weight: 700;
//     font-size: 0.875rem;
//     font-family: 'DM Sans', sans-serif;
//     padding: 0.6rem 1.25rem;
//     border-radius: 10px;
//     text-decoration: none;
//     transition: all 0.2s;
//     box-shadow: 0 4px 16px rgba(255,185,60,0.25);
//     white-space: nowrap;
//   }

//   .bc-new-btn:hover {
//     transform: translateY(-2px);
//     box-shadow: 0 8px 24px rgba(255,185,60,0.35);
//     color: #000;
//   }

//   .bc-search-wrap {
//     background: rgba(255,255,255,0.02);
//     border: 1px solid rgba(255,255,255,0.07);
//     border-radius: 14px;
//     padding: 1rem 1.25rem;
//     margin-bottom: 1.25rem;
//   }

//   .bc-search-inner {
//     position: relative;
//     max-width: 360px;
//   }

//   .bc-search-inner i {
//     position: absolute;
//     left: 0.85rem;
//     top: 50%;
//     transform: translateY(-50%);
//     color: rgba(255,255,255,0.25);
//     font-size: 0.85rem;
//     pointer-events: none;
//   }

//   .bc-search-input {
//     width: 100%;
//     background: rgba(255,255,255,0.04);
//     border: 1px solid rgba(255,255,255,0.08);
//     border-radius: 10px;
//     color: #fff;
//     padding: 0.6rem 0.9rem 0.6rem 2.4rem;
//     font-size: 0.875rem;
//     font-family: 'DM Sans', sans-serif;
//     outline: none;
//     transition: all 0.2s;
//   }

//   .bc-search-input::placeholder { color: rgba(255,255,255,0.22); }

//   .bc-search-input:focus {
//     border-color: rgba(255,185,60,0.35);
//     background: rgba(255,185,60,0.04);
//     box-shadow: 0 0 0 3px rgba(255,185,60,0.07);
//   }

//   .bc-table-wrap {
//     background: rgba(255,255,255,0.02);
//     border: 1px solid rgba(255,255,255,0.07);
//     border-radius: 14px;
//     overflow: hidden;
//   }

//   .bc-table {
//     width: 100%;
//     border-collapse: collapse;
//     font-size: 0.865rem;
//   }

//   .bc-table thead tr {
//     background: rgba(255,255,255,0.03);
//     border-bottom: 1px solid rgba(255,255,255,0.07);
//   }

//   .bc-table thead th {
//     padding: 0.8rem 1rem;
//     font-size: 0.7rem;
//     font-weight: 600;
//     text-transform: uppercase;
//     letter-spacing: 0.07em;
//     color: rgba(255,255,255,0.28);
//     white-space: nowrap;
//     text-align: left;
//   }

//   .bc-table tbody tr {
//     border-bottom: 1px solid rgba(255,255,255,0.04);
//     transition: background 0.15s;
//   }

//   .bc-table tbody tr:last-child { border-bottom: none; }

//   .bc-table tbody tr:hover { background: rgba(255,255,255,0.025); }

//   .bc-table td {
//     padding: 0.9rem 1rem;
//     color: rgba(255,255,255,0.75);
//     vertical-align: middle;
//   }

//   .bc-table td.id-cell {
//     font-size: 0.75rem;
//     color: rgba(255,255,255,0.25);
//     font-family: monospace;
//   }

//   .bc-table td.name-cell {
//     font-weight: 600;
//     color: #fff;
//   }

//   .bc-table td .sub-text {
//     font-size: 0.75rem;
//     color: rgba(255,255,255,0.3);
//     margin-top: 1px;
//   }

//   .bc-table td .time-text {
//     font-size: 0.8rem;
//     color: rgba(255,255,255,0.55);
//     white-space: nowrap;
//   }

//   .bc-badge {
//     display: inline-flex;
//     align-items: center;
//     gap: 4px;
//     font-size: 0.68rem;
//     font-weight: 600;
//     text-transform: uppercase;
//     letter-spacing: 0.05em;
//     padding: 0.25rem 0.65rem;
//     border-radius: 5px;
//     border: 1px solid;
//   }

//   .bc-badge.approved { background: rgba(34,197,94,0.1); border-color: rgba(34,197,94,0.2); color: #4ade80; }
//   .bc-badge.pending  { background: rgba(255,185,60,0.1); border-color: rgba(255,185,60,0.2); color: #ffb93c; }
//   .bc-badge.rejected { background: rgba(239,68,68,0.1); border-color: rgba(239,68,68,0.2); color: #f87171; }

//   .bc-empty {
//     text-align: center;
//     padding: 4rem;
//     color: rgba(255,255,255,0.28);
//     font-size: 0.9rem;
//   }

//   .bc-empty i { font-size: 2rem; display: block; margin-bottom: 0.75rem; opacity: 0.4; }
// `

// type Booking = {
//   booking_id: number
//   start_datetime: string
//   end_datetime: string
//   status: string | null
//   resources: { resource_name: string }
//   users_bookings_user_idTousers: { name: string; email: string }
//   users_bookings_approver_idTousers: { name: string } | null
// }

// export default function BookingsClient({ bookings }: { bookings: Booking[] }) {
//   const [search, setSearch] = useState('')
//   const [showDeleteModal, setShowDeleteModal] = useState(false)
//   const [deleteId, setDeleteId] = useState<number | null>(null)

//   const filteredBookings = bookings.filter(b =>
//     b.resources.resource_name.toLowerCase().includes(search.toLowerCase()) ||
//     b.users_bookings_user_idTousers.name.toLowerCase().includes(search.toLowerCase()) ||
//     b.users_bookings_user_idTousers.email.toLowerCase().includes(search.toLowerCase()) ||
//     (b.status && b.status.toLowerCase().includes(search.toLowerCase()))
//   )

//   const confirmDelete = (id: number) => {
//     setDeleteId(id)
//     setShowDeleteModal(true)
//   }

//   const handleDelete = async () => {
//     if (deleteId) {
//       await deleteBooking(deleteId)
//       setShowDeleteModal(false)
//       setDeleteId(null)
//     }
//   }

//   const statusClass = (status: string | null) => {
//     if (status === 'Approved') return 'approved'
//     if (status === 'Rejected') return 'rejected'
//     return 'pending'
//   }

//   return (
//     <>
//       <style>{tableStyles}</style>
//       <div className="bc-root">

//         <div className="bc-header">
//           <div>
//             <div className="bc-page-title">
//               <div className="bc-page-title-icon">
//                 <i className="bi bi-calendar-check-fill"></i>
//               </div>
//               Bookings
//             </div>
//             <p className="bc-page-sub">Manage and review all resource bookings</p>
//           </div>
//           <Link href="/bookings/new" className="bc-new-btn">
//             <i className="bi bi-plus-lg"></i>
//             New Booking
//           </Link>
//         </div>

//         <div className="bc-search-wrap">
//           <div className="bc-search-inner">
//             <i className="bi bi-search"></i>
//             <input
//               type="text"
//               className="bc-search-input"
//               placeholder="Search bookings…"
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//             />
//           </div>
//         </div>

//         <div className="bc-table-wrap">
//           <div style={{ overflowX: 'auto' }}>
//             <table className="bc-table">
//               <thead>
//                 <tr>
//                   <th>ID</th>
//                   <th>Resource</th>
//                   <th>User</th>
//                   <th>Start</th>
//                   <th>End</th>
//                   <th>Status</th>
//                   <th>Approver</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {filteredBookings.length === 0 ? (
//                   <tr>
//                     <td colSpan={7}>
//                       <div className="bc-empty">
//                         <i className="bi bi-inbox"></i>
//                         No bookings found
//                       </div>
//                     </td>
//                   </tr>
//                 ) : (
//                   filteredBookings.map((booking) => (
//                     <tr key={booking.booking_id}>
//                       <td className="id-cell">#{booking.booking_id}</td>
//                       <td className="name-cell">{booking.resources.resource_name}</td>
//                       <td>
//                         {booking.users_bookings_user_idTousers.name}
//                         <div className="sub-text">{booking.users_bookings_user_idTousers.email}</div>
//                       </td>
//                       <td>
//                         <span className="time-text">{new Date(booking.start_datetime).toLocaleString()}</span>
//                       </td>
//                       <td>
//                         <span className="time-text">{new Date(booking.end_datetime).toLocaleString()}</span>
//                       </td>
//                       <td>
//                         <span className={`bc-badge ${statusClass(booking.status)}`}>
//                           {booking.status || 'Pending'}
//                         </span>
//                       </td>
//                       <td style={{ color: 'rgba(255,255,255,0.38)', fontSize: '0.82rem' }}>
//                         {booking.users_bookings_approver_idTousers?.name || '—'}
//                       </td>
//                     </tr>
//                   ))
//                 )}
//               </tbody>
//             </table>
//           </div>
//         </div>

//         <DeleteConfirmationModal
//           show={showDeleteModal}
//           title="Delete Booking"
//           message="Are you sure you want to delete this booking? This action cannot be undone."
//           onConfirm={handleDelete}
//           onClose={() => { setShowDeleteModal(false); setDeleteId(null) }}
//         />
//       </div>
//     </>
//   )
// }





'use client'

import { useState } from 'react'
import Link from 'next/link'
import { deleteBooking } from './actions'
import DeleteConfirmationModal from '@/components/DeleteConfirmationModal'

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

  .bc-root { font-family: 'Plus Jakarta Sans', sans-serif; color: #1a1d23; }

  .bc-header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 1rem;
    margin-bottom: 1.75rem;
  }

  .bc-page-title {
    font-size: 1.6rem;
    font-weight: 800;
    color: #111827;
    letter-spacing: -0.03em;
    margin: 0 0 0.2rem;
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .bc-title-icon {
    width: 38px; height: 38px;
    background: #eff4ff;
    border: 1px solid #bfdbfe;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.95rem;
    color: #2563eb;
    flex-shrink: 0;
  }

  .bc-page-sub { font-size: 0.85rem; color: #9ca3af; margin: 0; font-weight: 400; }

  .bc-new-btn {
    display: inline-flex;
    align-items: center;
    gap: 7px;
    background: #0d6efd;
    color: #fff;
    font-weight: 700;
    font-size: 0.855rem;
    font-family: 'Plus Jakarta Sans', sans-serif;
    padding: 0.58rem 1.15rem;
    border-radius: 9px;
    text-decoration: none;
    transition: all 0.18s;
    white-space: nowrap;
  }

  .bc-new-btn:hover {
    background: #0b5ed7;
    color: #fff;
    transform: translateY(-1px);
    box-shadow: 0 4px 14px rgba(13,110,253,0.28);
  }

  .bc-search-wrap {
    background: #fff;
    border: 1px solid #e8ecf0;
    border-radius: 12px;
    padding: 0.9rem 1.1rem;
    margin-bottom: 1.1rem;
    box-shadow: 0 1px 4px rgba(0,0,0,0.04);
  }

  .bc-search-inner { position: relative; max-width: 340px; }
  .bc-search-inner i {
    position: absolute;
    left: 0.82rem;
    top: 50%;
    transform: translateY(-50%);
    color: #9ca3af;
    font-size: 0.82rem;
    pointer-events: none;
  }

  .bc-search-input {
    width: 100%;
    background: #f9fafb;
    border: 1px solid #e5e7eb;
    border-radius: 9px;
    color: #111827;
    padding: 0.58rem 0.9rem 0.58rem 2.3rem;
    font-size: 0.875rem;
    font-family: 'Plus Jakarta Sans', sans-serif;
    outline: none;
    transition: all 0.18s;
  }

  .bc-search-input::placeholder { color: #9ca3af; }

  .bc-search-input:focus {
    border-color: #93c5fd;
    background: #fff;
    box-shadow: 0 0 0 3px rgba(59,130,246,0.1);
  }

  .bc-table-wrap {
    background: #fff;
    border: 1px solid #e8ecf0;
    border-radius: 14px;
    overflow: hidden;
    box-shadow: 0 1px 4px rgba(0,0,0,0.04);
  }

  .bc-table { width: 100%; border-collapse: collapse; font-size: 0.855rem; }

  .bc-table thead tr {
    background: #f9fafb;
    border-bottom: 1px solid #e8ecf0;
  }

  .bc-table thead th {
    padding: 0.75rem 1rem;
    font-size: 0.68rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: #9ca3af;
    text-align: left;
    white-space: nowrap;
  }

  .bc-table tbody tr { border-bottom: 1px solid #f3f4f6; transition: background 0.12s; }
  .bc-table tbody tr:last-child { border-bottom: none; }
  .bc-table tbody tr:hover { background: #f9fafb; }

  .bc-table td {
    padding: 0.85rem 1rem;
    color: #374151;
    vertical-align: middle;
  }

  .bc-table td.id-cell { font-size: 0.75rem; color: #9ca3af; font-family: monospace; }
  .bc-table td.name-cell { font-weight: 700; color: #111827; }
  .bc-table td .sub-text { font-size: 0.75rem; color: #9ca3af; margin-top: 1px; }
  .bc-table td .time-text { font-size: 0.79rem; color: #6b7280; white-space: nowrap; }

  .bc-badge {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    font-size: 0.67rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    padding: 0.24rem 0.6rem;
    border-radius: 5px;
    border: 1px solid;
  }

  .bc-badge.approved { background: #f0fdf4; border-color: #bbf7d0; color: #16a34a; }
  .bc-badge.pending  { background: #fffbeb; border-color: #fde68a; color: #d97706; }
  .bc-badge.rejected { background: #fef2f2; border-color: #fecaca; color: #dc2626; }

  .bc-empty { text-align: center; padding: 4rem; color: #9ca3af; font-size: 0.9rem; }
  .bc-empty i { font-size: 2rem; display: block; margin-bottom: 0.75rem; color: #d1d5db; }
`

type Booking = {
  booking_id: number
  start_datetime: string
  end_datetime: string
  status: string | null
  resources: { resource_name: string }
  users_bookings_user_idTousers: { name: string; email: string }
  users_bookings_approver_idTousers: { name: string } | null
}

export default function BookingsClient({ bookings }: { bookings: Booking[] }) {
  const [search, setSearch] = useState('')
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [deleteId, setDeleteId] = useState<number | null>(null)

  const filteredBookings = bookings.filter(b =>
    b.resources.resource_name.toLowerCase().includes(search.toLowerCase()) ||
    b.users_bookings_user_idTousers.name.toLowerCase().includes(search.toLowerCase()) ||
    b.users_bookings_user_idTousers.email.toLowerCase().includes(search.toLowerCase()) ||
    (b.status && b.status.toLowerCase().includes(search.toLowerCase()))
  )

  const confirmDelete = (id: number) => { setDeleteId(id); setShowDeleteModal(true) }

  const handleDelete = async () => {
    if (deleteId) {
      await deleteBooking(deleteId)
      setShowDeleteModal(false)
      setDeleteId(null)
    }
  }

  const statusClass = (status: string | null) => {
    if (status === 'Approved') return 'approved'
    if (status === 'Rejected') return 'rejected'
    return 'pending'
  }

  return (
    <>
      <style>{styles}</style>
      <div className="bc-root">
        <div className="bc-header">
          <div>
            <div className="bc-page-title">
              <div className="bc-title-icon"><i className="bi bi-calendar-check-fill"></i></div>
              Bookings
            </div>
            <p className="bc-page-sub">Manage and review all resource bookings</p>
          </div>
          <Link href="/bookings/new" className="bc-new-btn">
            <i className="bi bi-plus-lg"></i>
            New Booking
          </Link>
        </div>

        <div className="bc-search-wrap">
          <div className="bc-search-inner">
            <i className="bi bi-search"></i>
            <input
              type="text"
              className="bc-search-input"
              placeholder="Search bookings…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <div className="bc-table-wrap">
          <div style={{ overflowX: 'auto' }}>
            <table className="bc-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Resource</th>
                  <th>User</th>
                  <th>Start</th>
                  <th>End</th>
                  <th>Status</th>
                  <th>Approver</th>
                </tr>
              </thead>
              <tbody>
                {filteredBookings.length === 0 ? (
                  <tr>
                    <td colSpan={7}>
                      <div className="bc-empty">
                        <i className="bi bi-inbox"></i>
                        No bookings found
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredBookings.map((booking) => (
                    <tr key={booking.booking_id}>
                      <td className="id-cell">#{booking.booking_id}</td>
                      <td className="name-cell">{booking.resources.resource_name}</td>
                      <td>
                        {booking.users_bookings_user_idTousers.name}
                        <div className="sub-text">{booking.users_bookings_user_idTousers.email}</div>
                      </td>
                      <td><span className="time-text">{new Date(booking.start_datetime).toLocaleString()}</span></td>
                      <td><span className="time-text">{new Date(booking.end_datetime).toLocaleString()}</span></td>
                      <td>
                        <span className={`bc-badge ${statusClass(booking.status)}`}>
                          {booking.status || 'Pending'}
                        </span>
                      </td>
                      <td style={{ fontSize: '0.82rem', color: '#9ca3af' }}>
                        {booking.users_bookings_approver_idTousers?.name || '—'}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        <DeleteConfirmationModal
          show={showDeleteModal}
          title="Delete Booking"
          message="Are you sure you want to delete this booking? This action cannot be undone."
          onConfirm={handleDelete}
          onClose={() => { setShowDeleteModal(false); setDeleteId(null) }}
        />
      </div>
    </>
  )
}
// 'use client'

// import SearchFilter from '@/components/SearchFilter'
// import StatusBadge from '@/components/StatusBadgeProps'
// import type { Resource, User, Booking } from '@/lib/data'
// import { users } from '@/lib/generated/prisma/client'
// import Link from 'next/link'
// import { useMemo } from 'react'

// // type Props = {
// //   resources: Resource[]
// //   resourceTypes: ResourceType[]
// //   buildings: Building[]
// // }

// export default function BookingsClientPage({
//     bookings,
//     resources,
//     users,
// }: {
//     bookings: Booking[]
//     resources: Resource[]
//     users: User[]
// }) {

//     const resourceMap = useMemo(() => {
//         return Object.fromEntries(
//             resources.map(rt => [rt.id, rt.name])
//         )
//     }, [resources])
//     const userMap = useMemo(() => {
//         return Object.fromEntries(
//             users.map(u => [u.id, u.name])
//         )
//     }, [users])


//     return (
//         <div>
//             <div className="page-header d-flex justify-content-between align-items-center">
//                 <div>
//                     <h1>
//                         <i className="bi bi-box-seam me-2 text-primary"></i>
//                         Booking Management
//                     </h1>
//                     <p className="text-muted mb-0">
//                         Manage bookings and their associated resources
//                     </p>
//                 </div>

//                 <Link href="/bookings/new" className="btn btn-primary">
//                     <i className="bi bi-plus-circle me-2"></i>
//                     Add Booking
//                 </Link>
//             </div>

//             <SearchFilter />

//             <div className="card">
//                 <div className="card-body p-0">
//                     <div className="table-responsive">
//                         <table className="table table-hover mb-0">
//                             <thead>
//                                 <tr>
//                                     <th>Resource</th>
//                                     <th>User</th>
//                                     <th>Start Date & Time</th>
//                                     <th>End Date & Time</th>
//                                     <th>Status</th>
//                                     <th>Approver</th>
//                                     <th className="text-end">Actions</th>
//                                 </tr>
//                             </thead>

//                             <tbody>
//                                 {bookings.length === 0 ? (
//                                     <tr>
//                                         <td colSpan={7} className="text-center text-muted py-4">
//                                             No bookings found
//                                         </td>
//                                     </tr>
//                                 ) : (
//                                     bookings.map(booking => (
//                                         <tr key={booking.id}>
//                                             <td className="fw-semibold">{resourceMap[booking.resourceId] ?? '-'}</td>
//                                             <td>{userMap[booking.userId] ?? '-'}</td>
//                                             <td>{booking.startDateTime}</td>
//                                             <td>{booking.endDateTime}</td>
//                                             <td className="text-capitalize">{booking.status}</td>
//                                             <td><StatusBadge status={booking.status} /></td>
//                                             <td className="text-end">
//                                                 {booking.status === 'Pending' && (
//                                                     <>
//                                                         <button className="btn btn-sm btn-success me-2" title="Approve"><i className="bi bi-check"></i></button>
//                                                         <button className="btn btn-sm btn-danger me-2" title="Reject"><i className="bi bi-x"></i></button>
//                                                     </>
//                                                 )}
                                                
//                                                 <Link
//                                                     href={`/bookings/${booking.id}/edit`}
//                                                     className="btn btn-sm btn-outline-primary"
//                                                 >
//                                                     <i className="bi bi-pencil"></i>
//                                                 </Link>
//                                             </td>
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

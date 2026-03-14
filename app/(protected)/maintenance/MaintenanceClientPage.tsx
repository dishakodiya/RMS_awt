// 'use client'

// import SearchFilter from '@/components/SearchFilter'
// import StatusBadge from '@/components/StatusBadgeProps'
// import type { Maintenance, Resource, User, } from '@/lib/data'
// import { users } from '@/lib/generated/prisma/client'
// import Link from 'next/link'
// import { useMemo } from 'react'


// export default function MaintenanceClientPage({
//     maintenance,
//     resources,
//     users,
// }: {
//     maintenance: Maintenance[]
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
//                         Maintenance Management
//                     </h1>
//                     <p className="text-muted mb-0">
//                         Manage maintenance tasks and their associated resources
//                     </p>
//                 </div>

//                 <Link href="/maintenance/new" className="btn btn-primary">
//                     <i className="bi bi-plus-circle me-2"></i>
//                     Add Maintenance Task
//                 </Link>
//             </div>

//             {/* <SearchFilter /> */}

//             <div className="card">
//                 <div className="card-body p-0">
//                     <div className="table-responsive">
//                         <table className="table table-hover mb-0">
//                             <thead>
//                                 <tr>
//                                     <th>Resource</th>
//                                     <th>Maintenance Type</th>
//                                     <th>Scheduled Date</th>
//                                     <th>Status</th>
//                                     <th>Notes</th>
//                                     <th className="text-end">Actions</th>
//                                 </tr>
//                             </thead>

//                             <tbody>
//                                 {maintenance.length === 0 ? (
//                                     <tr>
//                                         <td colSpan={7} className="text-center text-muted py-4">
//                                             No maintenance tasks found
//                                         </td>
//                                     </tr>
//                                 ) : (
//                                     maintenance.map(m => (
//                                         <tr key={m.id}>
//                                             <td className="fw-semibold">{resourceMap[m.resourceId] ?? '-'}</td>
//                                             <td>{m.maintenanceType}</td>
//                                             <td>{m.scheduledDate}</td>
//                                             <td className="text-capitalize">{m.status}</td>
//                                             <td><StatusBadge status={m.status} /></td>
//                                             <td className="text-end">
//                                                 <Link
//                                                     href={`/maintenance/${m.id}/edit`}
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

// 'use client'

// import SearchFilter from '@/components/SearchFilter'
// import StatusBadge from '@/components/StatusBadgeProps'
// import type { Cupboard, Resource, } from '@/lib/data'
// import Link from 'next/link'
// import { useMemo } from 'react'


// export default function CupboardClientPage({
//     cupboards,
//     resources,
// }: {
//     cupboards: Cupboard[]
//     resources: Resource[]
// }) {

//     const resourceMap = useMemo(() => {
//         return Object.fromEntries(
//             resources.map(rt => [rt.id, rt.name])
//         )
//     }, [resources])

//     return (
//         <div>
//             <div className="page-header d-flex justify-content-between align-items-center">
//                 <div>
//                     <h1>
//                         <i className="bi bi-box-seam me-2 text-primary"></i>
//                         Cupboard Management
//                     </h1>
//                     <p className="text-muted mb-0">
//                         Manage cupboards and their associated resources
//                     </p>
//                 </div>

//                 <Link href="/cupboards/new" className="btn btn-primary">
//                     <i className="bi bi-plus-circle me-2"></i>
//                     Add Cupboard
//                 </Link>
//             </div>

//             <SearchFilter />

//             <div className="card">
//                 <div className="card-body p-0">
//                     <div className="table-responsive">
//                         <table className="table table-hover mb-0">
//                             <thead>
//                                 <tr>
//                                     <th>Name</th>
//                                     <th>Location</th>
//                                     <th>Total Shelves</th>
//                                     <th className="text-end">Actions</th>
//                                 </tr>
//                             </thead>

//                             <tbody>
//                                 {cupboards.length === 0 ? (
//                                     <tr>
//                                         <td colSpan={7} className="text-center text-muted py-4">
//                                             No cupboards found
//                                         </td>
//                                     </tr>
//                                 ) : (
//                                     cupboards.map(c => (
//                                         <tr key={c.id}>
//                                             <td className="text-capitalize">{c.name}</td>
//                                             <td className="fw-semibold">{resourceMap[c.resourceLocation] ?? '-'}</td>
//                                             <td>{c.totalShelves}</td>
//                                             <td className="text-end">
//                                                 <Link
//                                                     href={`/cupboards/${c.id}/edit`}
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

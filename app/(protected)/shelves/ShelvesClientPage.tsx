// 'use client'

// import SearchFilter from '@/components/SearchFilter'
// import type { Cupboard, Shelf, } from '@/lib/data'
// import Link from 'next/link'
// import { useMemo } from 'react'


// export default function ShelvesClientPage({
//     shelves,
//     cupboards,
// }: {
//     shelves: Shelf[]
//     cupboards: Cupboard[]
// }) {

//     const cupboardMap = useMemo(() => {
//         return Object.fromEntries(
//             cupboards.map(c => [c.id, c.name])
//         )
//     }, [cupboards])

//     return (
//         <div>
//             <div className="page-header d-flex justify-content-between align-items-center">
//                 <div>
//                     <h1>
//                         <i className="bi bi-box-seam me-2 text-primary"></i>
//                         Shelves Management
//                     </h1>
//                     <p className="text-muted mb-0">
//                         Manage cupboards and their associated shelves
//                     </p>
//                 </div>

//                 <Link href="/shelves/new" className="btn btn-primary">
//                     <i className="bi bi-plus-circle me-2"></i>
//                     Add Shelf
//                 </Link>
//             </div>

//             <SearchFilter />

//             <div className="card">
//                 <div className="card-body p-0">
//                     <div className="table-responsive">
//                         <table className="table table-hover mb-0">
//                             <thead>
//                                 <tr>
//                                     <th>Shelf number</th>
//                                     <th>Capacity</th>
//                                     <th>Cupboard</th>
//                                     <th>Description</th>
//                                     <th className="text-end">Actions</th>
//                                 </tr>
//                             </thead>

//                             <tbody>
//                                 {shelves.length === 0 ? (
//                                     <tr>
//                                         <td colSpan={7} className="text-center text-muted py-4">
//                                             No shelves found
//                                         </td>
//                                     </tr>
//                                 ) : (
//                                     shelves.map(c => (
//                                         <tr key={c.id}>
//                                             <td className="text-capitalize">{c.shelfNumber}</td>
//                                             <td>{c.capacity}</td>
//                                             <td className="fw-semibold">{cupboardMap[c.cupboardId] ?? '-'}</td>
//                                             <td>{c.description}</td>
//                                             <td className="text-end">
//                                                 <Link
//                                                     href={`/shelves/${c.id}/edit`}
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

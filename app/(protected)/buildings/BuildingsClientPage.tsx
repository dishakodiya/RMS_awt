// 'use client'
// import SearchFilter from '@/components/SearchFilter'
// import type { Building} from '@/lib/data'
// // import { deleteUser } from './actions'
// import Link from 'next/link'

// // async function handleDelete(id: string) {
// //   const confirmed = confirm('Are you sure you want to delete this user?')
// //   if (!confirmed) return

// //   try {
// //     await deleteUser(id)
// //   } catch (error) {
// //     alert('Failed to delete user')
// //   }
// // }


// export default function BuildingsClientPage({ buildings: b }: { buildings: Building[] }) {
//   return (
//     <div>
//       <div className="page-header d-flex justify-content-between align-items-center">
//         <div>
//           <h1>
//             <i className="bi bi-people me-2 text-primary"></i>
//             Bulding Management
//           </h1>
//           <p className="text-muted mb-0">Manage system users and their roles</p>
//         </div>
//         <Link href="/users/new" className="btn btn-primary">
//           <i className="bi bi-plus-circle me-2"></i>
//           Add Bulding
//         </Link>
//       </div>

//       <SearchFilter />

//       <div className="card">
//         <div className="card-body p-0">
//           <div className="table-responsive">
//             <table className="table table-hover mb-0">
//               <thead>
//                 <tr>
//                   <th>Name</th>
//                   <th>Building Number</th>
//                   <th>Total Floors</th>
//                   <th className="text-end">Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {b.length === 0 ? (
//                   <tr>
//                     <td colSpan={4} className="text-center text-muted py-4">
//                       <i className="bi bi-inbox me-2"></i>
//                       No buildings found
//                     </td>
//                   </tr>
//                 ) : (
//                   b.map((building) => (
//                     <tr key={building.id}>
//                       <td className="fw-semibold">{building.name}</td>
//                       <td>{building.buildingNumber}</td>
//                       <td>{building.totalFloors}</td>
//                       <td className="text-end">
//                         <Link
//                           href={`/buildings/${building.id}/edit`}
//                           className="btn btn-sm btn-outline-primary me-2"
//                         >
//                           <i className="bi bi-pencil"></i>
//                         </Link>

                      
//                         {/* <button
//                           className="btn btn-sm btn-outline-danger"
//                           onClick={() => handleDelete(user.id)}
//                         >
//                           <i className="bi bi-trash"></i>
//                         </button> */}
//                       </td>
//                     </tr>
//                   ))
//                 )}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//     </div>

//   )
// }

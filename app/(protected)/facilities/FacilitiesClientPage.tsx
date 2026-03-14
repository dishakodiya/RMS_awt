// 'use client'

// import SearchFilter from '@/components/SearchFilter'
// import type { Resource, Facility } from '@/lib/data'
// import Link from 'next/link'
// import { useMemo } from 'react'

// // type Props = {
// //   resources: Resource[]
// //   resourceTypes: ResourceType[]
// //   buildings: Building[]
// // }

// export default function FacilitiesClientPage({
//   facilities,
//   resources,
// }: {
//   facilities: Facility[]
//   resources: Resource[]
// }) {

//   const resourceMap = useMemo(() => {
//     return Object.fromEntries(
//       resources.map(rt => [rt.id, rt.name])
//     )
//   }, [resources])

  

//   return (
//     <div>
//       <div className="page-header d-flex justify-content-between align-items-center">
//         <div>
//           <h1>
//             <i className="bi bi-box-seam me-2 text-primary"></i>
//             Facility Management
//           </h1>
//           <p className="text-muted mb-0">
//             Manage facilities and their associated resources
//           </p>
//         </div>

//         <Link href="/resources/new" className="btn btn-primary">
//           <i className="bi bi-plus-circle me-2"></i>
//           Add Resource
//         </Link>
//       </div>

//       <SearchFilter />

//       <div className="card">
//         <div className="card-body p-0">
//           <div className="table-responsive">
//             <table className="table table-hover mb-0">
//               <thead>
//                 <tr>
//                   <th>Facility Name</th>
//                   <th>Details</th>
//                   <th>Linked Resource</th>
//                   <th className="text-end">Actions</th>
//                 </tr>
//               </thead>

//               <tbody>
//                 {facilities.length === 0 ? (
//                   <tr>
//                     <td colSpan={6} className="text-center text-muted py-4">
//                       No facilities found
//                     </td>
//                   </tr>
//                 ) : (
//                   facilities.map(facility => (
//                     <tr key={facility.id}>
//                       <td className="fw-semibold">{facility.name}</td>
//                       <td>{facility.details}</td>
//                       <td>{resourceMap[facility.resourceId] ?? '-'}</td>
//                       <td className="text-end">
//                         <Link
//                           href={`/facilities/${facility.id}/edit`}
//                           className="btn btn-sm btn-outline-primary"
//                         >
//                           <i className="bi bi-pencil"></i>
//                         </Link>
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

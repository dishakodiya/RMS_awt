// 'use client'

// import SearchFilter from '@/components/SearchFilter'
// import type { Resource, ResourceType, Building } from '@/lib/data'
// import Link from 'next/link'
// import { useMemo } from 'react'

// // type Props = {
// //   resources: Resource[]
// //   resourceTypes: ResourceType[]
// //   buildings: Building[]
// // }

// export default function ResourcesClientPage({
//   resources,
//   resourceTypes,
//   buildings,
// }: {
//   resources: Resource[]
//   resourceTypes: ResourceType[]
//   buildings: Building[]
// }) {

//   const resourceTypeMap = useMemo(() => {
//     return Object.fromEntries(
//       resourceTypes.map(rt => [rt.id, rt.name])
//     )
//   }, [resourceTypes])

//   const buildingMap = useMemo(() => {
//     return Object.fromEntries(
//       buildings.map(b => [b.id, b.name])
//     )
//   }, [buildings])

//   return (
//     <div>
//       <div className="page-header d-flex justify-content-between align-items-center">
//         <div>
//           <h1>
//             <i className="bi bi-box-seam me-2 text-primary"></i>
//             Resource Management
//           </h1>
//           <p className="text-muted mb-0">
//             Manage resources and their locations
//           </p>
//         </div>

//         <Link href="/resources/new" className="btn btn-primary">
//           <i className="bi bi-plus-circle me-2"></i>
//           Add Resource
//         </Link>
//       </div>

//       {/* <SearchFilter /> */}

//       <div className="card">
//         <div className="card-body p-0">
//           <div className="table-responsive">
//             <table className="table table-hover mb-0">
//               <thead>
//                 <tr>
//                   <th>Resource Name</th>
//                   <th>Resource Type</th>
//                   <th>Building</th>
//                   <th>Floor</th>
//                   <th>Description</th>
//                   <th className="text-end">Actions</th>
//                 </tr>
//               </thead>

//               <tbody>
//                 {resources.length === 0 ? (
//                   <tr>
//                     <td colSpan={6} className="text-center text-muted py-4">
//                       No resources found
//                     </td>
//                   </tr>
//                 ) : (
//                   resources.map(resource => (
//                     <tr key={resource.id}>
//                       <td className="fw-semibold">{resource.name}</td>
//                       <td>{resourceTypeMap[resource.resourceTypeId] ?? '-'}</td>
//                       <td>{buildingMap[resource.buildingId] ?? '-'}</td>
//                       <td>{resource.floorNumber}</td>
//                       <td>{resource.description || '-'}</td>
//                       <td className="text-end">
//                         <Link
//                           href={`/resources/${resource.id}/edit`}
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

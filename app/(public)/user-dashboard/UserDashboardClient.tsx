// 'use client'

// import { useMemo, useState } from 'react'
// import { useRouter } from 'next/navigation'
// import BookingActionModal from './BookingActionModal'

// export default function UserDashboardClient({ resources, activeBookings, activeMaintenance }: any) {
//   const router = useRouter()

//   // Default to today
//   const [selectedDate, setSelectedDate] = useState(() => {
//      const today = new Date()
//      return today.toISOString().split('T')[0]
//   })

//   // Filter states
//   const [searchTerm, setSearchTerm] = useState('')
//   const [statusFilter, setStatusFilter] = useState<'All' | 'Free' | 'Booked' | 'Maintenance'>('All')
//   const [typeFilter, setTypeFilter] = useState<string>('All')

//   // Modal State
//   const [showModal, setShowModal] = useState(false)
//   const [selectedResource, setSelectedResource] = useState<any>(null)

//   // Get start/end of the selected date for comparison
//   const getSelectedDateBounds = () => {
//       const start = new Date(selectedDate)
//       start.setHours(0, 0, 0, 0)

//       const end = new Date(selectedDate)
//       end.setHours(23, 59, 59, 999)

//       return { start, end }
//   }

//   // Calculate status of a resource
//   const getResourceStatus = (resourceId: number) => {
//       if (!selectedDate) return 'Free'

//       const { start, end } = getSelectedDateBounds()

//       // 1. Check Maintenance
//       // If there's an active maintenance for this resource whose scheduled_date matches or goes past
//       // In a real system, maintenance might have start/end, but here we just check if it exists and isn't completed.
//       const isUnderMaintenance = activeMaintenance.some((m: any) => m.resource_id === resourceId)
//       if (isUnderMaintenance) return 'Maintenance'

//       // 2. Check Bookings
//       // A resource is booked if any booking overlaps with the selected date bounds
//       const isBooked = activeBookings.some((b: any) => {
//           if (b.resource_id !== resourceId) return false

//           // Check overlap
//           const bStart = new Date(b.start_datetime)
//           const bEnd = new Date(b.end_datetime)

//           // Overlaps if booking starts before the end of the day AND booking ends after the start of the day
//           return (bStart <= end && bEnd >= start && b.status !== 'Rejected' && b.status !== 'Cancelled')
//       })

//       if (isBooked) return 'Booked'

//       return 'Free'
//   }

//   const handleBookClick = (resource: any) => {
//       setSelectedResource(resource)
//       setShowModal(true)
//   }

//   const derivedStats = useMemo(() => {
//       let total = resources.length
//       let free = 0
//       let booked = 0
//       let maintenance = 0

//       resources.forEach((r: any) => {
//         const status = getResourceStatus(r.resource_id)
//         if (status === 'Free') free++
//         if (status === 'Booked') booked++
//         if (status === 'Maintenance') maintenance++
//       })

//       return { total, free, booked, maintenance }
//   }, [resources, selectedDate, activeBookings, activeMaintenance])

//   const uniqueTypes: string[] = useMemo(() => {
//       const set = new Set<string>()
//       resources.forEach((r: any) => {
//         if (r.resource_types?.type_name) {
//           set.add(r.resource_types.type_name)
//         }
//       })
//       return ['All', ...Array.from(set).sort()]
//   }, [resources])

//   // Filtered list
//   const filteredResources = resources.filter((r: any) => {
//       const matchSearch = r.resource_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                           r.resource_types?.type_name?.toLowerCase().includes(searchTerm.toLowerCase())

//       const status = getResourceStatus(r.resource_id)
//       const matchStatus = statusFilter === 'All' || status === statusFilter

//       const matchType =
//         typeFilter === 'All' ||
//         r.resource_types?.type_name === typeFilter

//       return matchSearch && matchStatus && matchType
//   })

//   return (
//     <div>
//       {/* Header + stats strip */}
//       <div className="mb-4">
//         <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-3">
//           <div>
//             <h2 className="mb-1 text-dark fw-bold d-flex align-items-center gap-2">
//               <span className="badge bg-primary-subtle text-primary border border-primary-subtle rounded-circle p-2">
//                 <i className="bi bi-activity"></i>
//               </span>
//               Smart Availability
//             </h2>
//             <p className="text-muted mb-0">
//               Plan your day by seeing which resources are free, booked, or under maintenance.
//             </p>
//           </div>
//           <div className="d-flex flex-wrap gap-2">
//             <div className="badge rounded-pill bg-light text-secondary d-flex align-items-center gap-2 px-3 py-2">
//               <i className="bi bi-collection text-primary"></i>
//               <span className="fw-semibold">{derivedStats.total}</span>
//               <span className="small text-muted text-uppercase">Total</span>
//             </div>
//             <div className="badge rounded-pill bg-success-subtle text-success d-flex align-items-center gap-2 px-3 py-2">
//               <i className="bi bi-check-circle"></i>
//               <span className="fw-semibold">{derivedStats.free}</span>
//               <span className="small text-uppercase">Free</span>
//             </div>
//             <div className="badge rounded-pill bg-warning-subtle text-warning d-flex align-items-center gap-2 px-3 py-2">
//               <i className="bi bi-calendar-event"></i>
//               <span className="fw-semibold">{derivedStats.booked}</span>
//               <span className="small text-uppercase">Booked</span>
//             </div>
//             <div className="badge rounded-pill bg-danger-subtle text-danger d-flex align-items-center gap-2 px-3 py-2">
//               <i className="bi bi-tools"></i>
//               <span className="fw-semibold">{derivedStats.maintenance}</span>
//               <span className="small text-uppercase">Maintenance</span>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Filters panel */}
//       <div className="card border-0 shadow-sm mb-4">
//         <div className="card-body bg-white rounded-3 p-4">
//            <div className="row g-3 align-items-end">
//               <div className="col-md-4">
//                  <label className="form-label fw-semibold text-muted small text-uppercase">Select Date</label>
//                  <div className="input-group input-group-lg">
//                     <span className="input-group-text bg-light border-end-0">
//                        <i className="bi bi-calendar3 text-primary"></i>
//                     </span>
//                     <input 
//                       type="date" 
//                       className="form-control bg-light border-start-0 ps-0" 
//                       value={selectedDate}
//                       onChange={(e) => setSelectedDate(e.target.value)}
//                     />
//                  </div>
//               </div>
//               <div className="col-md-5">
//                  <label className="form-label fw-semibold text-muted small text-uppercase">Search</label>
//                  <div className="input-group input-group-lg">
//                     <span className="input-group-text bg-light border-end-0">
//                        <i className="bi bi-search text-muted"></i>
//                     </span>
//                     <input 
//                       type="text" 
//                       className="form-control bg-light border-start-0 ps-0" 
//                       placeholder="Search by name or type..." 
//                       value={searchTerm}
//                       onChange={(e) => setSearchTerm(e.target.value)}
//                     />
//                  </div>
//               </div>
//               <div className="col-md-3">
//                 <label className="form-label fw-semibold text-muted small text-uppercase">Status</label>
//                 <div className="d-flex flex-wrap gap-2">
//                   {(['All', 'Free', 'Booked', 'Maintenance'] as const).map((s) => (
//                     <button
//                       key={s}
//                       type="button"
//                       className={
//                         'btn btn-sm rounded-pill px-3 fw-semibold ' +
//                         (statusFilter === s
//                           ? 'btn-primary'
//                           : 'btn-outline-secondary bg-light border-0 text-muted')
//                       }
//                       onClick={() => setStatusFilter(s)}
//                     >
//                       {s}
//                     </button>
//                   ))}
//                 </div>
//               </div>
//               <div className="col-12">
//                 <label className="form-label fw-semibold text-muted small text-uppercase">Resource Type</label>
//                 <div className="d-flex flex-wrap gap-2">
//                   {uniqueTypes.map((type) => (
//                     <button
//                       key={type}
//                       type="button"
//                       className={
//                         'btn btn-sm rounded-pill px-3 fw-semibold ' +
//                         (typeFilter === type
//                           ? 'btn-outline-primary'
//                           : 'btn-outline-secondary border-0 text-muted bg-light')
//                       }
//                       onClick={() => setTypeFilter(type)}
//                     >
//                       {type}
//                     </button>
//                   ))}
//                 </div>
//               </div>
//            </div>
//         </div>
//       </div>

//       {/* Grid of Resources */}
//       <div className="row g-4">
//           {filteredResources.length === 0 ? (
//              <div className="col-12 text-center py-5">
//                 <div className="display-4 text-muted mb-3"><i className="bi bi-inbox"></i></div>
//                 <h4 className="text-muted">No resources found for current filters</h4>
//              </div>
//           ) : (
//              filteredResources.map((resource: any) => {
//                  const status = getResourceStatus(resource.resource_id)

//                  let statusBadge = "bg-success"
//                  if (status === 'Booked') statusBadge = "bg-warning text-dark"
//                  if (status === 'Maintenance') statusBadge = "bg-danger"

//                  return (
//                      <div key={resource.resource_id} className="col-md-6 col-lg-4">
//                         <div className="card h-100 border-0 shadow-sm hover-shadow transition-all">
//                            <div className="card-body p-4">
//                                <div className="d-flex justify-content-between align-items-start mb-3">
//                                    <div className={`badge ${statusBadge} rounded-pill px-3 py-2 fw-semibold shadow-sm`}>
//                                       {status === 'Free' && <i className="bi bi-check-circle me-1"></i>}
//                                       {status === 'Booked' && <i className="bi bi-calendar-x me-1"></i>}
//                                       {status === 'Maintenance' && <i className="bi bi-tools me-1"></i>}
//                                       {status}
//                                    </div>
//                                </div>

//                                <h5 className="card-title fw-bold text-dark mb-1">{resource.resource_name}</h5>
//                                <p className="text-secondary small mb-3">
//                                   <i className="bi bi-tag-fill me-1 text-muted"></i> 
//                                   {resource.resource_types?.type_name || 'No Type'}
//                                </p>

//                                <div className="d-flex flex-column gap-2 text-muted small mb-4">
//                                    <div className="d-flex align-items-center gap-2">
//                                        <i className="bi bi-building"></i>
//                                        <span>{resource.buildings?.building_name || 'N/A'}</span>
//                                    </div>
//                                    {resource.facilities && (
//                                        <div className="d-flex align-items-center gap-2">
//                                            <i className="bi bi-wrench"></i>
//                                            <span>{resource.facilities.facility_name}</span>
//                                        </div>
//                                    )}
//                                     {resource.cupboards && (
//                                        <div className="d-flex align-items-center gap-2">
//                                            <i className="bi bi-archive"></i>
//                                            <span>{resource.cupboards.cupboard_name}</span>
//                                        </div>
//                                    )}
//                                    {resource.shelves && (
//                                        <div className="d-flex align-items-center gap-2">
//                                            <i className="bi bi-layers"></i>
//                                            <span>{resource.shelves.shelf_name}</span>
//                                        </div>
//                                    )}
//                                </div>

//                                <div className="mt-auto">
//                                    <button 
//                                       className="btn btn-primary w-100 rounded-pill py-2 fw-semibold"
//                                       disabled={status !== 'Free'}
//                                       onClick={() => handleBookClick(resource)}
//                                    >
//                                       {status === 'Free' ? 'Book Now' : 'Not Available'}
//                                    </button>
//                                </div>
//                            </div>
//                         </div>
//                      </div>
//                  )
//              })
//           )}
//       </div>

//       {showModal && selectedResource && (
//          <BookingActionModal 
//             resource={selectedResource}
//             defaultDate={selectedDate}
//             onClose={() => setShowModal(false)}
//             onSuccess={() => {
//                 setShowModal(false)
//                 router.refresh()
//             }}
//          />
//       )}
//     </div>
//   )
// }

// 'use client'

// import { useMemo, useState } from 'react'
// import { useRouter } from 'next/navigation'
// import BookingActionModal from './BookingActionModal'

// const dashStyles = `
//   @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@300;400;500&display=swap');

//   .ud-root { font-family: 'DM Sans', sans-serif; color: #fff; }

//   /* ── Header ── */
//   .ud-header { margin-bottom: 2rem; }

//   .ud-page-title {
//     font-family: 'Syne', sans-serif;
//     font-size: 2rem;
//     font-weight: 800;
//     color: #fff;
//     letter-spacing: -0.04em;
//     margin: 0 0 0.25rem;
//     line-height: 1.1;
//   }

//   .ud-page-sub {
//     font-size: 0.88rem;
//     color: rgba(255,255,255,0.38);
//     margin: 0;
//   }

//   /* ── Stat pills ── */
//   .ud-stats {
//     display: flex;
//     flex-wrap: wrap;
//     gap: 0.6rem;
//     margin-top: 1.5rem;
//   }

//   .ud-stat-pill {
//     display: flex;
//     align-items: center;
//     gap: 8px;
//     padding: 0.45rem 1rem;
//     border-radius: 50px;
//     font-size: 0.82rem;
//     font-weight: 500;
//     border: 1px solid;
//   }

//   .ud-stat-pill .num {
//     font-family: 'Syne', sans-serif;
//     font-weight: 700;
//     font-size: 0.95rem;
//   }

//   .ud-stat-pill.total { background: rgba(255,255,255,0.04); border-color: rgba(255,255,255,0.08); color: rgba(255,255,255,0.55); }
//   .ud-stat-pill.free  { background: rgba(34,197,94,0.08); border-color: rgba(34,197,94,0.18); color: #4ade80; }
//   .ud-stat-pill.booked { background: rgba(255,185,60,0.08); border-color: rgba(255,185,60,0.18); color: #ffb93c; }
//   .ud-stat-pill.maintenance { background: rgba(239,68,68,0.08); border-color: rgba(239,68,68,0.18); color: #f87171; }

//   /* ── Filter panel ── */
//   .ud-filters {
//     background: rgba(255,255,255,0.02);
//     border: 1px solid rgba(255,255,255,0.07);
//     border-radius: 16px;
//     padding: 1.25rem 1.5rem;
//     margin-bottom: 1.75rem;
//   }

//   .ud-filter-label {
//     display: block;
//     font-size: 0.68rem;
//     font-weight: 600;
//     text-transform: uppercase;
//     letter-spacing: 0.08em;
//     color: rgba(255,255,255,0.28);
//     margin-bottom: 0.55rem;
//   }

//   .ud-input {
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
//     color-scheme: dark;
//   }

//   .ud-input:focus {
//     border-color: rgba(255,185,60,0.35);
//     background: rgba(255,185,60,0.04);
//     box-shadow: 0 0 0 3px rgba(255,185,60,0.07);
//   }

//   .ud-input-wrap {
//     position: relative;
//   }

//   .ud-input-wrap i {
//     position: absolute;
//     left: 0.85rem;
//     top: 50%;
//     transform: translateY(-50%);
//     color: rgba(255,255,255,0.25);
//     font-size: 0.85rem;
//     pointer-events: none;
//   }

//   .ud-date-input {
//     padding-left: 0.9rem;
//   }

//   /* chip-style filter buttons */
//   .ud-chip {
//     background: rgba(255,255,255,0.04);
//     border: 1px solid rgba(255,255,255,0.08);
//     color: rgba(255,255,255,0.45);
//     font-size: 0.78rem;
//     font-weight: 500;
//     font-family: 'DM Sans', sans-serif;
//     padding: 0.3rem 0.85rem;
//     border-radius: 50px;
//     cursor: pointer;
//     transition: all 0.18s;
//   }

//   .ud-chip:hover {
//     background: rgba(255,255,255,0.07);
//     color: rgba(255,255,255,0.75);
//   }

//   .ud-chip.active-status {
//     background: rgba(255,185,60,0.12);
//     border-color: rgba(255,185,60,0.28);
//     color: #ffb93c;
//   }

//   .ud-chip.active-type {
//     background: rgba(130,80,255,0.12);
//     border-color: rgba(130,80,255,0.28);
//     color: #a78bfa;
//   }

//   .ud-filter-row {
//     display: flex;
//     flex-wrap: wrap;
//     gap: 0.45rem;
//   }

//   /* ── Resource card ── */
//   .ud-card {
//     background: rgba(255,255,255,0.025);
//     border: 1px solid rgba(255,255,255,0.07);
//     border-radius: 16px;
//     padding: 1.35rem;
//     height: 100%;
//     transition: all 0.25s ease;
//     display: flex;
//     flex-direction: column;
//     position: relative;
//     overflow: hidden;
//   }

//   .ud-card::after {
//     content: '';
//     position: absolute;
//     inset: 0;
//     border-radius: 16px;
//     opacity: 0;
//     transition: opacity 0.25s;
//     pointer-events: none;
//   }

//   .ud-card:hover {
//     transform: translateY(-4px);
//     background: rgba(255,255,255,0.04);
//     border-color: rgba(255,255,255,0.11);
//     box-shadow: 0 20px 50px rgba(0,0,0,0.5);
//   }

//   .ud-card:hover::after { opacity: 1; }

//   .ud-status-badge {
//     display: inline-flex;
//     align-items: center;
//     gap: 5px;
//     font-size: 0.7rem;
//     font-weight: 600;
//     text-transform: uppercase;
//     letter-spacing: 0.06em;
//     padding: 0.28rem 0.7rem;
//     border-radius: 6px;
//     border: 1px solid;
//     width: fit-content;
//   }

//   .ud-status-badge.free { background: rgba(34,197,94,0.1); border-color: rgba(34,197,94,0.2); color: #4ade80; }
//   .ud-status-badge.booked { background: rgba(255,185,60,0.1); border-color: rgba(255,185,60,0.2); color: #ffb93c; }
//   .ud-status-badge.maintenance { background: rgba(239,68,68,0.1); border-color: rgba(239,68,68,0.2); color: #f87171; }

//   .ud-card-name {
//     font-family: 'Syne', sans-serif;
//     font-size: 1.05rem;
//     font-weight: 700;
//     color: #fff;
//     margin: 0.85rem 0 0.2rem;
//     letter-spacing: -0.02em;
//   }

//   .ud-card-type {
//     font-size: 0.78rem;
//     color: rgba(255,255,255,0.35);
//     margin-bottom: 0.9rem;
//     display: flex;
//     align-items: center;
//     gap: 5px;
//   }

//   .ud-card-details {
//     display: flex;
//     flex-direction: column;
//     gap: 0.4rem;
//     margin-bottom: 1.1rem;
//     flex: 1;
//   }

//   .ud-card-detail {
//     display: flex;
//     align-items: center;
//     gap: 8px;
//     font-size: 0.8rem;
//     color: rgba(255,255,255,0.38);
//   }

//   .ud-card-detail i { font-size: 0.8rem; }

//   .ud-book-btn {
//     width: 100%;
//     border: none;
//     border-radius: 10px;
//     padding: 0.65rem;
//     font-size: 0.875rem;
//     font-weight: 600;
//     font-family: 'DM Sans', sans-serif;
//     cursor: pointer;
//     transition: all 0.2s;
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     gap: 6px;
//   }

//   .ud-book-btn.can-book {
//     background: linear-gradient(135deg, #ffb93c, #ff7b00);
//     color: #000;
//     box-shadow: 0 4px 16px rgba(255,185,60,0.2);
//   }

//   .ud-book-btn.can-book:hover {
//     transform: translateY(-1px);
//     box-shadow: 0 8px 24px rgba(255,185,60,0.35);
//   }

//   .ud-book-btn.unavailable {
//     background: rgba(255,255,255,0.04);
//     color: rgba(255,255,255,0.22);
//     cursor: not-allowed;
//     border: 1px solid rgba(255,255,255,0.06);
//   }

//   /* ── Empty state ── */
//   .ud-empty {
//     text-align: center;
//     padding: 5rem 2rem;
//     color: rgba(255,255,255,0.3);
//   }

//   .ud-empty i { font-size: 2.5rem; display: block; margin-bottom: 1rem; }
//   .ud-empty h4 { font-family: 'Syne', sans-serif; color: rgba(255,255,255,0.45); font-size: 1.2rem; }

//   /* ── Divider ── */
//   .ud-section-divider {
//     height: 1px;
//     background: rgba(255,255,255,0.06);
//     margin: 1.1rem 0;
//   }
// `

// export default function UserDashboardClient({ resources, activeBookings, activeMaintenance }: any) {
//   const router = useRouter()

//   const [selectedDate, setSelectedDate] = useState(() => {
//     const today = new Date()
//     return today.toISOString().split('T')[0]
//   })

//   const [searchTerm, setSearchTerm] = useState('')
//   const [statusFilter, setStatusFilter] = useState<'All' | 'Free' | 'Booked' | 'Maintenance'>('All')
//   const [typeFilter, setTypeFilter] = useState<string>('All')
//   const [showModal, setShowModal] = useState(false)
//   const [selectedResource, setSelectedResource] = useState<any>(null)

//   const getSelectedDateBounds = () => {
//     const start = new Date(selectedDate)
//     start.setHours(0, 0, 0, 0)
//     const end = new Date(selectedDate)
//     end.setHours(23, 59, 59, 999)
//     return { start, end }
//   }

//   const getResourceStatus = (resourceId: number) => {
//     if (!selectedDate) return 'Free'
//     const { start, end } = getSelectedDateBounds()

//     const isUnderMaintenance = activeMaintenance.some((m: any) => m.resource_id === resourceId)
//     if (isUnderMaintenance) return 'Maintenance'

//     const isBooked = activeBookings.some((b: any) => {
//       if (b.resource_id !== resourceId) return false
//       const bStart = new Date(b.start_datetime)
//       const bEnd = new Date(b.end_datetime)
//       return (bStart <= end && bEnd >= start && b.status !== 'Rejected' && b.status !== 'Cancelled')
//     })

//     if (isBooked) return 'Booked'
//     return 'Free'
//   }

//   const handleBookClick = (resource: any) => {
//     setSelectedResource(resource)
//     setShowModal(true)
//   }

//   const derivedStats = useMemo(() => {
//     let total = resources.length, free = 0, booked = 0, maintenance = 0
//     resources.forEach((r: any) => {
//       const status = getResourceStatus(r.resource_id)
//       if (status === 'Free') free++
//       if (status === 'Booked') booked++
//       if (status === 'Maintenance') maintenance++
//     })
//     return { total, free, booked, maintenance }
//   }, [resources, selectedDate, activeBookings, activeMaintenance])

//   const uniqueTypes: string[] = useMemo(() => {
//     const set = new Set<string>()
//     resources.forEach((r: any) => {
//       if (r.resource_types?.type_name) set.add(r.resource_types.type_name)
//     })
//     return ['All', ...Array.from(set).sort()]
//   }, [resources])

//   const filteredResources = resources.filter((r: any) => {
//     const matchSearch = r.resource_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       r.resource_types?.type_name?.toLowerCase().includes(searchTerm.toLowerCase())
//     const status = getResourceStatus(r.resource_id)
//     const matchStatus = statusFilter === 'All' || status === statusFilter
//     const matchType = typeFilter === 'All' || r.resource_types?.type_name === typeFilter
//     return matchSearch && matchStatus && matchType
//   })

//   return (
//     <>
//       <style>{dashStyles}</style>
//       <div className="ud-root">

//         {/* Header */}
//         <div className="ud-header">
//           <div className="ud-page-title">Resource Availability</div>
//           <p className="ud-page-sub">See what's free, booked, or under maintenance on any given day.</p>

//           <div className="ud-stats">
//             <div className="ud-stat-pill total">
//               <i className="bi bi-collection-fill"></i>
//               <span className="num">{derivedStats.total}</span>
//               <span>Total</span>
//             </div>
//             <div className="ud-stat-pill free">
//               <i className="bi bi-check-circle-fill"></i>
//               <span className="num">{derivedStats.free}</span>
//               <span>Free</span>
//             </div>
//             <div className="ud-stat-pill booked">
//               <i className="bi bi-calendar-event-fill"></i>
//               <span className="num">{derivedStats.booked}</span>
//               <span>Booked</span>
//             </div>
//             <div className="ud-stat-pill maintenance">
//               <i className="bi bi-tools"></i>
//               <span className="num">{derivedStats.maintenance}</span>
//               <span>Maintenance</span>
//             </div>
//           </div>
//         </div>

//         {/* Filters */}
//         <div className="ud-filters">
//           <div className="row g-3">
//             <div className="col-md-4 col-lg-3">
//               <label className="ud-filter-label">Date</label>
//               <input
//                 type="date"
//                 className="ud-input ud-date-input"
//                 value={selectedDate}
//                 onChange={(e) => setSelectedDate(e.target.value)}
//                 style={{ colorScheme: 'dark' }}
//               />
//             </div>
//             <div className="col-md-8 col-lg-5">
//               <label className="ud-filter-label">Search</label>
//               <div className="ud-input-wrap">
//                 <i className="bi bi-search"></i>
//                 <input
//                   type="text"
//                   className="ud-input"
//                   placeholder="Name or type…"
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                 />
//               </div>
//             </div>
//             <div className="col-12">
//               <div className="ud-section-divider"></div>
//             </div>
//             <div className="col-md-6">
//               <label className="ud-filter-label">Status</label>
//               <div className="ud-filter-row">
//                 {(['All', 'Free', 'Booked', 'Maintenance'] as const).map((s) => (
//                   <button
//                     key={s}
//                     className={`ud-chip ${statusFilter === s ? 'active-status' : ''}`}
//                     onClick={() => setStatusFilter(s)}
//                   >
//                     {s}
//                   </button>
//                 ))}
//               </div>
//             </div>
//             <div className="col-md-6">
//               <label className="ud-filter-label">Type</label>
//               <div className="ud-filter-row">
//                 {uniqueTypes.map((type) => (
//                   <button
//                     key={type}
//                     className={`ud-chip ${typeFilter === type ? 'active-type' : ''}`}
//                     onClick={() => setTypeFilter(type)}
//                   >
//                     {type}
//                   </button>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Resource Grid */}
//         <div className="row g-3">
//           {filteredResources.length === 0 ? (
//             <div className="col-12">
//               <div className="ud-empty">
//                 <i className="bi bi-inbox"></i>
//                 <h4>No resources match your filters</h4>
//               </div>
//             </div>
//           ) : (
//             filteredResources.map((resource: any) => {
//               const status = getResourceStatus(resource.resource_id)
//               const statusClass = status.toLowerCase()

//               const statusIcon =
//                 status === 'Free' ? 'bi-check-circle-fill' :
//                 status === 'Booked' ? 'bi-calendar-x-fill' : 'bi-tools'

//               return (
//                 <div key={resource.resource_id} className="col-md-6 col-lg-4">
//                   <div className="ud-card">
//                     <div className={`ud-status-badge ${statusClass}`}>
//                       <i className={`bi ${statusIcon}`}></i>
//                       {status}
//                     </div>

//                     <div className="ud-card-name">{resource.resource_name}</div>
//                     <div className="ud-card-type">
//                       <i className="bi bi-tag-fill"></i>
//                       {resource.resource_types?.type_name || 'No Type'}
//                     </div>

//                     <div className="ud-card-details">
//                       <div className="ud-card-detail">
//                         <i className="bi bi-building"></i>
//                         <span>{resource.buildings?.building_name || 'N/A'}</span>
//                       </div>
//                       {resource.facilities && (
//                         <div className="ud-card-detail">
//                           <i className="bi bi-wrench"></i>
//                           <span>{resource.facilities.facility_name}</span>
//                         </div>
//                       )}
//                       {resource.cupboards && (
//                         <div className="ud-card-detail">
//                           <i className="bi bi-archive"></i>
//                           <span>{resource.cupboards.cupboard_name}</span>
//                         </div>
//                       )}
//                       {resource.shelves && (
//                         <div className="ud-card-detail">
//                           <i className="bi bi-layers"></i>
//                           <span>{resource.shelves.shelf_name}</span>
//                         </div>
//                       )}
//                     </div>

//                     <button
//                       className={`ud-book-btn ${status === 'Free' ? 'can-book' : 'unavailable'}`}
//                       disabled={status !== 'Free'}
//                       onClick={() => handleBookClick(resource)}
//                     >
//                       {status === 'Free' ? (
//                         <><i className="bi bi-calendar-plus"></i> Book Now</>
//                       ) : (
//                         <><i className="bi bi-lock-fill"></i> Unavailable</>
//                       )}
//                     </button>
//                   </div>
//                 </div>
//               )
//             })
//           )}
//         </div>

//         {showModal && selectedResource && (
//           <BookingActionModal
//             resource={selectedResource}
//             defaultDate={selectedDate}
//             onClose={() => setShowModal(false)}
//             onSuccess={() => {
//               setShowModal(false)
//               router.refresh()
//             }}
//           />
//         )}
//       </div>
//     </>
//   )
// }




// 'use client'

// import { useMemo, useState } from 'react'
// import { useRouter } from 'next/navigation'
// import BookingActionModal from './BookingActionModal'

// const styles = `
//   @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

//   .ud-root { font-family: 'Plus Jakarta Sans', sans-serif; color: #1a1d23; }

//   /* ── Page heading ── */
//   .ud-page-title {
//     font-size: 1.6rem;
//     font-weight: 800;
//     color: #111827;
//     letter-spacing: -0.03em;
//     margin: 0 0 0.2rem;
//     line-height: 1.2;
//   }

//   .ud-page-sub {
//     font-size: 0.875rem;
//     color: #9ca3af;
//     margin: 0 0 1.25rem;
//     font-weight: 400;
//   }

//   /* ── Stat pills ── */
//   .ud-stats { display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 1.75rem; }

//   .ud-stat-pill {
//     display: inline-flex;
//     align-items: center;
//     gap: 7px;
//     padding: 0.4rem 0.9rem;
//     border-radius: 50px;
//     font-size: 0.8rem;
//     font-weight: 600;
//     border: 1px solid;
//   }

//   .ud-stat-pill .num { font-size: 0.9rem; font-weight: 800; }
//   .ud-stat-pill.total  { background: #f9fafb; border-color: #e5e7eb; color: #6b7280; }
//   .ud-stat-pill.free   { background: #f0fdf4; border-color: #bbf7d0; color: #16a34a; }
//   .ud-stat-pill.booked { background: #fffbeb; border-color: #fde68a; color: #d97706; }
//   .ud-stat-pill.maint  { background: #fef2f2; border-color: #fecaca; color: #dc2626; }

//   /* ── Filter card ── */
//   .ud-filters {
//     background: #fff;
//     border: 1px solid #e8ecf0;
//     border-radius: 14px;
//     padding: 1.25rem 1.5rem;
//     margin-bottom: 1.75rem;
//     box-shadow: 0 1px 4px rgba(0,0,0,0.04);
//   }

//   .ud-filter-label {
//     display: block;
//     font-size: 0.7rem;
//     font-weight: 700;
//     text-transform: uppercase;
//     letter-spacing: 0.08em;
//     color: #9ca3af;
//     margin-bottom: 0.5rem;
//   }

//   .ud-input {
//     width: 100%;
//     background: #f9fafb;
//     border: 1px solid #e5e7eb;
//     border-radius: 9px;
//     color: #111827;
//     padding: 0.58rem 0.9rem 0.58rem 2.3rem;
//     font-size: 0.875rem;
//     font-family: 'Plus Jakarta Sans', sans-serif;
//     outline: none;
//     transition: all 0.18s;
//   }

//   .ud-input:focus {
//     border-color: #93c5fd;
//     background: #fff;
//     box-shadow: 0 0 0 3px rgba(59,130,246,0.1);
//   }

//   .ud-input-wrap { position: relative; }
//   .ud-input-wrap i {
//     position: absolute;
//     left: 0.82rem;
//     top: 50%;
//     transform: translateY(-50%);
//     color: #9ca3af;
//     font-size: 0.82rem;
//     pointer-events: none;
//   }

//   .ud-date-input { padding-left: 0.9rem; }

//   .ud-chip {
//     background: #f3f4f6;
//     border: 1px solid #e5e7eb;
//     color: #6b7280;
//     font-size: 0.78rem;
//     font-weight: 600;
//     font-family: 'Plus Jakarta Sans', sans-serif;
//     padding: 0.3rem 0.85rem;
//     border-radius: 50px;
//     cursor: pointer;
//     transition: all 0.15s;
//   }

//   .ud-chip:hover { background: #e5e7eb; color: #374151; }

//   .ud-chip.active-status {
//     background: #eff4ff;
//     border-color: #bfdbfe;
//     color: #2563eb;
//   }

//   .ud-chip.active-type {
//     background: #f5f3ff;
//     border-color: #ddd6fe;
//     color: #7c3aed;
//   }

//   .ud-filter-row { display: flex; flex-wrap: wrap; gap: 0.4rem; }
//   .ud-divider { height: 1px; background: #f3f4f6; margin: 0.9rem 0; }

//   /* ── Resource card ── */
//   .ud-card {
//     background: #fff;
//     border: 1px solid #e8ecf0;
//     border-radius: 14px;
//     padding: 1.25rem;
//     height: 100%;
//     display: flex;
//     flex-direction: column;
//     transition: all 0.2s ease;
//     box-shadow: 0 1px 4px rgba(0,0,0,0.04);
//   }

//   .ud-card:hover {
//     transform: translateY(-3px);
//     box-shadow: 0 8px 24px rgba(0,0,0,0.09);
//     border-color: #d1d5db;
//   }

//   .ud-status-badge {
//     display: inline-flex;
//     align-items: center;
//     gap: 5px;
//     font-size: 0.7rem;
//     font-weight: 700;
//     text-transform: uppercase;
//     letter-spacing: 0.06em;
//     padding: 0.28rem 0.7rem;
//     border-radius: 6px;
//     border: 1px solid;
//     width: fit-content;
//   }

//   .ud-status-badge.free  { background: #f0fdf4; border-color: #bbf7d0; color: #16a34a; }
//   .ud-status-badge.booked { background: #fffbeb; border-color: #fde68a; color: #d97706; }
//   .ud-status-badge.maintenance { background: #fef2f2; border-color: #fecaca; color: #dc2626; }

//   .ud-card-name {
//     font-size: 1rem;
//     font-weight: 700;
//     color: #111827;
//     margin: 0.8rem 0 0.2rem;
//     letter-spacing: -0.01em;
//   }

//   .ud-card-type {
//     font-size: 0.78rem;
//     color: #9ca3af;
//     margin-bottom: 0.85rem;
//     display: flex;
//     align-items: center;
//     gap: 5px;
//     font-weight: 500;
//   }

//   .ud-card-details {
//     display: flex;
//     flex-direction: column;
//     gap: 0.38rem;
//     margin-bottom: 1rem;
//     flex: 1;
//   }

//   .ud-card-detail {
//     display: flex;
//     align-items: center;
//     gap: 7px;
//     font-size: 0.8rem;
//     color: #6b7280;
//   }

//   .ud-card-detail i { font-size: 0.78rem; color: #9ca3af; }

//   .ud-book-btn {
//     width: 100%;
//     border: none;
//     border-radius: 9px;
//     padding: 0.6rem;
//     font-size: 0.855rem;
//     font-weight: 700;
//     font-family: 'Plus Jakarta Sans', sans-serif;
//     cursor: pointer;
//     transition: all 0.18s;
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     gap: 6px;
//   }

//   .ud-book-btn.can-book {
//     background: #0d6efd;
//     color: #fff;
//   }

//   .ud-book-btn.can-book:hover {
//     background: #0b5ed7;
//     transform: translateY(-1px);
//     box-shadow: 0 4px 14px rgba(13,110,253,0.3);
//   }

//   .ud-book-btn.unavailable {
//     background: #f3f4f6;
//     color: #9ca3af;
//     cursor: not-allowed;
//     border: 1px solid #e5e7eb;
//   }

//   .ud-empty {
//     text-align: center;
//     padding: 5rem 2rem;
//     color: #9ca3af;
//   }
//   .ud-empty i { font-size: 2.5rem; display: block; margin-bottom: 1rem; color: #d1d5db; }
//   .ud-empty h4 { font-size: 1.1rem; color: #6b7280; font-weight: 600; }
// `

// export default function UserDashboardClient({ resources, activeBookings, activeMaintenance }: any) {
//   const router = useRouter()

//   const [selectedDate, setSelectedDate] = useState(() => {
//     const today = new Date()
//     return today.toISOString().split('T')[0]
//   })

//   const [searchTerm, setSearchTerm] = useState('')
//   const [statusFilter, setStatusFilter] = useState<'All' | 'Free' | 'Booked' | 'Maintenance'>('All')
//   const [typeFilter, setTypeFilter] = useState<string>('All')
//   const [showModal, setShowModal] = useState(false)
//   const [selectedResource, setSelectedResource] = useState<any>(null)

//   const getSelectedDateBounds = () => {
//     const start = new Date(selectedDate)
//     start.setHours(0, 0, 0, 0)
//     const end = new Date(selectedDate)
//     end.setHours(23, 59, 59, 999)
//     return { start, end }
//   }

//   const getResourceStatus = (resourceId: number) => {
//     if (!selectedDate) return 'Free'
//     const { start, end } = getSelectedDateBounds()
//     const isUnderMaintenance = activeMaintenance.some((m: any) => m.resource_id === resourceId)
//     if (isUnderMaintenance) return 'Maintenance'
//     const isBooked = activeBookings.some((b: any) => {
//       if (b.resource_id !== resourceId) return false
//       const bStart = new Date(b.start_datetime)
//       const bEnd = new Date(b.end_datetime)
//       return (bStart <= end && bEnd >= start && b.status !== 'Rejected' && b.status !== 'Cancelled')
//     })
//     if (isBooked) return 'Booked'
//     return 'Free'
//   }

//   const handleBookClick = (resource: any) => {
//     setSelectedResource(resource)
//     setShowModal(true)
//   }

//   const derivedStats = useMemo(() => {
//     let total = resources.length, free = 0, booked = 0, maintenance = 0
//     resources.forEach((r: any) => {
//       const s = getResourceStatus(r.resource_id)
//       if (s === 'Free') free++
//       if (s === 'Booked') booked++
//       if (s === 'Maintenance') maintenance++
//     })
//     return { total, free, booked, maintenance }
//   }, [resources, selectedDate, activeBookings, activeMaintenance])

//   const uniqueTypes: string[] = useMemo(() => {
//     const set = new Set<string>()
//     resources.forEach((r: any) => { if (r.resource_types?.type_name) set.add(r.resource_types.type_name) })
//     return ['All', ...Array.from(set).sort()]
//   }, [resources])

//   const filteredResources = resources.filter((r: any) => {
//     const matchSearch = r.resource_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       r.resource_types?.type_name?.toLowerCase().includes(searchTerm.toLowerCase())
//     const status = getResourceStatus(r.resource_id)
//     const matchStatus = statusFilter === 'All' || status === statusFilter
//     const matchType = typeFilter === 'All' || r.resource_types?.type_name === typeFilter
//     return matchSearch && matchStatus && matchType
//   })

//   return (
//     <>
//       <style>{styles}</style>
//       <div className="ud-root">

//         <div className="ud-page-title">Resource Availability</div>
//         <p className="ud-page-sub">See what's free, booked, or under maintenance on any given day.</p>

//         <div className="ud-stats">
//           <div className="ud-stat-pill total">
//             <i className="bi bi-collection-fill"></i>
//             <span className="num">{derivedStats.total}</span> Total
//           </div>
//           <div className="ud-stat-pill free">
//             <i className="bi bi-check-circle-fill"></i>
//             <span className="num">{derivedStats.free}</span> Free
//           </div>
//           <div className="ud-stat-pill booked">
//             <i className="bi bi-calendar-event-fill"></i>
//             <span className="num">{derivedStats.booked}</span> Booked
//           </div>
//           <div className="ud-stat-pill maint">
//             <i className="bi bi-tools"></i>
//             <span className="num">{derivedStats.maintenance}</span> Maintenance
//           </div>
//         </div>

//         <div className="ud-filters">
//           <div className="row g-3">
//             <div className="col-md-4 col-lg-3">
//               <label className="ud-filter-label">Date</label>
//               <input
//                 type="date"
//                 className="ud-input ud-date-input"
//                 value={selectedDate}
//                 onChange={(e) => setSelectedDate(e.target.value)}
//               />
//             </div>
//             <div className="col-md-8 col-lg-5">
//               <label className="ud-filter-label">Search</label>
//               <div className="ud-input-wrap">
//                 <i className="bi bi-search"></i>
//                 <input
//                   type="text"
//                   className="ud-input"
//                   placeholder="Name or type…"
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                 />
//               </div>
//             </div>
//             <div className="col-12"><div className="ud-divider"></div></div>
//             <div className="col-md-6">
//               <label className="ud-filter-label">Status</label>
//               <div className="ud-filter-row">
//                 {(['All', 'Free', 'Booked', 'Maintenance'] as const).map((s) => (
//                   <button key={s} className={`ud-chip ${statusFilter === s ? 'active-status' : ''}`} onClick={() => setStatusFilter(s)}>{s}</button>
//                 ))}
//               </div>
//             </div>
//             <div className="col-md-6">
//               <label className="ud-filter-label">Type</label>
//               <div className="ud-filter-row">
//                 {uniqueTypes.map((type) => (
//                   <button key={type} className={`ud-chip ${typeFilter === type ? 'active-type' : ''}`} onClick={() => setTypeFilter(type)}>{type}</button>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="row g-3">
//           {filteredResources.length === 0 ? (
//             <div className="col-12">
//               <div className="ud-empty">
//                 <i className="bi bi-inbox"></i>
//                 <h4>No resources match your filters</h4>
//               </div>
//             </div>
//           ) : (
//             filteredResources.map((resource: any) => {
//               const status = getResourceStatus(resource.resource_id)
//               const statusClass = status.toLowerCase()
//               const statusIcon = status === 'Free' ? 'bi-check-circle-fill' : status === 'Booked' ? 'bi-calendar-x-fill' : 'bi-tools'

//               return (
//                 <div key={resource.resource_id} className="col-md-6 col-lg-4">
//                   <div className="ud-card">
//                     <div className={`ud-status-badge ${statusClass}`}>
//                       <i className={`bi ${statusIcon}`}></i>
//                       {status}
//                     </div>
//                     <div className="ud-card-name">{resource.resource_name}</div>
//                     <div className="ud-card-type">
//                       <i className="bi bi-tag-fill"></i>
//                       {resource.resource_types?.type_name || 'No Type'}
//                     </div>
//                     <div className="ud-card-details">
//                       <div className="ud-card-detail"><i className="bi bi-building"></i><span>{resource.buildings?.building_name || 'N/A'}</span></div>
//                       {resource.facilities && <div className="ud-card-detail"><i className="bi bi-wrench"></i><span>{resource.facilities.facility_name}</span></div>}
//                       {resource.cupboards && <div className="ud-card-detail"><i className="bi bi-archive"></i><span>{resource.cupboards.cupboard_name}</span></div>}
//                       {resource.shelves && <div className="ud-card-detail"><i className="bi bi-layers"></i><span>{resource.shelves.shelf_name}</span></div>}
//                     </div>
//                     <button
//                       className={`ud-book-btn ${status === 'Free' ? 'can-book' : 'unavailable'}`}
//                       disabled={status !== 'Free'}
//                       onClick={() => handleBookClick(resource)}
//                     >
//                       {status === 'Free'
//                         ? <><i className="bi bi-calendar-plus"></i> Book Now</>
//                         : <><i className="bi bi-lock-fill"></i> Unavailable</>}
//                     </button>
//                   </div>
//                 </div>
//               )
//             })
//           )}
//         </div>

//         {showModal && selectedResource && (
//           <BookingActionModal
//             resource={selectedResource}
//             defaultDate={selectedDate}
//             onClose={() => setShowModal(false)}
//             onSuccess={() => { setShowModal(false); router.refresh() }}
//           />
//         )}
//       </div>
//     </>
//   )
// }




'use client'

import { useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import BookingActionModal from './BookingActionModal'

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

  .ud-root { font-family: 'Plus Jakarta Sans', sans-serif; color: #1a1d23; }

  .ud-page-title {
    font-size: 1.4rem; font-weight: 700; color: #111827;
    letter-spacing: -0.03em; margin: 0 0 0.2rem; line-height: 1.2;
  }
  
       .ud-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 0.5rem;
}

.ud-header-left {
  display: flex;
  flex-direction: column;
}

.ud-header-right {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

@media (max-width: 768px) {
  .ud-header {
    flex-direction: column;
  }
}


  .ud-page-sub { font-size: 0.875rem; color: #9ca3af; margin: 0 0 1.25rem; font-weight: 400; }

  .ud-stats { display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 1.75rem; }
  .ud-stat-pill {
    display: inline-flex; align-items: center; gap: 7px;
    padding: 0.4rem 0.9rem; border-radius: 50px;
    font-size: 0.8rem; font-weight: 600; border: 1px solid;
  }
  .ud-stat-pill .num { font-size: 0.9rem; font-weight: 800; }
  .ud-stat-pill.total  { background: #f9fafb; border-color: #e5e7eb; color: #6b7280; }
  .ud-stat-pill.free   { background: #f0fdf4; border-color: #bbf7d0; color: #16a34a; }
  .ud-stat-pill.booked { background: #fffbeb; border-color: #fde68a; color: #d97706; }
  .ud-stat-pill.maint  { background: #fef2f2; border-color: #fecaca; color: #dc2626; }

  .ud-filters {
    background: #fff; border: 1px solid #e8ecf0; border-radius: 14px;
    padding: 1.25rem 1.5rem; margin-bottom: 1.75rem;
    box-shadow: 0 1px 4px rgba(0,0,0,0.04);
  }
  .ud-filter-label {
    display: block; font-size: 0.7rem; font-weight: 700;
    text-transform: uppercase; letter-spacing: 0.08em; color: #9ca3af; margin-bottom: 0.5rem;
  }
  .ud-input {
    width: 100%; background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 9px;
    color: #111827; padding: 0.58rem 0.9rem 0.58rem 2.3rem;
    font-size: 0.875rem; font-family: 'Plus Jakarta Sans', sans-serif;
    outline: none; transition: all 0.18s;
  }
  .ud-input:focus { border-color: #93c5fd; background: #fff; box-shadow: 0 0 0 3px rgba(59,130,246,0.1); }
  .ud-input-wrap { position: relative; }
  .ud-input-wrap i {
    position: absolute; left: 0.82rem; top: 50%; transform: translateY(-50%);
    color: #9ca3af; font-size: 0.82rem; pointer-events: none;
  }
  .ud-date-input { padding-left: 0.9rem; }
  .ud-chip {
    background: #f3f4f6; border: 1px solid #e5e7eb; color: #6b7280;
    font-size: 0.78rem; font-weight: 600; font-family: 'Plus Jakarta Sans', sans-serif;
    padding: 0.3rem 0.85rem; border-radius: 50px; cursor: pointer; transition: all 0.15s;
  }
  .ud-chip:hover { background: #e5e7eb; color: #374151; }
  .ud-chip.active-status { background: #eff4ff; border-color: #bfdbfe; color: #2563eb; }
  .ud-chip.active-type   { background: #f5f3ff; border-color: #ddd6fe; color: #7c3aed; }
  .ud-filter-row { display: flex; flex-wrap: wrap; gap: 0.4rem; }
  .ud-divider { height: 1px; background: #f3f4f6; margin: 0.9rem 0; }

  /* ── Card — clean, only essential info ── */
  .ud-card {
    background: #fff; border: 1px solid #e8ecf0; border-radius: 14px;
    padding: 1.25rem; height: 100%; display: flex; flex-direction: column;
    transition: all 0.2s ease; box-shadow: 0 1px 4px rgba(0,0,0,0.04);
  }
  .ud-card:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 24px rgba(0,0,0,0.09);
    border-color: #d1d5db;
  }

  .ud-status-badge {
    display: inline-flex; align-items: center; gap: 5px;
    font-size: 0.7rem; font-weight: 700; text-transform: uppercase;
    letter-spacing: 0.06em; padding: 0.28rem 0.7rem; border-radius: 6px;
    border: 1px solid; width: fit-content;
  }
  .ud-status-badge.free        { background: #f0fdf4; border-color: #bbf7d0; color: #16a34a; }
  .ud-status-badge.booked      { background: #fffbeb; border-color: #fde68a; color: #d97706; }
  .ud-status-badge.maintenance { background: #fef2f2; border-color: #fecaca; color: #dc2626; }

  .ud-card-name {
    font-size: 1rem; font-weight: 700; color: #111827;
    margin: 0.8rem 0 0.5rem; letter-spacing: -0.01em;
  }

  /* Two-column meta grid on the card */
  .ud-card-meta {
    display: grid; grid-template-columns: 1fr 1fr;
    gap: 0.4rem 0.6rem; margin-bottom: 1rem; flex: 1;
  }
  .ud-meta-item {
    display: flex; align-items: center; gap: 6px;
    font-size: 0.78rem; color: #6b7280; font-weight: 500;
  }
  .ud-meta-item i { font-size: 0.75rem; color: #9ca3af; flex-shrink: 0; }
  .ud-meta-item span { white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }

  .ud-book-btn {
    width: 100%; border: none; border-radius: 9px; padding: 0.6rem;
    font-size: 0.855rem; font-weight: 700; font-family: 'Plus Jakarta Sans', sans-serif;
    cursor: pointer; transition: all 0.18s;
    display: flex; align-items: center; justify-content: center; gap: 6px;
  }
  .ud-book-btn.can-book { background: #0d6efd; color: #fff; }
  .ud-book-btn.can-book:hover { background: #0b5ed7; transform: translateY(-1px); box-shadow: 0 4px 14px rgba(13,110,253,0.3); }
  .ud-book-btn.unavailable { background: #f3f4f6; color: #9ca3af; cursor: not-allowed; border: 1px solid #e5e7eb; }

  .ud-empty { text-align: center; padding: 5rem 2rem; color: #9ca3af; }
  .ud-empty i { font-size: 2.5rem; display: block; margin-bottom: 1rem; color: #d1d5db; }
  .ud-empty h4 { font-size: 1.1rem; color: #6b7280; font-weight: 600; }
`

export default function UserDashboardClient({ resources, activeBookings, activeMaintenance }: any) {
  const router = useRouter()

  const [selectedDate, setSelectedDate] = useState(() => {
    const today = new Date()
    return today.toISOString().split('T')[0]
  })
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<'All' | 'Free' | 'Booked' | 'Maintenance'>('All')
  const [typeFilter, setTypeFilter] = useState<string>('All')
  const [showModal, setShowModal] = useState(false)
  const [selectedResource, setSelectedResource] = useState<any>(null)

  const getSelectedDateBounds = () => {
    const start = new Date(selectedDate); start.setHours(0, 0, 0, 0)
    const end = new Date(selectedDate); end.setHours(23, 59, 59, 999)
    return { start, end }
  }

  const getResourceStatus = (resourceId: number) => {
    if (!selectedDate) return 'Free'
    const { start, end } = getSelectedDateBounds()
    const isUnderMaintenance = activeMaintenance.some((m: any) => m.resource_id === resourceId)
    if (isUnderMaintenance) return 'Maintenance'
    const isBooked = activeBookings.some((b: any) => {
      if (b.resource_id !== resourceId) return false
      const bStart = new Date(b.start_datetime)
      const bEnd = new Date(b.end_datetime)
      return (bStart <= end && bEnd >= start && b.status !== 'Rejected' && b.status !== 'Cancelled')
    })
    return isBooked ? 'Booked' : 'Free'
  }

  const handleBookClick = (resource: any) => { setSelectedResource(resource); setShowModal(true) }

  const derivedStats = useMemo(() => {
    let total = resources.length, free = 0, booked = 0, maintenance = 0
    resources.forEach((r: any) => {
      const s = getResourceStatus(r.resource_id)
      if (s === 'Free') free++
      if (s === 'Booked') booked++
      if (s === 'Maintenance') maintenance++
    })
    return { total, free, booked, maintenance }
  }, [resources, selectedDate, activeBookings, activeMaintenance])

  const uniqueTypes: string[] = useMemo(() => {
    const set = new Set<string>()
    resources.forEach((r: any) => { if (r.resource_types?.type_name) set.add(r.resource_types.type_name) })
    return ['All', ...Array.from(set).sort()]
  }, [resources])

  const filteredResources = resources.filter((r: any) => {
    const matchSearch =
      r.resource_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.resource_types?.type_name?.toLowerCase().includes(searchTerm.toLowerCase())
    const status = getResourceStatus(r.resource_id)
    const matchStatus = statusFilter === 'All' || status === statusFilter
    const matchType = typeFilter === 'All' || r.resource_types?.type_name === typeFilter
    return matchSearch && matchStatus && matchType
  })

  return (
    <>
      <style>{styles}</style>
      <div className="ud-root">

        {/* <div className="ud-page-title">Resource Availability</div>
        <p className="ud-page-sub">See what's free, booked, or under maintenance on any given day.</p>

        <div className="ud-stats">
          <div className="ud-stat-pill total"><i className="bi bi-collection-fill"></i><span className="num">{derivedStats.total}</span> Total</div>
          <div className="ud-stat-pill free"><i className="bi bi-check-circle-fill"></i><span className="num">{derivedStats.free}</span> Free</div>
          <div className="ud-stat-pill booked"><i className="bi bi-calendar-event-fill"></i><span className="num">{derivedStats.booked}</span> Booked</div>
          <div className="ud-stat-pill maint"><i className="bi bi-tools"></i><span className="num">{derivedStats.maintenance}</span> Maintenance</div>
        </div> */}

        <div className="ud-header">

          {/* LEFT SIDE */}
          <div className="ud-header-left">
            <div className="ud-page-title">Resource Availability</div>
            <p className="ud-page-sub">
              See what's free, booked, or under maintenance on any given day.
            </p>
          </div>

          {/* RIGHT SIDE (STATS) */}
          <div className="ud-header-right">
            <div className="ud-stat-pill total">
              <i className="bi bi-collection-fill"></i>
              <span className="num">{derivedStats.total}</span> Total
            </div>

            <div className="ud-stat-pill free">
              <i className="bi bi-check-circle-fill"></i>
              <span className="num">{derivedStats.free}</span> Free
            </div>

            <div className="ud-stat-pill booked">
              <i className="bi bi-calendar-event-fill"></i>
              <span className="num">{derivedStats.booked}</span> Booked
            </div>

            <div className="ud-stat-pill maint">
              <i className="bi bi-tools"></i>
              <span className="num">{derivedStats.maintenance}</span> Maintenance
            </div>
          </div>

        </div>

        {/* Filters */}
        <div className="ud-filters">
          <div className="row g-3">
            <div className="col-md-4 col-lg-3">
              <label className="ud-filter-label">Date</label>
              <input type="date" className="ud-input ud-date-input" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} />
            </div>
            <div className="col-md-8 col-lg-5">
              <label className="ud-filter-label">Search</label>
              <div className="ud-input-wrap">
                <i className="bi bi-search"></i>
                <input type="text" className="ud-input" placeholder="Name or type…" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
              </div>
            </div>
            <div className="col-12"><div className="ud-divider"></div></div>
            <div className="col-md-6">
              <label className="ud-filter-label">Status</label>
              <div className="ud-filter-row">
                {(['All', 'Free', 'Booked', 'Maintenance'] as const).map((s) => (
                  <button key={s} className={`ud-chip ${statusFilter === s ? 'active-status' : ''}`} onClick={() => setStatusFilter(s)}>{s}</button>
                ))}
              </div>
            </div>
            <div className="col-md-6">
              <label className="ud-filter-label">Type</label>
              <div className="ud-filter-row">
                {uniqueTypes.map((type) => (
                  <button key={type} className={`ud-chip ${typeFilter === type ? 'active-type' : ''}`} onClick={() => setTypeFilter(type)}>{type}</button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Resource Grid */}
        <div className="row g-3">
          {filteredResources.length === 0 ? (
            <div className="col-12">
              <div className="ud-empty">
                <i className="bi bi-inbox"></i>
                <h4>No resources match your filters</h4>
              </div>
            </div>
          ) : (
            filteredResources.map((resource: any) => {
              const status = getResourceStatus(resource.resource_id)
              const statusClass = status.toLowerCase()
              const statusIcon = status === 'Free' ? 'bi-check-circle-fill' : status === 'Booked' ? 'bi-calendar-x-fill' : 'bi-tools'

              return (
                <div key={resource.resource_id} className="col-md-6 col-lg-4">
                  <div className="ud-card">
                    <div className={`ud-status-badge ${statusClass}`}>
                      <i className={`bi ${statusIcon}`}></i>
                      {status}
                    </div>

                    <div className="ud-card-name">{resource.resource_name}</div>

                    {/* Card shows ONLY: type, building, floor — clean & simple */}
                    <div className="ud-card-meta">
                      <div className="ud-meta-item">
                        <i className="bi bi-tag-fill"></i>
                        <span>{resource.resource_types?.type_name || 'No Type'}</span>
                      </div>
                      <div className="ud-meta-item">
                        <i className="bi bi-building"></i>
                        <span>{resource.buildings?.building_name || 'N/A'}</span>
                      </div>
                      {resource.floor_number != null && (
                        <div className="ud-meta-item">
                          <i className="bi bi-layers"></i>
                          <span>Floor {resource.floor_number}</span>
                        </div>
                      )}
                      {resource.facilities?.length > 0 && (
                        <div className="ud-meta-item">
                          <i className="bi bi-wrench"></i>
                          <span>
                            {resource.facilities
                              .map((f: any) => f.facility_name)
                              .join(', ')}
                          </span>
                        </div>
                      )}
                      {resource.cupboards?.length > 0 && (
                        <div className="ud-meta-item">
                          <i className="bi bi-archive"></i>
                          <span>
                            {resource.cupboards
                              .map((c: any) => c.cupboard_name)
                              .join(', ')}
                          </span>
                        </div>
                      )}
                      {resource.cupboards?.some((c: any) => c.shelves?.length) && (
                        <div className="ud-meta-item">
                          <i className="bi bi-layers"></i>
                          <span>
                            {resource.cupboards
                              .flatMap((c: any) => c.shelves)
                              .map((s: any) => `Shelf ${s.shelf_number}`)
                              .join(', ')}
                          </span>
                        </div>
                      )}
                    </div>

                    <button
                      className={`ud-book-btn ${status === 'Free' ? 'can-book' : 'unavailable'}`}
                      disabled={status !== 'Free'}
                      onClick={() => handleBookClick(resource)}
                    >
                      {status === 'Free'
                        ? <><i className="bi bi-calendar-plus"></i> Book Now</>
                        : <><i className="bi bi-lock-fill"></i> Unavailable</>}
                    </button>
                  </div>
                </div>
              )
            })
          )}
        </div>

        {showModal && selectedResource && (
          <BookingActionModal
            resource={selectedResource}
            defaultDate={selectedDate}
            onClose={() => setShowModal(false)}
            onSuccess={() => { setShowModal(false); router.refresh() }}
          />
        )}
      </div>
    </>
  )
}




// 'use client'

// import { useMemo, useState } from 'react'
// import { useRouter } from 'next/navigation'
// import BookingActionModal from './BookingActionModal'

// const styles = `
//   @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

//   .ud-root { font-family: 'Plus Jakarta Sans', sans-serif; color: #1a1d23; }

//   .ud-page-title {
//     font-size: 1.6rem; font-weight: 800; color: #111827;
//     letter-spacing: -0.03em; margin: 0 0 0.2rem; line-height: 1.2;
//   }
//   .ud-page-sub { font-size: 0.875rem; color: #9ca3af; margin: 0 0 1.25rem; font-weight: 400; }

//   .ud-stats { display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 1.75rem; }
//   .ud-stat-pill {
//     display: inline-flex; align-items: center; gap: 7px;
//     padding: 0.4rem 0.9rem; border-radius: 50px;
//     font-size: 0.8rem; font-weight: 600; border: 1px solid;
//   }
//   .ud-stat-pill .num { font-size: 0.9rem; font-weight: 800; }
//   .ud-stat-pill.total  { background: #f9fafb; border-color: #e5e7eb; color: #6b7280; }
//   .ud-stat-pill.free   { background: #f0fdf4; border-color: #bbf7d0; color: #16a34a; }
//   .ud-stat-pill.booked { background: #fffbeb; border-color: #fde68a; color: #d97706; }
//   .ud-stat-pill.maint  { background: #fef2f2; border-color: #fecaca; color: #dc2626; }

//   .ud-filters {
//     background: #fff; border: 1px solid #e8ecf0; border-radius: 14px;
//     padding: 1.25rem 1.5rem; margin-bottom: 1.75rem;
//     box-shadow: 0 1px 4px rgba(0,0,0,0.04);
//   }
//   .ud-filter-label {
//     display: block; font-size: 0.7rem; font-weight: 700;
//     text-transform: uppercase; letter-spacing: 0.08em; color: #9ca3af; margin-bottom: 0.5rem;
//   }
//   .ud-input {
//     width: 100%; background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 9px;
//     color: #111827; padding: 0.58rem 0.9rem 0.58rem 2.3rem;
//     font-size: 0.875rem; font-family: 'Plus Jakarta Sans', sans-serif;
//     outline: none; transition: all 0.18s;
//   }
//   .ud-input:focus { border-color: #93c5fd; background: #fff; box-shadow: 0 0 0 3px rgba(59,130,246,0.1); }
//   .ud-input-wrap { position: relative; }
//   .ud-input-wrap i {
//     position: absolute; left: 0.82rem; top: 50%; transform: translateY(-50%);
//     color: #9ca3af; font-size: 0.82rem; pointer-events: none;
//   }
//   .ud-date-input { padding-left: 0.9rem; }
//   .ud-chip {
//     background: #f3f4f6; border: 1px solid #e5e7eb; color: #6b7280;
//     font-size: 0.78rem; font-weight: 600; font-family: 'Plus Jakarta Sans', sans-serif;
//     padding: 0.3rem 0.85rem; border-radius: 50px; cursor: pointer; transition: all 0.15s;
//   }
//   .ud-chip:hover { background: #e5e7eb; color: #374151; }
//   .ud-chip.active-status { background: #eff4ff; border-color: #bfdbfe; color: #2563eb; }
//   .ud-chip.active-type   { background: #f5f3ff; border-color: #ddd6fe; color: #7c3aed; }
//   .ud-filter-row { display: flex; flex-wrap: wrap; gap: 0.4rem; }
//   .ud-divider { height: 1px; background: #f3f4f6; margin: 0.9rem 0; }

//   /* ── Card ── */
//   .ud-card {
//     background: #fff; border: 1px solid #e8ecf0; border-radius: 14px;
//     padding: 1.25rem; height: 100%; display: flex; flex-direction: column;
//     transition: all 0.2s ease; box-shadow: 0 1px 4px rgba(0,0,0,0.04);
//   }
//   .ud-card:hover {
//     transform: translateY(-3px);
//     box-shadow: 0 8px 24px rgba(0,0,0,0.09);
//     border-color: #d1d5db;
//   }

//   .ud-status-badge {
//     display: inline-flex; align-items: center; gap: 5px;
//     font-size: 0.7rem; font-weight: 700; text-transform: uppercase;
//     letter-spacing: 0.06em; padding: 0.28rem 0.7rem; border-radius: 6px;
//     border: 1px solid; width: fit-content;
//   }
//   .ud-status-badge.free        { background: #f0fdf4; border-color: #bbf7d0; color: #16a34a; }
//   .ud-status-badge.booked      { background: #fffbeb; border-color: #fde68a; color: #d97706; }
//   .ud-status-badge.maintenance { background: #fef2f2; border-color: #fecaca; color: #dc2626; }

//   .ud-card-name {
//     font-size: 1rem; font-weight: 700; color: #111827;
//     margin: 0.8rem 0 0.7rem; letter-spacing: -0.01em;
//   }

//   /* Card meta rows */
//   .ud-card-meta { display: flex; flex-direction: column; gap: 0.38rem; margin-bottom: 1rem; flex: 1; }

//   .ud-meta-row {
//     display: flex; align-items: center; gap: 8px;
//     font-size: 0.8rem; color: #6b7280; font-weight: 500;
//   }
//   .ud-meta-row i { font-size: 0.78rem; color: #9ca3af; flex-shrink: 0; width: 14px; text-align: center; }

//   /* Facility badge — stands out on card */
//   .ud-facility-badge {
//     display: inline-flex; align-items: center; gap: 5px;
//     background: #fffbeb; border: 1px solid #fde68a;
//     color: #d97706; font-size: 0.75rem; font-weight: 600;
//     padding: 0.22rem 0.65rem; border-radius: 6px; margin-top: 0.2rem;
//   }
//   .ud-facility-badge i { font-size: 0.72rem; }

//   .ud-book-btn {
//     width: 100%; border: none; border-radius: 9px; padding: 0.6rem;
//     font-size: 0.855rem; font-weight: 700; font-family: 'Plus Jakarta Sans', sans-serif;
//     cursor: pointer; transition: all 0.18s;
//     display: flex; align-items: center; justify-content: center; gap: 6px;
//   }
//   .ud-book-btn.can-book { background: #0d6efd; color: #fff; }
//   .ud-book-btn.can-book:hover { background: #0b5ed7; transform: translateY(-1px); box-shadow: 0 4px 14px rgba(13,110,253,0.3); }
//   .ud-book-btn.unavailable { background: #f3f4f6; color: #9ca3af; cursor: not-allowed; border: 1px solid #e5e7eb; }

//   .ud-empty { text-align: center; padding: 5rem 2rem; color: #9ca3af; }
//   .ud-empty i { font-size: 2.5rem; display: block; margin-bottom: 1rem; color: #d1d5db; }
//   .ud-empty h4 { font-size: 1.1rem; color: #6b7280; font-weight: 600; }
// `

// export default function UserDashboardClient({ resources, activeBookings, activeMaintenance }: any) {
//   const router = useRouter()

//   const [selectedDate, setSelectedDate] = useState(() => {
//     const today = new Date()
//     return today.toISOString().split('T')[0]
//   })
//   const [searchTerm, setSearchTerm] = useState('')
//   const [statusFilter, setStatusFilter] = useState<'All' | 'Free' | 'Booked' | 'Maintenance'>('All')
//   const [typeFilter, setTypeFilter] = useState<string>('All')
//   const [showModal, setShowModal] = useState(false)
//   const [selectedResource, setSelectedResource] = useState<any>(null)

//   const getSelectedDateBounds = () => {
//     const start = new Date(selectedDate); start.setHours(0, 0, 0, 0)
//     const end   = new Date(selectedDate); end.setHours(23, 59, 59, 999)
//     return { start, end }
//   }

//   const getResourceStatus = (resourceId: number) => {
//     if (!selectedDate) return 'Free'
//     const { start, end } = getSelectedDateBounds()
//     const isUnderMaintenance = activeMaintenance.some((m: any) => m.resource_id === resourceId)
//     if (isUnderMaintenance) return 'Maintenance'
//     const isBooked = activeBookings.some((b: any) => {
//       if (b.resource_id !== resourceId) return false
//       const bStart = new Date(b.start_datetime)
//       const bEnd   = new Date(b.end_datetime)
//       return bStart <= end && bEnd >= start && b.status !== 'Rejected' && b.status !== 'Cancelled'
//     })
//     return isBooked ? 'Booked' : 'Free'
//   }

//   const handleBookClick = (resource: any) => { setSelectedResource(resource); setShowModal(true) }

//   const derivedStats = useMemo(() => {
//     let total = resources.length, free = 0, booked = 0, maintenance = 0
//     resources.forEach((r: any) => {
//       const s = getResourceStatus(r.resource_id)
//       if (s === 'Free') free++
//       if (s === 'Booked') booked++
//       if (s === 'Maintenance') maintenance++
//     })
//     return { total, free, booked, maintenance }
//   }, [resources, selectedDate, activeBookings, activeMaintenance])

//   const uniqueTypes: string[] = useMemo(() => {
//     const set = new Set<string>()
//     resources.forEach((r: any) => { if (r.resource_types?.type_name) set.add(r.resource_types.type_name) })
//     return ['All', ...Array.from(set).sort()]
//   }, [resources])

//   const filteredResources = resources.filter((r: any) => {
//     const matchSearch =
//       r.resource_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       r.resource_types?.type_name?.toLowerCase().includes(searchTerm.toLowerCase())
//     const status = getResourceStatus(r.resource_id)
//     const matchStatus = statusFilter === 'All' || status === statusFilter
//     const matchType   = typeFilter === 'All' || r.resource_types?.type_name === typeFilter
//     return matchSearch && matchStatus && matchType
//   })

//   return (
//     <>
//       <style>{styles}</style>
//       <div className="ud-root">

//         <div className="ud-page-title">Resource Availability</div>
//         <p className="ud-page-sub">See what's free, booked, or under maintenance on any given day.</p>

//         {/* Stats */}
//         <div className="ud-stats">
//           <div className="ud-stat-pill total"><i className="bi bi-collection-fill"></i><span className="num">{derivedStats.total}</span> Total</div>
//           <div className="ud-stat-pill free"><i className="bi bi-check-circle-fill"></i><span className="num">{derivedStats.free}</span> Free</div>
//           <div className="ud-stat-pill booked"><i className="bi bi-calendar-event-fill"></i><span className="num">{derivedStats.booked}</span> Booked</div>
//           <div className="ud-stat-pill maint"><i className="bi bi-tools"></i><span className="num">{derivedStats.maintenance}</span> Maintenance</div>
//         </div>

//         {/* Filters */}
//         <div className="ud-filters">
//           <div className="row g-3">
//             <div className="col-md-4 col-lg-3">
//               <label className="ud-filter-label">Date</label>
//               <input type="date" className="ud-input ud-date-input" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} />
//             </div>
//             <div className="col-md-8 col-lg-5">
//               <label className="ud-filter-label">Search</label>
//               <div className="ud-input-wrap">
//                 <i className="bi bi-search"></i>
//                 <input type="text" className="ud-input" placeholder="Name or type…" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
//               </div>
//             </div>
//             <div className="col-12"><div className="ud-divider"></div></div>
//             <div className="col-md-6">
//               <label className="ud-filter-label">Status</label>
//               <div className="ud-filter-row">
//                 {(['All', 'Free', 'Booked', 'Maintenance'] as const).map((s) => (
//                   <button key={s} className={`ud-chip ${statusFilter === s ? 'active-status' : ''}`} onClick={() => setStatusFilter(s)}>{s}</button>
//                 ))}
//               </div>
//             </div>
//             <div className="col-md-6">
//               <label className="ud-filter-label">Type</label>
//               <div className="ud-filter-row">
//                 {uniqueTypes.map((type) => (
//                   <button key={type} className={`ud-chip ${typeFilter === type ? 'active-type' : ''}`} onClick={() => setTypeFilter(type)}>{type}</button>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Resource Grid */}
//         <div className="row g-3">
//           {filteredResources.length === 0 ? (
//             <div className="col-12">
//               <div className="ud-empty">
//                 <i className="bi bi-inbox"></i>
//                 <h4>No resources match your filters</h4>
//               </div>
//             </div>
//           ) : (
//             filteredResources.map((resource: any) => {
//               const status = getResourceStatus(resource.resource_id)
//               const statusClass = status.toLowerCase()
//               const statusIcon = status === 'Free' ? 'bi-check-circle-fill' : status === 'Booked' ? 'bi-calendar-x-fill' : 'bi-tools'

//               return (
//                 <div key={resource.resource_id} className="col-md-6 col-lg-4">
//                   <div className="ud-card">

//                     <div className={`ud-status-badge ${statusClass}`}>
//                       <i className={`bi ${statusIcon}`}></i>
//                       {status}
//                     </div>

//                     <div className="ud-card-name">{resource.resource_name}</div>

//                     {/* Card meta: Type · Building · Floor · Facilities */}
//                     <div className="ud-card-meta">
//                       <div className="ud-meta-row">
//                         <i className="bi bi-tag-fill"></i>
//                         <span>{resource.resource_types?.type_name || 'No Type'}</span>
//                       </div>
//                       <div className="ud-meta-row">
//                         <i className="bi bi-building"></i>
//                         <span>{resource.buildings?.building_name || 'N/A'}</span>
//                       </div>
//                       {resource.floor_number != null && (
//                         <div className="ud-meta-row">
//                           <i className="bi bi-layers"></i>
//                           <span>Floor {resource.floor_number}</span>
//                         </div>
//                       )}
//                       {/* Facilities shown as a highlighted badge on the card */}
//                       {resource.facilities?.facility_name && (
//                         <div className="ud-meta-row" style={{ marginTop: '0.15rem' }}>
//                           <span className="ud-facility-badge">
//                             <i className="bi bi-wrench-adjustable"></i>
//                             {resource.facilities.facility_name}
//                           </span>
//                         </div>
//                       )}
//                     </div>

//                     <button
//                       className={`ud-book-btn ${status === 'Free' ? 'can-book' : 'unavailable'}`}
//                       disabled={status !== 'Free'}
//                       onClick={() => handleBookClick(resource)}
//                     >
//                       {status === 'Free'
//                         ? <><i className="bi bi-calendar-plus"></i> Book Now</>
//                         : <><i className="bi bi-lock-fill"></i> Unavailable</>}
//                     </button>
//                   </div>
//                 </div>
//               )
//             })
//           )}
//         </div>

//         {showModal && selectedResource && (
//           <BookingActionModal
//             resource={selectedResource}
//             defaultDate={selectedDate}
//             onClose={() => setShowModal(false)}
//             onSuccess={() => { setShowModal(false); router.refresh() }}
//           />
//         )}
//       </div>
//     </>
//   )
// }

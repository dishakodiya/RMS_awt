// 'use client'

// export default function MyBookingsClient({ initialBookings }: { initialBookings: any[] }) {
//    if (initialBookings.length === 0) {
//       return (
//          <div className="text-center py-5">
//             <h3 className="text-muted">You have no bookings yet.</h3>
//             <p className="text-muted mb-4">Go to the dashboard to find a resource to book.</p>
//             <a href="/user-dashboard" className="btn btn-primary rounded-pill px-4 py-2 fw-semibold">
//                Book a Resource
//             </a>
//          </div>
//       )
//    }

//    return (
//        <div>
//          <h2 className="mb-4 text-dark fw-bold">My Bookings</h2>
//          <div className="row g-4">
//              {initialBookings.map((b: any) => {
//                  let statusBadge = "bg-warning text-dark"
//                  if (b.status === 'Approved') statusBadge = "bg-success"
//                  if (b.status === 'Rejected' || b.status === 'Cancelled') statusBadge = "bg-danger"

//                  const start = new Date(b.start_datetime).toLocaleString()
//                  const end = new Date(b.end_datetime).toLocaleString()

//                  return (
//                     <div key={b.booking_id} className="col-12 col-md-6 col-lg-4">
//                        <div className="card h-100 border-0 shadow-sm hover-shadow transition-all">
//                           <div className="card-body p-4">
//                                <div className="d-flex justify-content-between align-items-center mb-3">
//                                    <div className={`badge ${statusBadge} rounded-pill px-3 py-2 fw-semibold shadow-sm`}>
//                                       {b.status}
//                                    </div>
//                                </div>

//                                <h5 className="card-title fw-bold text-dark mb-1">
//                                    {b.resources.resource_name}
//                                </h5>
//                                <p className="text-secondary small mb-3">
//                                   <i className="bi bi-tag-fill me-1 text-muted"></i> 
//                                   {b.resources.resource_types?.type_name || 'Resource'} | 
//                                   <i className="bi bi-geo-alt-fill mx-1 text-muted"></i>
//                                   {b.resources.buildings?.building_name || 'Unknown'}
//                                </p>

//                                <div className="bg-light p-3 rounded-3 mb-3">
//                                    <div className="d-flex align-items-start gap-2 mb-2 small">
//                                       <i className="bi bi-clock-history text-primary mt-1"></i>
//                                       <div>
//                                          <div className="text-muted fw-semibold">Start:</div>
//                                          <div className="fw-medium">{start}</div>
//                                       </div>
//                                    </div>
//                                     <div className="d-flex align-items-start gap-2 small">
//                                       <i className="bi bi-clock text-danger mt-1"></i>
//                                       <div>
//                                          <div className="text-muted fw-semibold">End:</div>
//                                          <div className="fw-medium">{end}</div>
//                                       </div>
//                                    </div>
//                                </div>

//                                {b.users_bookings_approver_idTousers && (
//                                    <div className="text-muted small">
//                                       <i className="bi bi-person-check me-1"></i>
//                                       Reviewed by: {b.users_bookings_approver_idTousers.name}
//                                    </div>
//                                )}
//                           </div>
//                        </div>
//                     </div>
//                  )
//              })}
//          </div>
//        </div>
//    )
// }


// 'use client'

// const styles = `
//   @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@300;400;500&display=swap');

//   .mb-root { font-family: 'DM Sans', sans-serif; color: #fff; }

//   .mb-empty-wrap {
//     text-align: center;
//     padding: 5rem 2rem;
//   }

//   .mb-empty-icon {
//     width: 80px;
//     height: 80px;
//     background: rgba(255,185,60,0.08);
//     border: 1px solid rgba(255,185,60,0.15);
//     border-radius: 24px;
//     display: inline-flex;
//     align-items: center;
//     justify-content: center;
//     font-size: 2rem;
//     color: #ffb93c;
//     margin-bottom: 1.5rem;
//   }

//   .mb-empty-title {
//     font-family: 'Syne', sans-serif;
//     font-size: 1.6rem;
//     font-weight: 700;
//     color: #fff;
//     margin-bottom: 0.5rem;
//   }

//   .mb-empty-sub {
//     color: rgba(255,255,255,0.4);
//     font-size: 0.95rem;
//     margin-bottom: 2rem;
//   }

//   .mb-cta-btn {
//     display: inline-flex;
//     align-items: center;
//     gap: 8px;
//     background: linear-gradient(135deg, #ffb93c, #ff7b00);
//     color: #000;
//     font-weight: 600;
//     font-size: 0.9rem;
//     padding: 0.7rem 1.8rem;
//     border-radius: 10px;
//     text-decoration: none;
//     transition: all 0.2s ease;
//     box-shadow: 0 4px 20px rgba(255,185,60,0.3);
//   }

//   .mb-cta-btn:hover {
//     transform: translateY(-2px);
//     box-shadow: 0 8px 28px rgba(255,185,60,0.4);
//     color: #000;
//   }

//   .mb-page-title {
//     font-family: 'Syne', sans-serif;
//     font-size: 1.8rem;
//     font-weight: 800;
//     color: #fff;
//     margin-bottom: 0.25rem;
//     letter-spacing: -0.03em;
//   }

//   .mb-page-sub {
//     color: rgba(255,255,255,0.4);
//     font-size: 0.88rem;
//     margin-bottom: 2rem;
//   }

//   .mb-card {
//     background: rgba(255,255,255,0.03);
//     border: 1px solid rgba(255,255,255,0.07);
//     border-radius: 16px;
//     padding: 1.5rem;
//     transition: all 0.25s ease;
//     height: 100%;
//     position: relative;
//     overflow: hidden;
//   }

//   .mb-card::before {
//     content: '';
//     position: absolute;
//     top: 0; left: 0; right: 0;
//     height: 2px;
//     border-radius: 16px 16px 0 0;
//     opacity: 0;
//     transition: opacity 0.25s ease;
//   }

//   .mb-card:hover {
//     background: rgba(255,255,255,0.05);
//     border-color: rgba(255,255,255,0.12);
//     transform: translateY(-3px);
//     box-shadow: 0 16px 40px rgba(0,0,0,0.4);
//   }

//   .mb-card:hover::before { opacity: 1; }
//   .mb-card.status-approved::before { background: linear-gradient(90deg, #22c55e, transparent); }
//   .mb-card.status-pending::before { background: linear-gradient(90deg, #ffb93c, transparent); }
//   .mb-card.status-rejected::before { background: linear-gradient(90deg, #ef4444, transparent); }

//   .mb-badge {
//     display: inline-flex;
//     align-items: center;
//     gap: 5px;
//     font-size: 0.72rem;
//     font-weight: 600;
//     text-transform: uppercase;
//     letter-spacing: 0.06em;
//     padding: 0.3rem 0.75rem;
//     border-radius: 6px;
//   }

//   .mb-badge.approved {
//     background: rgba(34, 197, 94, 0.12);
//     color: #4ade80;
//     border: 1px solid rgba(34, 197, 94, 0.2);
//   }

//   .mb-badge.pending {
//     background: rgba(255, 185, 60, 0.1);
//     color: #ffb93c;
//     border: 1px solid rgba(255, 185, 60, 0.2);
//   }

//   .mb-badge.rejected {
//     background: rgba(239, 68, 68, 0.1);
//     color: #f87171;
//     border: 1px solid rgba(239, 68, 68, 0.2);
//   }

//   .mb-resource-name {
//     font-family: 'Syne', sans-serif;
//     font-size: 1.1rem;
//     font-weight: 700;
//     color: #fff;
//     margin: 0.85rem 0 0.25rem;
//   }

//   .mb-resource-meta {
//     font-size: 0.8rem;
//     color: rgba(255,255,255,0.4);
//     display: flex;
//     align-items: center;
//     gap: 4px;
//     margin-bottom: 1rem;
//     flex-wrap: wrap;
//   }

//   .mb-resource-meta .sep {
//     opacity: 0.3;
//   }

//   .mb-time-block {
//     background: rgba(0,0,0,0.25);
//     border: 1px solid rgba(255,255,255,0.06);
//     border-radius: 10px;
//     padding: 0.85rem 1rem;
//     margin-bottom: 1rem;
//   }

//   .mb-time-row {
//     display: flex;
//     align-items: flex-start;
//     gap: 10px;
//     font-size: 0.82rem;
//   }

//   .mb-time-row + .mb-time-row {
//     margin-top: 0.6rem;
//     padding-top: 0.6rem;
//     border-top: 1px solid rgba(255,255,255,0.05);
//   }

//   .mb-time-label {
//     color: rgba(255,255,255,0.35);
//     font-size: 0.72rem;
//     text-transform: uppercase;
//     letter-spacing: 0.05em;
//     font-weight: 600;
//   }

//   .mb-time-value {
//     color: rgba(255,255,255,0.85);
//     font-weight: 500;
//   }

//   .mb-time-icon {
//     margin-top: 1px;
//     flex-shrink: 0;
//     font-size: 0.85rem;
//   }

//   .mb-reviewer {
//     font-size: 0.78rem;
//     color: rgba(255,255,255,0.3);
//     display: flex;
//     align-items: center;
//     gap: 6px;
//     border-top: 1px solid rgba(255,255,255,0.05);
//     padding-top: 0.75rem;
//     margin-top: 0.25rem;
//   }
// `

// export default function MyBookingsClient({ initialBookings }: { initialBookings: any[] }) {
//   if (initialBookings.length === 0) {
//     return (
//       <>
//         <style>{styles}</style>
//         <div className="mb-root">
//           <div className="mb-empty-wrap">
//             <div className="mb-empty-icon">
//               <i className="bi bi-calendar-x"></i>
//             </div>
//             <div className="mb-empty-title">No bookings yet</div>
//             <p className="mb-empty-sub">Head to the dashboard to find and reserve a resource.</p>
//             <a href="/user-dashboard" className="mb-cta-btn">
//               <i className="bi bi-grid-1x2"></i>
//               Browse Resources
//             </a>
//           </div>
//         </div>
//       </>
//     )
//   }

//   return (
//     <>
//       <style>{styles}</style>
//       <div className="mb-root">
//         <div className="mb-page-title">My Bookings</div>
//         <p className="mb-page-sub">{initialBookings.length} booking{initialBookings.length !== 1 ? 's' : ''} found</p>

//         <div className="row g-3">
//           {initialBookings.map((b: any) => {
//             const statusKey =
//               b.status === 'Approved' ? 'approved' :
//               b.status === 'Rejected' || b.status === 'Cancelled' ? 'rejected' : 'pending'

//             const statusIcon =
//               statusKey === 'approved' ? 'bi-check-circle-fill' :
//               statusKey === 'rejected' ? 'bi-x-circle-fill' : 'bi-clock-fill'

//             const start = new Date(b.start_datetime).toLocaleString()
//             const end = new Date(b.end_datetime).toLocaleString()

//             return (
//               <div key={b.booking_id} className="col-12 col-md-6 col-xl-4">
//                 <div className={`mb-card status-${statusKey}`}>
//                   <span className={`mb-badge ${statusKey}`}>
//                     <i className={`bi ${statusIcon}`}></i>
//                     {b.status || 'Pending'}
//                   </span>

//                   <div className="mb-resource-name">{b.resources.resource_name}</div>
//                   <div className="mb-resource-meta">
//                     <i className="bi bi-tag-fill"></i>
//                     {b.resources.resource_types?.type_name || 'Resource'}
//                     <span className="sep">·</span>
//                     <i className="bi bi-geo-alt-fill"></i>
//                     {b.resources.buildings?.building_name || 'Unknown location'}
//                   </div>

//                   <div className="mb-time-block">
//                     <div className="mb-time-row">
//                       <i className="bi bi-play-circle mb-time-icon" style={{ color: '#4ade80' }}></i>
//                       <div>
//                         <div className="mb-time-label">Start</div>
//                         <div className="mb-time-value">{start}</div>
//                       </div>
//                     </div>
//                     <div className="mb-time-row">
//                       <i className="bi bi-stop-circle mb-time-icon" style={{ color: '#f87171' }}></i>
//                       <div>
//                         <div className="mb-time-label">End</div>
//                         <div className="mb-time-value">{end}</div>
//                       </div>
//                     </div>
//                   </div>

//                   {b.users_bookings_approver_idTousers && (
//                     <div className="mb-reviewer">
//                       <i className="bi bi-person-check-fill"></i>
//                       Reviewed by {b.users_bookings_approver_idTousers.name}
//                     </div>
//                   )}
//                 </div>
//               </div>
//             )
//           })}
//         </div>
//       </div>
//     </>
//   )
// }


'use client'

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

  .mb-root { font-family: 'Plus Jakarta Sans', sans-serif; color: #1a1d23; }

  .mb-empty-wrap { text-align: center; padding: 5rem 2rem; }

  .mb-empty-icon {
    width: 72px; height: 72px;
    background: #eff4ff;
    border: 1px solid #bfdbfe;
    border-radius: 20px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: 1.8rem;
    color: #2563eb;
    margin-bottom: 1.25rem;
  }

  .mb-empty-title {
    font-size: 1.4rem;
    font-weight: 800;
    color: #111827;
    letter-spacing: -0.02em;
    margin-bottom: 0.4rem;
  }

  .mb-empty-sub { color: #9ca3af; font-size: 0.9rem; margin-bottom: 1.75rem; }

  .mb-cta-btn {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: #0d6efd;
    color: #fff;
    font-weight: 700;
    font-size: 0.875rem;
    padding: 0.65rem 1.5rem;
    border-radius: 9px;
    text-decoration: none;
    transition: all 0.18s;
  }

  .mb-cta-btn:hover {
    background: #0b5ed7;
    color: #fff;
    transform: translateY(-1px);
    box-shadow: 0 4px 14px rgba(13,110,253,0.3);
  }

  .mb-page-title {
    font-size: 1.6rem;
    font-weight: 800;
    color: #111827;
    letter-spacing: -0.03em;
    margin: 0 0 0.2rem;
  }

  .mb-page-sub { color: #9ca3af; font-size: 0.875rem; margin-bottom: 1.5rem; font-weight: 400; }

  .mb-card {
    background: #fff;
    border: 1px solid #e8ecf0;
    border-radius: 14px;
    padding: 1.25rem;
    height: 100%;
    display: flex;
    flex-direction: column;
    transition: all 0.2s ease;
    box-shadow: 0 1px 4px rgba(0,0,0,0.04);
    position: relative;
    overflow: hidden;
  }

  .mb-card::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 3px;
    border-radius: 14px 14px 0 0;
  }

  .mb-card.status-approved::before { background: #22c55e; }
  .mb-card.status-pending::before  { background: #f59e0b; }
  .mb-card.status-rejected::before { background: #ef4444; }

  .mb-card:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 24px rgba(0,0,0,0.09);
    border-color: #d1d5db;
  }

  .mb-badge {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    font-size: 0.68rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    padding: 0.28rem 0.7rem;
    border-radius: 6px;
    border: 1px solid;
  }

  .mb-badge.approved { background: #f0fdf4; border-color: #bbf7d0; color: #16a34a; }
  .mb-badge.pending  { background: #fffbeb; border-color: #fde68a; color: #d97706; }
  .mb-badge.rejected { background: #fef2f2; border-color: #fecaca; color: #dc2626; }

  .mb-resource-name {
    font-size: 1rem;
    font-weight: 700;
    color: #111827;
    margin: 0.85rem 0 0.2rem;
    letter-spacing: -0.01em;
  }

  .mb-resource-meta {
    font-size: 0.78rem;
    color: #9ca3af;
    display: flex;
    align-items: center;
    gap: 5px;
    margin-bottom: 1rem;
    flex-wrap: wrap;
    font-weight: 500;
  }

  .mb-resource-meta .sep { opacity: 0.4; }

  .mb-time-block {
    background: #f9fafb;
    border: 1px solid #f3f4f6;
    border-radius: 10px;
    padding: 0.8rem 0.9rem;
    margin-bottom: 0.9rem;
    flex: 1;
  }

  .mb-time-row {
    display: flex;
    align-items: flex-start;
    gap: 9px;
    font-size: 0.8rem;
  }

  .mb-time-row + .mb-time-row {
    margin-top: 0.55rem;
    padding-top: 0.55rem;
    border-top: 1px solid #e5e7eb;
  }

  .mb-time-label { color: #9ca3af; font-size: 0.68rem; text-transform: uppercase; letter-spacing: 0.05em; font-weight: 700; }
  .mb-time-value { color: #374151; font-weight: 600; }
  .mb-time-icon  { margin-top: 1px; flex-shrink: 0; font-size: 0.82rem; }

  .mb-reviewer {
    font-size: 0.77rem;
    color: #9ca3af;
    display: flex;
    align-items: center;
    gap: 6px;
    border-top: 1px solid #f3f4f6;
    padding-top: 0.7rem;
    font-weight: 500;
  }
`

export default function MyBookingsClient({ initialBookings }: { initialBookings: any[] }) {
  if (initialBookings.length === 0) {
    return (
      <>
        <style>{styles}</style>
        <div className="mb-root">
          <div className="mb-empty-wrap">
            <div className="mb-empty-icon"><i className="bi bi-calendar-x"></i></div>
            <div className="mb-empty-title">No bookings yet</div>
            <p className="mb-empty-sub">Head to the dashboard to find and reserve a resource.</p>
            <a href="/user-dashboard" className="mb-cta-btn">
              <i className="bi bi-grid-1x2"></i>
              Browse Resources
            </a>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <style>{styles}</style>
      <div className="mb-root">
        <div className="mb-page-title">My Bookings</div>
        <p className="mb-page-sub">{initialBookings.length} booking{initialBookings.length !== 1 ? 's' : ''} found</p>

        <div className="row g-3">
          {initialBookings.map((b: any) => {
            const statusKey =
              b.status === 'Approved' ? 'approved' :
              b.status === 'Rejected' || b.status === 'Cancelled' ? 'rejected' : 'pending'

            const statusIcon =
              statusKey === 'approved' ? 'bi-check-circle-fill' :
              statusKey === 'rejected' ? 'bi-x-circle-fill' : 'bi-clock-fill'

            const start = new Date(b.start_datetime).toLocaleString()
            const end   = new Date(b.end_datetime).toLocaleString()

            return (
              <div key={b.booking_id} className="col-12 col-md-6 col-xl-4">
                <div className={`mb-card status-${statusKey}`}>
                  <span className={`mb-badge ${statusKey}`}>
                    <i className={`bi ${statusIcon}`}></i>
                    {b.status || 'Pending'}
                  </span>

                  <div className="mb-resource-name">{b.resources.resource_name}</div>
                  <div className="mb-resource-meta">
                    <i className="bi bi-tag-fill"></i>
                    {b.resources.resource_types?.type_name || 'Resource'}
                    <span className="sep">·</span>
                    <i className="bi bi-geo-alt-fill"></i>
                    {b.resources.buildings?.building_name || 'Unknown location'}
                  </div>

                  <div className="mb-time-block">
                    <div className="mb-time-row">
                      <i className="bi bi-play-circle-fill mb-time-icon" style={{ color: '#22c55e' }}></i>
                      <div>
                        <div className="mb-time-label">Start</div>
                        <div className="mb-time-value">{start}</div>
                      </div>
                    </div>
                    <div className="mb-time-row">
                      <i className="bi bi-stop-circle-fill mb-time-icon" style={{ color: '#ef4444' }}></i>
                      <div>
                        <div className="mb-time-label">End</div>
                        <div className="mb-time-value">{end}</div>
                      </div>
                    </div>
                  </div>

                  {b.users_bookings_approver_idTousers && (
                    <div className="mb-reviewer">
                      <i className="bi bi-person-check-fill" style={{ color: '#0d6efd' }}></i>
                      Reviewed by {b.users_bookings_approver_idTousers.name}
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}

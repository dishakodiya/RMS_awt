// 'use client'

// import { useState } from 'react'
// import { createUserDashboardBooking } from './actions'

// interface BookingActionModalProps {
//   resource: any
//   defaultDate: string
//   onClose: () => void
//   onSuccess: () => void
// }

// export default function BookingActionModal({ resource, defaultDate, onClose, onSuccess }: BookingActionModalProps) {
//   const [isSubmitting, setIsSubmitting] = useState(false)
//   const [error, setError] = useState('')

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault()
//     setIsSubmitting(true)
//     setError('')

//     const formData = new FormData(e.currentTarget)
//     formData.append('resource_id', resource.resource_id.toString())

//     try {
//       await createUserDashboardBooking(formData)
//       onSuccess()
//     } catch (err: any) {
//       setError(err.message || 'Failed to create booking')
//       setIsSubmitting(false)
//     }
//   }

//   // Set default times to make it easy
//   const defaultStartTime = `${defaultDate}T09:00`
//   const defaultEndTime = `${defaultDate}T10:00`

//   return (
//     <div className="modal show d-block" tabIndex={-1} style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
//       <div className="modal-dialog modal-dialog-centered">
//         <div className="modal-content border-0 shadow-lg">
//           <div className="modal-header bg-light border-bottom-0 pb-0">
//             <div>
//                <h5 className="modal-title fw-bold">Book Resource</h5>
//                <p className="text-muted small mb-0">{resource.resource_name}</p>
//             </div>
//             <button type="button" className="btn-close" onClick={onClose}></button>
//           </div>
//           <div className="modal-body p-4">
//             {error && (
//               <div className="alert alert-danger px-3 py-2 small rounded-3 mb-4">
//                 <i className="bi bi-exclamation-triangle-fill me-2"></i>
//                 {error}
//               </div>
//             )}

//             <form onSubmit={handleSubmit} id="quickBookingForm">
//               <div className="row g-3">
//                 <div className="col-12">
//                    <div className="p-3 bg-light rounded-3 mb-2 border">
//                       <div className="d-flex align-items-center gap-2 mb-2">
//                          <i className="bi bi-tag text-primary"></i>
//                          <span className="fw-semibold small">{resource.resource_types?.type_name || 'General Resource'}</span>
//                       </div>
//                       <div className="d-flex align-items-center gap-2 text-muted small">
//                          <i className="bi bi-geo-alt"></i>
//                          <span>{resource.buildings?.building_name || 'Location N/A'}</span>
//                       </div>
//                    </div>
//                 </div>

//                 <div className="col-6">
//                   <label className="form-label small fw-semibold text-muted text-uppercase">Start Time</label>
//                   <input
//                     type="datetime-local"
//                     name="start_datetime"
//                     className="form-control"
//                     defaultValue={defaultStartTime}
//                     required
//                   />
//                 </div>
                
//                 <div className="col-6">
//                   <label className="form-label small fw-semibold text-muted text-uppercase">End Time</label>
//                   <input
//                     type="datetime-local"
//                     name="end_datetime"
//                     className="form-control"
//                     defaultValue={defaultEndTime}
//                     required
//                   />
//                 </div>
//               </div>
//             </form>
//           </div>
//           <div className="modal-footer border-top-0 pt-0">
//             <button 
//                type="button" 
//                className="btn btn-light rounded-pill px-4" 
//                onClick={onClose}
//                disabled={isSubmitting}
//             >
//               Cancel
//             </button>
//             <button 
//                type="submit" 
//                form="quickBookingForm" 
//                className="btn btn-primary rounded-pill px-4 fw-semibold"
//                disabled={isSubmitting}
//             >
//               {isSubmitting ? (
//                  <><span className="spinner-border spinner-border-sm me-2"></span>Booking...</>
//               ) : 'Confirm Booking'}
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }




// 'use client'

// import { useState } from 'react'
// import { createUserDashboardBooking } from './actions'

// interface BookingActionModalProps {
//   resource: any
//   defaultDate: string
//   onClose: () => void
//   onSuccess: () => void
// }

// const modalStyles = `
//   @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@300;400;500&display=swap');

//   .bam-overlay {
//     position: fixed;
//     inset: 0;
//     background: rgba(0,0,0,0.75);
//     backdrop-filter: blur(8px);
//     -webkit-backdrop-filter: blur(8px);
//     z-index: 1050;
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     padding: 1rem;
//     animation: bam-fade-in 0.2s ease;
//   }

//   @keyframes bam-fade-in {
//     from { opacity: 0; }
//     to { opacity: 1; }
//   }

//   @keyframes bam-slide-up {
//     from { opacity: 0; transform: translateY(20px) scale(0.97); }
//     to { opacity: 1; transform: translateY(0) scale(1); }
//   }

//   .bam-modal {
//     background: #141418;
//     border: 1px solid rgba(255,255,255,0.09);
//     border-radius: 20px;
//     width: 100%;
//     max-width: 440px;
//     overflow: hidden;
//     box-shadow: 0 32px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.04);
//     animation: bam-slide-up 0.25s cubic-bezier(0.2, 0.8, 0.3, 1);
//     font-family: 'DM Sans', sans-serif;
//   }

//   .bam-header {
//     padding: 1.5rem 1.5rem 0;
//     display: flex;
//     align-items: flex-start;
//     justify-content: space-between;
//     gap: 1rem;
//   }

//   .bam-header-icon {
//     width: 44px;
//     height: 44px;
//     background: linear-gradient(135deg, #ffb93c, #ff7b00);
//     border-radius: 12px;
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     font-size: 1.1rem;
//     color: #000;
//     flex-shrink: 0;
//     box-shadow: 0 4px 16px rgba(255,185,60,0.3);
//   }

//   .bam-title {
//     font-family: 'Syne', sans-serif;
//     font-size: 1.2rem;
//     font-weight: 800;
//     color: #fff;
//     margin: 0 0 2px;
//     letter-spacing: -0.02em;
//   }

//   .bam-subtitle {
//     font-size: 0.82rem;
//     color: rgba(255,255,255,0.4);
//     margin: 0;
//   }

//   .bam-close {
//     width: 32px;
//     height: 32px;
//     background: rgba(255,255,255,0.05);
//     border: 1px solid rgba(255,255,255,0.08);
//     border-radius: 8px;
//     color: rgba(255,255,255,0.5);
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     cursor: pointer;
//     transition: all 0.2s;
//     flex-shrink: 0;
//   }

//   .bam-close:hover {
//     background: rgba(255,80,80,0.12);
//     border-color: rgba(255,80,80,0.25);
//     color: #f87171;
//   }

//   .bam-body {
//     padding: 1.25rem 1.5rem;
//   }

//   .bam-resource-info {
//     background: rgba(255,255,255,0.03);
//     border: 1px solid rgba(255,255,255,0.07);
//     border-radius: 12px;
//     padding: 0.9rem 1rem;
//     margin-bottom: 1.25rem;
//     display: flex;
//     align-items: center;
//     gap: 10px;
//   }

//   .bam-resource-info i {
//     color: rgba(255,255,255,0.3);
//     font-size: 0.85rem;
//   }

//   .bam-resource-info span {
//     font-size: 0.83rem;
//     color: rgba(255,255,255,0.5);
//   }

//   .bam-resource-info .sep {
//     color: rgba(255,255,255,0.15);
//   }

//   .bam-error {
//     background: rgba(239, 68, 68, 0.08);
//     border: 1px solid rgba(239, 68, 68, 0.2);
//     border-radius: 10px;
//     padding: 0.7rem 0.9rem;
//     font-size: 0.83rem;
//     color: #f87171;
//     display: flex;
//     align-items: center;
//     gap: 7px;
//     margin-bottom: 1.1rem;
//   }

//   .bam-label {
//     display: block;
//     font-size: 0.72rem;
//     font-weight: 600;
//     text-transform: uppercase;
//     letter-spacing: 0.07em;
//     color: rgba(255,255,255,0.35);
//     margin-bottom: 0.5rem;
//   }

//   .bam-input {
//     width: 100%;
//     background: rgba(255,255,255,0.04);
//     border: 1px solid rgba(255,255,255,0.08);
//     border-radius: 10px;
//     color: #fff;
//     padding: 0.65rem 0.9rem;
//     font-size: 0.875rem;
//     font-family: 'DM Sans', sans-serif;
//     transition: all 0.2s;
//     outline: none;
//     -webkit-appearance: none;
//     appearance: none;
//     color-scheme: dark;
//   }

//   .bam-input:focus {
//     border-color: rgba(255,185,60,0.4);
//     background: rgba(255,185,60,0.04);
//     box-shadow: 0 0 0 3px rgba(255,185,60,0.08);
//   }

//   .bam-footer {
//     padding: 0 1.5rem 1.5rem;
//     display: flex;
//     gap: 0.75rem;
//   }

//   .bam-btn-cancel {
//     flex: 1;
//     background: rgba(255,255,255,0.05);
//     border: 1px solid rgba(255,255,255,0.09);
//     color: rgba(255,255,255,0.6);
//     border-radius: 10px;
//     padding: 0.7rem;
//     font-size: 0.875rem;
//     font-weight: 500;
//     font-family: 'DM Sans', sans-serif;
//     cursor: pointer;
//     transition: all 0.2s;
//   }

//   .bam-btn-cancel:hover:not(:disabled) {
//     background: rgba(255,255,255,0.08);
//     color: rgba(255,255,255,0.85);
//   }

//   .bam-btn-confirm {
//     flex: 2;
//     background: linear-gradient(135deg, #ffb93c, #ff7b00);
//     border: none;
//     color: #000;
//     border-radius: 10px;
//     padding: 0.7rem;
//     font-size: 0.875rem;
//     font-weight: 700;
//     font-family: 'DM Sans', sans-serif;
//     cursor: pointer;
//     transition: all 0.2s;
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     gap: 7px;
//     box-shadow: 0 4px 16px rgba(255,185,60,0.25);
//   }

//   .bam-btn-confirm:hover:not(:disabled) {
//     transform: translateY(-1px);
//     box-shadow: 0 8px 24px rgba(255,185,60,0.35);
//   }

//   .bam-btn-confirm:disabled, .bam-btn-cancel:disabled {
//     opacity: 0.45;
//     cursor: not-allowed;
//     transform: none;
//   }

//   .bam-spinner {
//     width: 14px;
//     height: 14px;
//     border: 2px solid rgba(0,0,0,0.3);
//     border-top-color: #000;
//     border-radius: 50%;
//     animation: bam-spin 0.6s linear infinite;
//   }

//   @keyframes bam-spin {
//     to { transform: rotate(360deg); }
//   }

//   .bam-row { display: flex; gap: 0.75rem; }
//   .bam-col { flex: 1; }
// `

// export default function BookingActionModal({ resource, defaultDate, onClose, onSuccess }: BookingActionModalProps) {
//   const [isSubmitting, setIsSubmitting] = useState(false)
//   const [error, setError] = useState('')

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault()
//     setIsSubmitting(true)
//     setError('')

//     const formData = new FormData(e.currentTarget)
//     formData.append('resource_id', resource.resource_id.toString())

//     try {
//       await createUserDashboardBooking(formData)
//       onSuccess()
//     } catch (err: any) {
//       setError(err.message || 'Failed to create booking')
//       setIsSubmitting(false)
//     }
//   }

//   const defaultStartTime = `${defaultDate}T09:00`
//   const defaultEndTime = `${defaultDate}T10:00`

//   return (
//     <>
//       <style>{modalStyles}</style>
//       <div className="bam-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
//         <div className="bam-modal">
//           <div className="bam-header">
//             <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
//               <div className="bam-header-icon">
//                 <i className="bi bi-calendar-plus-fill"></i>
//               </div>
//               <div>
//                 <div className="bam-title">New Booking</div>
//                 <div className="bam-subtitle">{resource.resource_name}</div>
//               </div>
//             </div>
//             <button className="bam-close" onClick={onClose} aria-label="Close">
//               <i className="bi bi-x-lg" style={{ fontSize: '0.8rem' }}></i>
//             </button>
//           </div>

//           <div className="bam-body">
//             <div className="bam-resource-info">
//               <i className="bi bi-tag-fill"></i>
//               <span>{resource.resource_types?.type_name || 'General Resource'}</span>
//               <span className="sep">·</span>
//               <i className="bi bi-geo-alt-fill"></i>
//               <span>{resource.buildings?.building_name || 'Location N/A'}</span>
//             </div>

//             {error && (
//               <div className="bam-error">
//                 <i className="bi bi-exclamation-triangle-fill"></i>
//                 {error}
//               </div>
//             )}

//             <form onSubmit={handleSubmit} id="quickBookingForm">
//               <div className="bam-row">
//                 <div className="bam-col">
//                   <label className="bam-label">Start time</label>
//                   <input
//                     type="datetime-local"
//                     name="start_datetime"
//                     className="bam-input"
//                     defaultValue={defaultStartTime}
//                     required
//                   />
//                 </div>
//                 <div className="bam-col">
//                   <label className="bam-label">End time</label>
//                   <input
//                     type="datetime-local"
//                     name="end_datetime"
//                     className="bam-input"
//                     defaultValue={defaultEndTime}
//                     required
//                   />
//                 </div>
//               </div>
//             </form>
//           </div>

//           <div className="bam-footer">
//             <button className="bam-btn-cancel" onClick={onClose} disabled={isSubmitting}>
//               Cancel
//             </button>
//             <button type="submit" form="quickBookingForm" className="bam-btn-confirm" disabled={isSubmitting}>
//               {isSubmitting ? (
//                 <><div className="bam-spinner"></div> Booking…</>
//               ) : (
//                 <><i className="bi bi-check2"></i> Confirm Booking</>
//               )}
//             </button>
//           </div>
//         </div>
//       </div>
//     </>
//   )
// }



// 'use client'

// import { useState } from 'react'
// import { createUserDashboardBooking } from './actions'

// interface BookingActionModalProps {
//   resource: any
//   defaultDate: string
//   onClose: () => void
//   onSuccess: () => void
// }

// const modalStyles = `
//   @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

//   .bam-overlay {
//     position: fixed;
//     inset: 0;
//     background: rgba(17,24,39,0.45);
//     backdrop-filter: blur(4px);
//     -webkit-backdrop-filter: blur(4px);
//     z-index: 1050;
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     padding: 1rem;
//     animation: bam-fade 0.18s ease;
//   }

//   @keyframes bam-fade { from { opacity: 0; } to { opacity: 1; } }

//   @keyframes bam-up {
//     from { opacity: 0; transform: translateY(16px) scale(0.98); }
//     to   { opacity: 1; transform: translateY(0) scale(1); }
//   }

//   .bam-modal {
//     background: #fff;
//     border: 1px solid #e8ecf0;
//     border-radius: 18px;
//     width: 100%;
//     max-width: 420px;
//     box-shadow: 0 24px 60px rgba(0,0,0,0.15);
//     animation: bam-up 0.22s cubic-bezier(0.2,0.8,0.3,1);
//     font-family: 'Plus Jakarta Sans', sans-serif;
//     overflow: hidden;
//   }

//   .bam-header {
//     padding: 1.4rem 1.4rem 0;
//     display: flex;
//     align-items: flex-start;
//     justify-content: space-between;
//     gap: 1rem;
//   }

//   .bam-header-icon {
//     width: 42px; height: 42px;
//     background: #eff4ff;
//     border: 1px solid #bfdbfe;
//     border-radius: 11px;
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     font-size: 1.1rem;
//     color: #2563eb;
//     flex-shrink: 0;
//   }

//   .bam-title {
//     font-size: 1.1rem;
//     font-weight: 800;
//     color: #111827;
//     margin: 0 0 2px;
//     letter-spacing: -0.02em;
//   }

//   .bam-subtitle { font-size: 0.8rem; color: #9ca3af; margin: 0; font-weight: 500; }

//   .bam-close {
//     width: 30px; height: 30px;
//     background: #f3f4f6;
//     border: 1px solid #e5e7eb;
//     border-radius: 8px;
//     color: #6b7280;
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     cursor: pointer;
//     transition: all 0.15s;
//     flex-shrink: 0;
//   }

//   .bam-close:hover { background: #fee2e2; border-color: #fca5a5; color: #dc2626; }

//   .bam-body { padding: 1.1rem 1.4rem; }

//   .bam-resource-info {
//     background: #f9fafb;
//     border: 1px solid #f3f4f6;
//     border-radius: 10px;
//     padding: 0.75rem 0.9rem;
//     margin-bottom: 1rem;
//     display: flex;
//     align-items: center;
//     gap: 8px;
//     flex-wrap: wrap;
//   }

//   .bam-resource-info i { color: #9ca3af; font-size: 0.8rem; }
//   .bam-resource-info span { font-size: 0.8rem; color: #6b7280; font-weight: 500; }
//   .bam-resource-info .sep { color: #d1d5db; }

//   .bam-error {
//     background: #fef2f2;
//     border: 1px solid #fecaca;
//     border-radius: 9px;
//     padding: 0.65rem 0.85rem;
//     font-size: 0.82rem;
//     color: #dc2626;
//     display: flex;
//     align-items: center;
//     gap: 7px;
//     margin-bottom: 1rem;
//     font-weight: 500;
//   }

//   .bam-label {
//     display: block;
//     font-size: 0.7rem;
//     font-weight: 700;
//     text-transform: uppercase;
//     letter-spacing: 0.08em;
//     color: #9ca3af;
//     margin-bottom: 0.45rem;
//   }

//   .bam-input {
//     width: 100%;
//     background: #f9fafb;
//     border: 1px solid #e5e7eb;
//     border-radius: 9px;
//     color: #111827;
//     padding: 0.6rem 0.85rem;
//     font-size: 0.875rem;
//     font-family: 'Plus Jakarta Sans', sans-serif;
//     outline: none;
//     transition: all 0.18s;
//   }

//   .bam-input:focus {
//     border-color: #93c5fd;
//     background: #fff;
//     box-shadow: 0 0 0 3px rgba(59,130,246,0.1);
//   }

//   .bam-footer {
//     padding: 0 1.4rem 1.4rem;
//     display: flex;
//     gap: 0.6rem;
//   }

//   .bam-btn-cancel {
//     flex: 1;
//     background: #f3f4f6;
//     border: 1px solid #e5e7eb;
//     color: #6b7280;
//     border-radius: 9px;
//     padding: 0.65rem;
//     font-size: 0.875rem;
//     font-weight: 600;
//     font-family: 'Plus Jakarta Sans', sans-serif;
//     cursor: pointer;
//     transition: all 0.15s;
//   }

//   .bam-btn-cancel:hover:not(:disabled) { background: #e5e7eb; color: #374151; }

//   .bam-btn-confirm {
//     flex: 2;
//     background: #0d6efd;
//     border: none;
//     color: #fff;
//     border-radius: 9px;
//     padding: 0.65rem;
//     font-size: 0.875rem;
//     font-weight: 700;
//     font-family: 'Plus Jakarta Sans', sans-serif;
//     cursor: pointer;
//     transition: all 0.18s;
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     gap: 7px;
//   }

//   .bam-btn-confirm:hover:not(:disabled) {
//     background: #0b5ed7;
//     transform: translateY(-1px);
//     box-shadow: 0 4px 14px rgba(13,110,253,0.3);
//   }

//   .bam-btn-confirm:disabled, .bam-btn-cancel:disabled {
//     opacity: 0.5;
//     cursor: not-allowed;
//     transform: none;
//   }

//   .bam-spinner {
//     width: 14px; height: 14px;
//     border: 2px solid rgba(255,255,255,0.35);
//     border-top-color: #fff;
//     border-radius: 50%;
//     animation: bam-spin 0.6s linear infinite;
//   }

//   @keyframes bam-spin { to { transform: rotate(360deg); } }

//   .bam-row { display: flex; gap: 0.7rem; }
//   .bam-col { flex: 1; }

//   .bam-divider { height: 1px; background: #f3f4f6; margin: 0 0 1rem; }
// `

// export default function BookingActionModal({ resource, defaultDate, onClose, onSuccess }: BookingActionModalProps) {
//   const [isSubmitting, setIsSubmitting] = useState(false)
//   const [error, setError] = useState('')

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault()
//     setIsSubmitting(true)
//     setError('')
//     const formData = new FormData(e.currentTarget)
//     formData.append('resource_id', resource.resource_id.toString())
//     try {
//       await createUserDashboardBooking(formData)
//       onSuccess()
//     } catch (err: any) {
//       setError(err.message || 'Failed to create booking')
//       setIsSubmitting(false)
//     }
//   }

//   const defaultStartTime = `${defaultDate}T09:00`
//   const defaultEndTime   = `${defaultDate}T10:00`

//   return (
//     <>
//       <style>{modalStyles}</style>
//       <div className="bam-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
//         <div className="bam-modal">
//           <div className="bam-header">
//             <div style={{ display: 'flex', gap: '11px', alignItems: 'flex-start' }}>
//               <div className="bam-header-icon">
//                 <i className="bi bi-calendar-plus-fill"></i>
//               </div>
//               <div>
//                 <div className="bam-title">New Booking</div>
//                 <div className="bam-subtitle">{resource.resource_name}</div>
//               </div>
//             </div>
//             <button className="bam-close" onClick={onClose} aria-label="Close">
//               <i className="bi bi-x-lg" style={{ fontSize: '0.75rem' }}></i>
//             </button>
//           </div>

//           <div className="bam-body">
//             <div className="bam-resource-info">
//               <i className="bi bi-tag-fill"></i>
//               <span>{resource.resource_types?.type_name || 'General Resource'}</span>
//               <span className="sep">·</span>
//               <i className="bi bi-geo-alt-fill"></i>
//               <span>{resource.buildings?.building_name || 'Location N/A'}</span>
//             </div>

//             {error && (
//               <div className="bam-error">
//                 <i className="bi bi-exclamation-triangle-fill"></i>
//                 {error}
//               </div>
//             )}

//             <form onSubmit={handleSubmit} id="quickBookingForm">
//               <div className="bam-row">
//                 <div className="bam-col">
//                   <label className="bam-label">Start time</label>
//                   <input type="datetime-local" name="start_datetime" className="bam-input" defaultValue={defaultStartTime} required />
//                 </div>
//                 <div className="bam-col">
//                   <label className="bam-label">End time</label>
//                   <input type="datetime-local" name="end_datetime" className="bam-input" defaultValue={defaultEndTime} required />
//                 </div>
//               </div>
//             </form>
//           </div>

//           <div className="bam-footer">
//             <button className="bam-btn-cancel" onClick={onClose} disabled={isSubmitting}>Cancel</button>
//             <button type="submit" form="quickBookingForm" className="bam-btn-confirm" disabled={isSubmitting}>
//               {isSubmitting
//                 ? <><div className="bam-spinner"></div> Booking…</>
//                 : <><i className="bi bi-check2"></i> Confirm Booking</>}
//             </button>
//           </div>
//         </div>
//       </div>
//     </>
//   )
// }


// 'use client'

// import { useState } from 'react'
// import { createUserDashboardBooking } from './actions'

// interface BookingActionModalProps {
//   resource: any
//   defaultDate: string
//   onClose: () => void
//   onSuccess: () => void
// }

// export default function BookingActionModal({ resource, defaultDate, onClose, onSuccess }: BookingActionModalProps) {
//   const [isSubmitting, setIsSubmitting] = useState(false)
//   const [error, setError] = useState('')

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault()
//     setIsSubmitting(true)
//     setError('')
//     const formData = new FormData(e.currentTarget)
//     formData.append('resource_id', resource.resource_id.toString())
//     try {
//       await createUserDashboardBooking(formData)
//       onSuccess()
//     } catch (err: any) {
//       setError(err.message || 'Failed to create booking')
//       setIsSubmitting(false)
//     }
//   }

//   const defaultStartTime = `${defaultDate}T09:00`
//   const defaultEndTime = `${defaultDate}T10:00`

//   return (
//     <>
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

//         .bam-overlay {
//           position: fixed;
//           inset: 0;
//           background: rgba(17,24,39,0.5);
//           backdrop-filter: blur(3px);
//           z-index: 9999;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           padding: 1rem;
//           font-family: 'Plus Jakarta Sans', sans-serif;
//         }

//         .bam-box {
//           background: #fff;
//           border-radius: 16px;
//           width: 100%;
//           max-width: 460px;
//           box-shadow: 0 20px 60px rgba(0,0,0,0.18);
//           overflow: visible;
//         }

//         .bam-head {
//           display: flex;
//           align-items: flex-start;
//           justify-content: space-between;
//           padding: 1.4rem 1.4rem 1rem;
//           border-bottom: 1px solid #f3f4f6;
//           gap: 1rem;
//         }

//         .bam-head-left {
//           display: flex;
//           align-items: flex-start;
//           gap: 12px;
//         }

//         .bam-icon {
//           width: 44px; height: 44px;
//           background: #eff4ff;
//           border: 1px solid #bfdbfe;
//           border-radius: 12px;
//           display: flex; align-items: center; justify-content: center;
//           font-size: 1.15rem; color: #2563eb; flex-shrink: 0;
//         }

//         .bam-title {
//           font-size: 1.05rem; font-weight: 800;
//           color: #111827; margin: 0 0 3px;
//           letter-spacing: -0.02em;
//         }

//         .bam-subtitle { font-size: 0.82rem; color: #6b7280; margin: 0; font-weight: 500; }

//         .bam-close-btn {
//           width: 32px; height: 32px;
//           background: #f9fafb;
//           border: 1px solid #e5e7eb;
//           border-radius: 8px;
//           color: #6b7280;
//           display: flex; align-items: center; justify-content: center;
//           cursor: pointer; transition: all 0.15s; flex-shrink: 0;
//         }
//         .bam-close-btn:hover { background: #fee2e2; border-color: #fca5a5; color: #dc2626; }

//         .bam-body { padding: 1.2rem 1.4rem; }

//         .bam-info-row {
//           display: flex;
//           align-items: center;
//           gap: 6px;
//           flex-wrap: wrap;
//           background: #f9fafb;
//           border: 1px solid #f3f4f6;
//           border-radius: 10px;
//           padding: 0.7rem 0.9rem;
//           margin-bottom: 1.1rem;
//           font-size: 0.82rem;
//           color: #6b7280;
//           font-weight: 500;
//         }
//         .bam-info-row i { color: #9ca3af; font-size: 0.8rem; }
//         .bam-info-row .sep { color: #d1d5db; }

//         .bam-error {
//           background: #fef2f2; border: 1px solid #fecaca;
//           border-radius: 9px; padding: 0.65rem 0.85rem;
//           font-size: 0.82rem; color: #dc2626;
//           display: flex; align-items: center; gap: 7px;
//           margin-bottom: 1rem; font-weight: 500;
//         }

//         .bam-field { margin-bottom: 1rem; }
//         .bam-field:last-child { margin-bottom: 0; }

//         .bam-label {
//           display: block;
//           font-size: 0.72rem; font-weight: 700;
//           text-transform: uppercase; letter-spacing: 0.07em;
//           color: #9ca3af; margin-bottom: 0.45rem;
//         }

//         /* Full width input — no clipping */
//         .bam-input {
//           width: 100%;
//           box-sizing: border-box;
//           background: #f9fafb;
//           border: 1px solid #e5e7eb;
//           border-radius: 9px;
//           color: #111827;
//           padding: 0.65rem 0.9rem;
//           font-size: 0.875rem;
//           font-family: 'Plus Jakarta Sans', sans-serif;
//           font-weight: 500;
//           outline: none;
//           transition: all 0.18s;
//           display: block;
//         }

//         .bam-input:focus {
//           border-color: #93c5fd;
//           background: #fff;
//           box-shadow: 0 0 0 3px rgba(59,130,246,0.1);
//         }

//         .bam-footer {
//           display: flex; gap: 0.65rem;
//           padding: 0 1.4rem 1.4rem;
//         }

//         .bam-cancel {
//           flex: 1;
//           background: #f3f4f6; border: 1px solid #e5e7eb;
//           color: #374151; border-radius: 9px;
//           padding: 0.68rem; font-size: 0.875rem; font-weight: 600;
//           font-family: 'Plus Jakarta Sans', sans-serif;
//           cursor: pointer; transition: all 0.15s;
//         }
//         .bam-cancel:hover:not(:disabled) { background: #e5e7eb; }

//         .bam-confirm {
//           flex: 2;
//           background: #0d6efd; border: none;
//           color: #fff; border-radius: 9px;
//           padding: 0.68rem; font-size: 0.875rem; font-weight: 700;
//           font-family: 'Plus Jakarta Sans', sans-serif;
//           cursor: pointer; transition: all 0.18s;
//           display: flex; align-items: center; justify-content: center; gap: 7px;
//         }
//         .bam-confirm:hover:not(:disabled) {
//           background: #0b5ed7;
//           box-shadow: 0 4px 14px rgba(13,110,253,0.3);
//         }
//         .bam-confirm:disabled, .bam-cancel:disabled { opacity: 0.5; cursor: not-allowed; }

//         .bam-spinner {
//           width: 14px; height: 14px;
//           border: 2px solid rgba(255,255,255,0.35);
//           border-top-color: #fff;
//           border-radius: 50%;
//           animation: spin 0.6s linear infinite;
//           flex-shrink: 0;
//         }
//         @keyframes spin { to { transform: rotate(360deg); } }
//       `}</style>

//       <div className="bam-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
//         <div className="bam-box">

//           {/* Header */}
//           <div className="bam-head">
//             <div className="bam-head-left">
//               <div className="bam-icon">
//                 <i className="bi bi-calendar-plus-fill"></i>
//               </div>
//               <div>
//                 <div className="bam-title">New Booking</div>
//                 <div className="bam-subtitle">{resource.resource_name}</div>
//               </div>
//             </div>
//             <button className="bam-close-btn" onClick={onClose}>
//               <i className="bi bi-x-lg" style={{ fontSize: '0.75rem' }}></i>
//             </button>
//           </div>

//           {/* Body */}
//           <div className="bam-body">
//             {/* Resource info */}
//             <div className="bam-info-row">
//               <i className="bi bi-tag-fill"></i>
//               <span>{resource.resource_types?.type_name || 'General Resource'}</span>
//               <span className="sep">·</span>
//               <i className="bi bi-geo-alt-fill"></i>
//               <span>{resource.buildings?.building_name || 'Location N/A'}</span>
//             </div>

//             {error && (
//               <div className="bam-error">
//                 <i className="bi bi-exclamation-triangle-fill"></i>
//                 {error}
//               </div>
//             )}

//             {/* Form — stacked fields, full width, no clipping */}
//             <form onSubmit={handleSubmit} id="quickBookingForm">
//               <div className="bam-field">
//                 <label className="bam-label">
//                   <i className="bi bi-play-circle-fill" style={{ color: '#22c55e', marginRight: 5 }}></i>
//                   Start Date & Time
//                 </label>
//                 <input
//                   type="datetime-local"
//                   name="start_datetime"
//                   className="bam-input"
//                   defaultValue={defaultStartTime}
//                   required
//                 />
//               </div>

//               <div className="bam-field">
//                 <label className="bam-label">
//                   <i className="bi bi-stop-circle-fill" style={{ color: '#ef4444', marginRight: 5 }}></i>
//                   End Date & Time
//                 </label>
//                 <input
//                   type="datetime-local"
//                   name="end_datetime"
//                   className="bam-input"
//                   defaultValue={defaultEndTime}
//                   required
//                 />
//               </div>
//             </form>
//           </div>

//           {/* Footer */}
//           <div className="bam-footer">
//             <button className="bam-cancel" onClick={onClose} disabled={isSubmitting}>
//               Cancel
//             </button>
//             <button type="submit" form="quickBookingForm" className="bam-confirm" disabled={isSubmitting}>
//               {isSubmitting
//                 ? <><div className="bam-spinner"></div> Booking…</>
//                 : <><i className="bi bi-check2"></i> Confirm Booking</>}
//             </button>
//           </div>

//         </div>
//       </div>
//     </>
//   )
// }




'use client'

import { useState } from 'react'
import { createUserDashboardBooking } from './actions'

interface BookingActionModalProps {
  resource: any
  defaultDate: string
  onClose: () => void
  onSuccess: () => void
}

export default function BookingActionModal({ resource, defaultDate, onClose, onSuccess }: BookingActionModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError('')
    const formData = new FormData(e.currentTarget)
    formData.append('resource_id', resource.resource_id.toString())
    try {
      await createUserDashboardBooking(formData)
      onSuccess()
    } catch (err: any) {
      setError(err.message || 'Failed to create booking')
      setIsSubmitting(false)
    }
  }

  const defaultStartTime = `${defaultDate}T09:00`
  const defaultEndTime   = `${defaultDate}T10:00`

  const hasCupboard = !!resource.cupboards?.cupboard_name
  const hasShelves  = resource.shelves?.shelf_number != null
  const hasDescription = !!resource.description

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

        .bam-overlay {
          position: fixed; inset: 0;
          background: rgba(17,24,39,0.5);
          backdrop-filter: blur(3px);
          z-index: 9999;
          display: flex; align-items: center; justify-content: center;
          padding: 1rem;
          font-family: 'Plus Jakarta Sans', sans-serif;
        }

        .bam-box {
          background: #fff; border-radius: 16px;
          width: 100%; max-width: 480px;
          box-shadow: 0 20px 60px rgba(0,0,0,0.18);
          max-height: 90vh; overflow-y: auto;
          display: flex; flex-direction: column;
        }

        .bam-head {
          display: flex; align-items: flex-start;
          justify-content: space-between; gap: 1rem;
          padding: 1.3rem 1.4rem 1rem;
          border-bottom: 1px solid #f3f4f6;
          position: sticky; top: 0; background: #fff; z-index: 1;
          border-radius: 16px 16px 0 0;
        }

        .bam-head-left { display: flex; align-items: flex-start; gap: 12px; }

        .bam-icon {
          width: 44px; height: 44px; background: #eff4ff;
          border: 1px solid #bfdbfe; border-radius: 12px;
          display: flex; align-items: center; justify-content: center;
          font-size: 1.15rem; color: #2563eb; flex-shrink: 0;
        }

        .bam-title { font-size: 1.05rem; font-weight: 800; color: #111827; margin: 0 0 3px; letter-spacing: -0.02em; }
        .bam-subtitle { font-size: 0.82rem; color: #6b7280; margin: 0; font-weight: 500; }

        .bam-close-btn {
          width: 32px; height: 32px; background: #f9fafb;
          border: 1px solid #e5e7eb; border-radius: 8px; color: #6b7280;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; transition: all 0.15s; flex-shrink: 0;
        }
        .bam-close-btn:hover { background: #fee2e2; border-color: #fca5a5; color: #dc2626; }

        .bam-body { padding: 1.2rem 1.4rem; flex: 1; }

        /* Quick info strip: type · building · floor */
        .bam-info-strip {
          display: flex; flex-wrap: wrap; align-items: center; gap: 6px;
          background: #f9fafb; border: 1px solid #f3f4f6;
          border-radius: 10px; padding: 0.65rem 0.9rem;
          margin-bottom: 1.1rem; font-size: 0.81rem; color: #6b7280; font-weight: 500;
        }
        .bam-info-strip i { color: #9ca3af; font-size: 0.78rem; }
        .bam-info-strip .sep { color: #d1d5db; font-size: 0.7rem; }

        /* Cupboard + Shelves section */
        .bam-section-label {
          font-size: 0.68rem; font-weight: 700; text-transform: uppercase;
          letter-spacing: 0.09em; color: #9ca3af; margin-bottom: 0.6rem;
        }

        .bam-storage-grid {
          display: grid; grid-template-columns: 1fr 1fr;
          gap: 0.5rem; margin-bottom: 1.2rem;
        }

        .bam-storage-card {
          display: flex; align-items: flex-start; gap: 10px;
          background: #f9fafb; border: 1px solid #f3f4f6;
          border-radius: 10px; padding: 0.75rem 0.9rem;
          transition: border-color 0.15s;
        }
        .bam-storage-card:hover { border-color: #e5e7eb; }

        .bam-storage-icon {
          width: 30px; height: 30px; border-radius: 8px;
          display: flex; align-items: center; justify-content: center;
          font-size: 0.8rem; flex-shrink: 0;
        }

        .bam-storage-icon.cupboard { background: #fef3c7; color: #d97706; }
        .bam-storage-icon.shelf    { background: #f0fdf4; color: #16a34a; }

        .bam-storage-label { font-size: 0.67rem; color: #9ca3af; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; }
        .bam-storage-value { font-size: 0.85rem; color: #111827; font-weight: 700; margin-top: 2px; }

        /* Description */
        .bam-desc {
          background: #f9fafb; border: 1px solid #f3f4f6;
          border-radius: 10px; padding: 0.75rem 0.9rem;
          font-size: 0.82rem; color: #374151; line-height: 1.5;
          margin-bottom: 1.1rem; font-weight: 400;
        }

        .bam-divider { height: 1px; background: #f3f4f6; margin: 0 0 1.1rem; }

        .bam-error {
          background: #fef2f2; border: 1px solid #fecaca; border-radius: 9px;
          padding: 0.65rem 0.85rem; font-size: 0.82rem; color: #dc2626;
          display: flex; align-items: center; gap: 7px; margin-bottom: 1rem; font-weight: 500;
        }

        .bam-field { margin-bottom: 1rem; }
        .bam-field:last-child { margin-bottom: 0; }

        .bam-label {
          display: flex; align-items: center; gap: 5px;
          font-size: 0.72rem; font-weight: 700;
          text-transform: uppercase; letter-spacing: 0.07em; color: #9ca3af; margin-bottom: 0.45rem;
        }

        .bam-input {
          width: 100%; box-sizing: border-box;
          background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 9px;
          color: #111827; padding: 0.65rem 0.9rem;
          font-size: 0.875rem; font-family: 'Plus Jakarta Sans', sans-serif; font-weight: 500;
          outline: none; transition: all 0.18s; display: block;
        }
        .bam-input:focus { border-color: #93c5fd; background: #fff; box-shadow: 0 0 0 3px rgba(59,130,246,0.1); }

        .bam-footer {
          display: flex; gap: 0.65rem;
          padding: 0.9rem 1.4rem 1.3rem;
          border-top: 1px solid #f3f4f6;
          position: sticky; bottom: 0; background: #fff;
          border-radius: 0 0 16px 16px;
        }

        .bam-cancel {
          flex: 1; background: #f3f4f6; border: 1px solid #e5e7eb;
          color: #374151; border-radius: 9px; padding: 0.68rem;
          font-size: 0.875rem; font-weight: 600; font-family: 'Plus Jakarta Sans', sans-serif;
          cursor: pointer; transition: all 0.15s;
        }
        .bam-cancel:hover:not(:disabled) { background: #e5e7eb; }

        .bam-confirm {
          flex: 2; background: #0d6efd; border: none; color: #fff;
          border-radius: 9px; padding: 0.68rem; font-size: 0.875rem; font-weight: 700;
          font-family: 'Plus Jakarta Sans', sans-serif; cursor: pointer; transition: all 0.18s;
          display: flex; align-items: center; justify-content: center; gap: 7px;
        }
        .bam-confirm:hover:not(:disabled) { background: #0b5ed7; box-shadow: 0 4px 14px rgba(13,110,253,0.3); }
        .bam-confirm:disabled, .bam-cancel:disabled { opacity: 0.5; cursor: not-allowed; }

        .bam-spinner {
          width: 14px; height: 14px;
          border: 2px solid rgba(255,255,255,0.35); border-top-color: #fff;
          border-radius: 50%; animation: spin 0.6s linear infinite; flex-shrink: 0;
        }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>

      <div className="bam-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
        <div className="bam-box">

          {/* Header */}
          <div className="bam-head">
            <div className="bam-head-left">
              <div className="bam-icon"><i className="bi bi-calendar-plus-fill"></i></div>
              <div>
                <div className="bam-title">Book Resource</div>
                <div className="bam-subtitle">{resource.resource_name}</div>
              </div>
            </div>
            <button className="bam-close-btn" onClick={onClose}>
              <i className="bi bi-x-lg" style={{ fontSize: '0.75rem' }}></i>
            </button>
          </div>

          {/* Body */}
          <div className="bam-body">

            {/* Quick info: type · building · floor */}
            <div className="bam-info-strip">
              {resource.resource_types?.type_name && (
                <><i className="bi bi-tag-fill"></i><span>{resource.resource_types.type_name}</span></>
              )}
              {resource.buildings?.building_name && (
                <><span className="sep">·</span><i className="bi bi-building"></i><span>{resource.buildings.building_name}</span></>
              )}
              {resource.floor_number != null && (
                <><span className="sep">·</span><i className="bi bi-layers"></i><span>Floor {resource.floor_number}</span></>
              )}
            </div>

            {/* Cupboard + Shelves */}
            {(hasCupboard || hasShelves) && (
              <>
                <div className="bam-section-label">Storage Location</div>
                <div className="bam-storage-grid">
                  {hasCupboard && (
                    <div className="bam-storage-card">
                      <div className="bam-storage-icon cupboard">
                        <i className="bi bi-archive-fill"></i>
                      </div>
                      <div>
                        <div className="bam-storage-label">Cupboard</div>
                        <div className="bam-storage-value">{resource.cupboards.cupboard_name}</div>
                      </div>
                    </div>
                  )}
                  {hasShelves && (
                    <div className="bam-storage-card">
                      <div className="bam-storage-icon shelf">
                        <i className="bi bi-bookshelf"></i>
                      </div>
                      <div>
                        <div className="bam-storage-label">Shelf</div>
                        <div className="bam-storage-value">Shelf {resource.shelves.shelf_number}</div>
                      </div>
                    </div>
                  )}
                </div>
              </>
            )}

            {/* Description if any */}
            {hasDescription && (
              <>
                <div className="bam-section-label">Description</div>
                <div className="bam-desc">{resource.description}</div>
              </>
            )}

            {(hasCupboard || hasShelves || hasDescription) && <div className="bam-divider"></div>}

            {error && (
              <div className="bam-error">
                <i className="bi bi-exclamation-triangle-fill"></i>
                {error}
              </div>
            )}

            {/* Booking form */}
            <div className="bam-section-label">Select Date & Time</div>
            <form onSubmit={handleSubmit} id="quickBookingForm">
              <div className="bam-field">
                <label className="bam-label">
                  <i className="bi bi-play-circle-fill" style={{ color: '#22c55e' }}></i>
                  Start Date & Time
                </label>
                <input type="datetime-local" name="start_datetime" className="bam-input" defaultValue={defaultStartTime} required />
              </div>
              <div className="bam-field">
                <label className="bam-label">
                  <i className="bi bi-stop-circle-fill" style={{ color: '#ef4444' }}></i>
                  End Date & Time
                </label>
                <input type="datetime-local" name="end_datetime" className="bam-input" defaultValue={defaultEndTime} required />
              </div>
            </form>

          </div>

          {/* Footer */}
          <div className="bam-footer">
            <button className="bam-cancel" onClick={onClose} disabled={isSubmitting}>Cancel</button>
            <button type="submit" form="quickBookingForm" className="bam-confirm" disabled={isSubmitting}>
              {isSubmitting
                ? <><div className="bam-spinner"></div> Booking…</>
                : <><i className="bi bi-check2"></i> Confirm Booking</>}
            </button>
          </div>

        </div>
      </div>
    </>
  )
}
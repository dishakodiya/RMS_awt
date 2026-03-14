// 'use client' 
// export default function SearchFilter() { 
// return ( 
//   <div className="search-filter-container"> 
//   <div className="row g-3 align-items-end"> 
//     {/* Search */} 
//     <div className="col-md-6"> 
//       <label className="form-label small text-muted fw-semibold"> Search </label> 
//       <div className="position-relative"> 
//         <i className="bi bi-search position-absolute" style={{ top: '50%', left: '12px', transform: 'translateY(-50%)', color: '#6c757d' }} ></i> 
//         <input type="text" className="form-control ps-5" placeholder="Search by name or email..." /> 
//       </div> 
//     </div> 
//     {/* Filter */} 
//     <div className="col-md-6"> 
//       <label className="form-label small text-muted fw-semibold"> Filter </label> 
//       <select className="form-select"> <option>All</option> <option>Admin</option> 
//       <option>User</option> <option>Approver</option> 
//       </select> 
//     </div> 
//   </div> 
// </div> 
// ) }


'use client'

type Props = {
  onSearch: (value: string) => void
  onRole: (value: string) => void
}

export default function SearchFilter({ onSearch, onRole }: Props) {
  return (
    <div className="search-filter-container">
      <div className="row g-3 align-items-end">

        {/* Search */}
        <div className="col-md-6">
          <label className="form-label small text-muted fw-semibold">Search</label>
          <div className="position-relative">
            <i className="bi bi-search position-absolute"
              style={{ top: '50%', left: '12px', transform: 'translateY(-50%)' }}
            />
            <input
              type="text"
              className="form-control ps-5"
              placeholder="Search by name or email..."
              onChange={(e) => onSearch(e.target.value)}
            />
          </div>
        </div>

        {/* Filter */}
        <div className="col-md-6">
          <label className="form-label small text-muted fw-semibold">Filter</label>
          <select
            className="form-select"
            onChange={(e) => onRole(e.target.value)}
          >
            <option>All</option>
            <option>Admin</option>
            <option>User</option>
            <option>Approver</option>
          </select>
        </div>

      </div>
    </div>
  )
}

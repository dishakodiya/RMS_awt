// 'use client'

// import Link from 'next/link'
// import { usePathname } from 'next/navigation'

// export default function Sidebar() {
//   const pathname = usePathname()

//   const isActive = (path: string) => pathname === path

//   const menuItems = [
//     { path: '/resource-types', label: 'Resource Types', icon: 'bi-tags' },
//     { path: '/buildings', label: 'Buildings', icon: 'bi-building' },
//     { path: '/facilities', label: 'Facilities', icon: 'bi-tools' },
//     { path: '/cupboards', label: 'Cupboards', icon: 'bi-archive' },
//     { path: '/shelves', label: 'Shelves', icon: 'bi-layers' },
//   ]

//   return (
//     <div className="sidebar d-none d-lg-block">
//       <div className="p-3">
//         <h6
//           className="text-muted text-uppercase small fw-semibold mb-3 px-2"
//           style={{ fontSize: '0.75rem', letterSpacing: '1px' }}
//         >
//           More Options
//         </h6>

//         <ul className="nav nav-pills flex-column">
//           {menuItems.map(item => (
//             <li key={item.path} className="nav-item">
//                 <Link
//                   href={item.path}
//                   className={`nav-link px-3 ${
//                     isActive(item.path) ? 'active text-primary fw-semibold' : 'text-dark'
//                   }`}
//                 >
//                   <i className={`bi ${item.icon} me-1`}></i>
//                   {item.label}
//                 </Link>
//               </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   )
// }


'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Sidebar() {
  const pathname = usePathname()

  const menuItems = [
    { path: '/resource-types', label: 'Resource Types', icon: 'bi-tags' },
    { path: '/buildings', label: 'Buildings', icon: 'bi-building' },
    { path: '/facilities', label: 'Facilities', icon: 'bi-tools' },
    { path: '/cupboards', label: 'Cupboards', icon: 'bi-archive' },
    { path: '/shelves', label: 'Shelves', icon: 'bi-layers' },
  ]

  const isActive = (path: string) =>
    pathname === path || pathname.startsWith(`${path}/`)

  return (
    <div className="sidebar d-none d-lg-block">
      <div className="p-3">
        <h6
          className="text-muted text-uppercase small fw-semibold mb-3 px-2"
          style={{ fontSize: '0.75rem', letterSpacing: '1px' }}
        >
          More Options
        </h6>

        <ul className="navbar-nav me-auto">
          {menuItems.map(item => {
            const active = isActive(item.path)

            return (
              <li key={item.path} className="nav-item">
                <Link
                   href={item.path}
                  className={`nav-link px-3 d-flex align-items-center gap-2 ${
                    isActive(item.path) ? 'active text-primary fw-semibold' : 'text-dark'
                  }`}
                >
                  <i className={`bi ${item.icon}`}></i>
                  {item.label}
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

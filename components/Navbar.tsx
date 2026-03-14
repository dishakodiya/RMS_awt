'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { TokenPayload } from '@/lib/auth'
import LogoutButton from './LogoutButton'

interface NavbarProps {
  user: TokenPayload | null;
}

export default function Navbar({ user }: NavbarProps) {
  const pathname = usePathname()

  const isActive = (path: string) => pathname === path

  if (!user) {
    return null; // Don't show navbar if not logged in
  }

  return (
    
    <nav
      className="navbar navbar-expand-lg navbar-light bg-white border-bottom fixed-top"
      style={{ zIndex: 1030, boxShadow: '0 2px 4px rgba(0,0,0,0.08)' }}
    >
      <div className="container-fluid px-4">
        {/* Logo */}
        <Link href="/" className="navbar-brand fw-semibold text-dark">
          <i className="bi bi-box-seam me-2 text-primary"></i>
          Resource Management System
        </Link>

        {/* Mobile Toggle */}
        <button
          className="navbar-toggler border-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Menu */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            {(() => {
              const isAdmin = user.role !== 'User';
              const basePath = (path: string) => isAdmin ? path : `/view-${path.substring(1)}`;
              
              const links = [
                { path: basePath('/dashboard'), label: 'Dashboard', icon: 'bi-speedometer2' },
                { path: basePath('/resources'), label: 'Resources', icon: 'bi-box-seam' },
                { path: basePath('/bookings'), label: 'Bookings', icon: 'bi-calendar-check' },
                { path: basePath('/maintenance'), label: 'Maintenance', icon: 'bi-wrench' },
                { path: basePath('/reports'), label: 'Reports', icon: 'bi-file-earmark-text' },
                { path: basePath('/users'), label: 'Users', icon: 'bi-people' },
              ];

              return links.map(item => (
                <li key={item.path} className="nav-item">
                  <Link
                    href={item.path}
                    className={`nav-link px-3 ${isActive(item.path) || (isAdmin === false && isActive(item.path.replace('/view-', '/'))) ? 'active text-primary fw-semibold' : 'text-dark'
                      }`}
                  >
                    <i className={`bi ${item.icon} me-1`}></i>
                    {item.label}
                  </Link>
                </li>
              ));
            })()}
          </ul>

          {/* Right side profile */}
          <div className="d-flex align-items-center">
            <div className="d-flex align-items-center me-3 text-dark">
              <i className="bi bi-person-circle me-2 fs-4"></i>
              <span className="fw-medium text-capitalize">{user.role}</span>
            </div>
            <LogoutButton />
          </div>
        </div>
      </div>
    </nav>
  
  )
}

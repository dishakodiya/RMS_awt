'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function PublicNavbar() {
  const pathname = usePathname()
  const router = useRouter()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const menuItems = [
    { path: '/user-dashboard', label: 'Dashboard', icon: 'bi-grid-1x2' },
    { path: '/my-bookings', label: 'My Bookings', icon: 'bi-calendar-check' },
  ]

  const isActive = (path: string) =>
    pathname === path || pathname.startsWith(`${path}/`)

  const handleLogout = async () => {
    try {
      const res = await fetch('/api/auth/logout', { method: 'POST' })
      if (res.ok) {
        router.push('/login')
        router.refresh()
      }
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
        .rm-nav-link-item {
          color: #6b7280;
          text-decoration: none;
          font-size: 0.875rem;
          font-weight: 500;
          padding: 0.45rem 0.9rem;
          border-radius: 8px;
          display: flex;
          align-items: center;
          gap: 7px;
          transition: all 0.18s ease;
          font-family: 'Plus Jakarta Sans', sans-serif;
        }
        .rm-nav-link-item:hover {
          color: #111827;
          background: #f3f4f6;
          text-decoration: none;
        }
        .rm-nav-link-item.active {
          color: #0d6efd;
          background: #eff4ff;
          font-weight: 600;
        }
        .rm-logout-btn {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 0.855rem;
          font-weight: 600;
          color: #6b7280;
          background: #f3f4f6;
          border: 1px solid #e5e7eb;
          padding: 0.42rem 1rem;
          border-radius: 8px;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 6px;
          transition: all 0.18s ease;
        }
        .rm-logout-btn:hover {
          background: #fee2e2;
          border-color: #fca5a5;
          color: #dc2626;
        }
        .rm-toggler {
          background: #f3f4f6;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          color: #6b7280;
          width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }
        .rm-brand-text {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-weight: 800;
          font-size: 1.05rem;
          color: #111827;
          text-decoration: none;
          display: flex;
          align-items: center;
          gap: 9px;
          letter-spacing: -0.02em;
        }
        .rm-brand-text:hover { color: #111827; text-decoration: none; }
        .rm-brand-text .dot { color: #0d6efd; }

           .rm-brand {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-weight: 700;
  font-size: 0.95rem;
  color: #111827;
  letter-spacing: -0.01em;
  display: flex;
  align-items: center;
  gap: 8px;
  text-decoration: none;
  transition: all 0.18s ease;
}

.rm-brand:hover {
  color: #0d6efd;
  text-decoration: none;
}

.rm-brand-icon {
  width: 34px;
  height: 34px;
  background: #eff4ff;
  border: 1px solid #dbeafe;
  border-radius: 9px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #0d6efd;
  font-size: 0.9rem;
}
        
        @media (max-width: 991px) {
          .rm-desktop-menu { display: none !important; }
          .rm-mobile-menu {
            display: flex;
            flex-direction: column;
            gap: 0.3rem;
            padding-top: 0.75rem;
            border-top: 1px solid #eff4ff;
            margin-top: 0.6rem;
          }
        }
        @media (min-width: 992px) {
          .rm-desktop-menu { display: flex !important; }
          .rm-mobile-menu { display: none !important; }
          .rm-toggler { display: none !important; }
        }
      `}</style>

      {/* KEY FIX: position sticky via inline style — cannot be overridden by stylesheets */}
      {/* <nav style={{
        position: 'sticky',
        top: 0,
        zIndex: 1030,
        background: '#ffffff',
        borderBottom: '1px solid #e8ecf0',
        boxShadow: '0 1px 8px rgba(0,0,0,0.06)',
        fontFamily: "'Plus Jakarta Sans', sans-serif",
      }}>
        <div className="container" style={{ padding: '0.65rem 1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}> */}
      {/* <nav
        className="navbar navbar-expand-lg navbar-light bg-white border-bottom fixed-top"
        style={{ zIndex: 1030, boxShadow: '0 2px 4px rgba(0,0,0,0.08)' }}
      > */}
     <nav
  className="navbar navbar-expand-lg border-bottom fixed-top"
  style={{
    backgroundColor: '#fff',
    zIndex: 1030,
    boxShadow: '0 2px 4px rgba(0,0,0,0.08)'
  }}
>
        <div className="container-fluid px-4">
          {/* Logo */}

          {/* <Link
            href="/"
            className="navbar-brand fw-semibold text-dark d-flex align-items-center"
            style={{ marginLeft: "89px" }}
          >
            <i className="bi bi-box-seam me-2 text-primary"></i>
            Resource Management System
          </Link> */}
          <Link href="/user-dashboard" className="rm-brand" style={{ marginLeft: "89px" }}>
  <div className="rm-brand-icon">
    <i className="bi bi-box-seam"></i>
  </div>
  Resource Management System
</Link>

          {/* Desktop menu */}
          <div className="rm-desktop-menu" style={{ alignItems: 'center', gap: '0.35rem' }}>
            {menuItems.map((item) => (
              <Link key={item.path} href={item.path} className={`rm-nav-link-item ${isActive(item.path) ? 'active' : ''}`}>
                <i className={`bi ${item.icon}`}></i>
                {item.label}
              </Link>
            ))}
            <div style={{ width: 1, height: 18, background: '#e5e7eb', margin: '0 0.4rem' }}></div>
            <button onClick={handleLogout} className="rm-logout-btn">
              <i className="bi bi-box-arrow-right"></i>
              Logout
            </button>
          </div>

          {/* Mobile toggle */}
          <button className="rm-toggler" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle navigation">
            <i className={`bi ${isMenuOpen ? 'bi-x-lg' : 'bi-list'}`} style={{ fontSize: '1rem' }}></i>
          </button>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="rm-mobile-menu">
            {menuItems.map((item) => (
              <Link key={item.path} href={item.path} className={`rm-nav-link-item ${isActive(item.path) ? 'active' : ''}`} onClick={() => setIsMenuOpen(false)}>
                <i className={`bi ${item.icon}`}></i>
                {item.label}
              </Link>
            ))}
            <button onClick={handleLogout} className="rm-logout-btn" style={{ marginTop: '0.25rem', justifyContent: 'center' }}>
              <i className="bi bi-box-arrow-right"></i>
              Logout
            </button>
          </div>
        )}
        {/* </div> */}
      </nav>
    </>
  )
}
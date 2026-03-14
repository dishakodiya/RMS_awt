import React from "react"
import 'bootstrap-icons/font/bootstrap-icons.css'
import 'bootstrap/dist/css/bootstrap.min.css'

import Sidebar from "@/components/Sidebar";

export default function UsersLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="d-flex flex-column" style={{ minHeight: '100%' }}>
      <div className="d-flex flex-grow-1">
        <Sidebar />
        <main className="main-content flex-grow-1">
          {children}
        </main>
      </div>
    </div>
  )
}

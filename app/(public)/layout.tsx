// import React from "react"
// import 'bootstrap-icons/font/bootstrap-icons.css'
// import 'bootstrap/dist/css/bootstrap.min.css'

// import PublicNavbar from "@/components/PublicNavbar";

// export default function UsersLayout({
//   children,
// }: {
//   children: React.ReactNode
// }) {
//   return (
//     <div className="d-flex flex-column bg-light" style={{ minHeight: '100vh' }}>
//       <PublicNavbar />
//       <main className="flex-grow-1 p-4">
//         <div className="container">
//            {children}
//         </div>
//       </main>
//     </div>
//   )
// }


// import React from "react"
// import 'bootstrap-icons/font/bootstrap-icons.css'
// import 'bootstrap/dist/css/bootstrap.min.css'
// import PublicNavbar from "@/components/PublicNavbar"

// export default function UsersLayout({
//   children,
// }: {
//   children: React.ReactNode
// }) {
//   return (
//     <>
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');

//         .users-layout-root {
//           min-height: 100vh;
//           background: #0c0c10;
//           position: relative;
//           overflow-x: hidden;
//         }

//         .users-layout-root::before {
//           content: '';
//           position: fixed;
//           top: -40%;
//           left: -20%;
//           width: 70%;
//           height: 70%;
//           background: radial-gradient(ellipse, rgba(255,185,60,0.06) 0%, transparent 65%);
//           pointer-events: none;
//           z-index: 0;
//         }

//         .users-layout-root::after {
//           content: '';
//           position: fixed;
//           bottom: -30%;
//           right: -15%;
//           width: 60%;
//           height: 60%;
//           background: radial-gradient(ellipse, rgba(80, 120, 255, 0.05) 0%, transparent 65%);
//           pointer-events: none;
//           z-index: 0;
//         }

//         .users-layout-main {
//           position: relative;
//           z-index: 1;
//           padding: 2rem 1rem;
//           font-family: 'DM Sans', sans-serif;
//         }

//         @media (min-width: 768px) {
//           .users-layout-main {
//             padding: 2.5rem 2rem;
//           }
//         }
//       `}</style>

//       <div className="users-layout-root">
//         <PublicNavbar />
//         <main className="users-layout-main">
//           <div className="container-xl">
//             {children}
//           </div>
//         </main>
//       </div>
//     </>
//   )
// }


// import React from "react"
// import 'bootstrap-icons/font/bootstrap-icons.css'
// import 'bootstrap/dist/css/bootstrap.min.css'
// import PublicNavbar from "@/components/PublicNavbar"

// export default function UsersLayout({ children }: { children: React.ReactNode }) {
//   return (
//     <>
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
//         .users-layout-root {
//           min-height: 100vh;
//           background: #f5f7fa;
//           font-family: 'Plus Jakarta Sans', sans-serif;
//         }
//         .users-layout-main {
//           padding: 2rem 1rem;
//         }
//         @media (min-width: 768px) {
//           .users-layout-main { padding: 2.5rem 2rem; }
//         }
//       `}</style>
//       <div className="users-layout-root">   {/* ← NO overflow here */}
//         <PublicNavbar />                     {/* sticky works here */}
//         <main className="users-layout-main">
//           <div className="container-xl">
//             {children}
//           </div>
//         </main>
//       </div>
//     </>
//   )
// }




import React from "react"
import 'bootstrap-icons/font/bootstrap-icons.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import PublicNavbar from "@/components/PublicNavbar"

export default function UsersLayout({ children }: { children: React.ReactNode }) {
  return (
    
    <div  style={{ minHeight: '100vh', background: '#f5f7fa', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <PublicNavbar />

      <main style={{ padding: '2rem 1rem' }}>
      <div style={{ paddingTop: '64px' }}> 
        <div className="container-xl">
          {children}
        </div>
      </div>
      </main>
      
    </div>
  )
}
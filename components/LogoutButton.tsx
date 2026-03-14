
"use client";

import { useRouter } from 'next/navigation';

export default function LogoutButton() {
    const router = useRouter();

    const handleLogout = async () => {
        try {
            await fetch('/api/auth/logout', {
                method: 'POST',
            });
            router.push('/login');
            router.refresh();
        } catch (error) {
            console.error('Logout failed', error);
        }
    };

    return (
        <>
        <style>{`

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
      `}</style>
            <button onClick={handleLogout} className="rm-logout-btn" style={{ marginTop: '0.25rem', justifyContent: 'center' }}>
                <i className="bi bi-box-arrow-right"></i>
                Logout
            </button>
        </>
    );

}

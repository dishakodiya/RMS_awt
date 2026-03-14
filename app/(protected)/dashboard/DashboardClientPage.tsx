'use client'

import StatCard from '@/components/StatCard'
type DashboardStats = {
    totalResources: number
    totalBookings: number
    pendingApprovals: number
    upcomingBookings: number
    maintenanceAlerts: number
}
type MonthlyUsage = {
    month: string
    bookings: number
}
type RecentBooking = {
    booking_id: number
    status: string | null
    start_datetime: Date
    resources: {
        resource_name: string
    }
    users_bookings_user_idTousers: {
        name: string
    }
}

export default function DashboardClientPage({
    stats,
    monthlyUsage,
    recentBooking,
}: {
    stats: DashboardStats
    monthlyUsage: MonthlyUsage[]
    recentBooking: RecentBooking[]
}) {
    const totalResources = stats.totalResources
    const totalBookings = stats.totalBookings
    const pendingApprovals = stats.pendingApprovals
    const upcomingBookings = stats.upcomingBookings
    const maintenanceAlerts = stats.maintenanceAlerts

    return (
        <div>
            {/* Header */}
            <div className="page-header mb-4">
                <h1>
                    <i className="bi bi-speedometer2 me-2 text-primary"></i>
                    Dashboard
                </h1>
                <p className="text-muted mb-0">
                    Welcome to your resource management dashboard
                </p>
            </div>

            {/* Stats */}
            <div className="row g-4 mb-4 row-cols-1 row-cols-md-2 row-cols-xl-5">
                <div className="col">
                    <StatCard title="Total Resources" value={totalResources} icon="bi-box-seam" />
                </div>
                <div className="col">
                    <StatCard title="Total Bookings" value={totalBookings} icon="bi-calendar-check" color="info" />
                </div>
                <div className="col">
                    <StatCard title="Pending Approvals" value={pendingApprovals} icon="bi-clock-history" color="warning" />
                </div>
                <div className="col">
                    <StatCard title="Upcoming Bookings" value={upcomingBookings} icon="bi-calendar-event" color="success" />
                </div>
                <div className="col">
                    <StatCard title="Maintenance Alerts" value={maintenanceAlerts} icon="bi-exclamation-triangle" color="danger" />
                </div>
            </div>

            <div className="row g-4">
                {/* Monthly Chart */}
                <div className="col-lg-8">
                    <div className="card h-100">
                        <div className="card-header">
                            <h5 className="mb-0">
                                <i className="bi bi-bar-chart me-2 text-primary"></i>
                                Monthly Usage
                            </h5>
                        </div>

                        <div className="card-body">
                            <div
                                className="d-flex justify-content-between align-items-end"
                                style={{ height: 250 }}
                            >
                                {monthlyUsage.map((item) => (
                                    <div key={item.month} className="text-center flex-fill mx-1">
                                        <div
                                            className="rounded-top"
                                            style={{
                                                height: `${item.bookings * 50}px`,
                                                background: 'linear-gradient(180deg,#667eea,#764ba2)',
                                            }}
                                        />
                                        <small className="fw-semibold d-block mt-2">{item.month}</small>
                                        <small className="text-muted">{item.bookings}</small>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Recent Bookings */}
                <div className="col-lg-4">
                    <div className="card h-100">
                        <div className="card-header">
                            <h5 className="mb-0">
                                <i className="bi bi-list-ul me-2 text-primary"></i>
                                Recent Bookings
                            </h5>
                        </div>

                        <div className="list-group list-group-flush">
                            {recentBooking.length === 0 && (
                                <div className="list-group-item text-muted text-center">
                                    No recent bookings
                                </div>
                            )}

                            {recentBooking.map((booking) => (
                                <div key={booking.booking_id} className="list-group-item">
                                    <div className="d-flex justify-content-between">
                                        <div>
                                            <div className="fw-semibold">
                                                {booking.resources.resource_name}
                                            </div>
                                            <small className="text-muted">
                                                {new Date(booking.start_datetime).toLocaleDateString()}
                                                {' • '}
                                                {booking.users_bookings_user_idTousers.name}
                                            </small>
                                        </div>

                                        <span
                                            className={`badge ${booking.status === 'Approved'
                                                ? 'bg-success'
                                                : booking.status === 'Pending'
                                                    ? 'bg-warning'
                                                    : 'bg-danger'
                                                }`}
                                        >
                                            {booking.status ?? 'Unknown'}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

import { prisma } from '@/lib/prisma'
import DashboardClientPage from './DashboardClientPage'

export const runtime = 'nodejs'

export default async function DashboardPage() {
  // Total resources
  const totalResources = await prisma.resources.count()

  // Total bookings
  const totalBookings = await prisma.bookings.count()

  // Pending approvals
  const pendingApprovals = await prisma.bookings.count({
    where: { status: 'Pending' },
  })

  // Upcoming bookings (future start date)
  const upcomingBookings = await prisma.bookings.count({
    where: {
      start_datetime: {
        gt: new Date(),
      },
    },
  })

  // Maintenance alerts (example: not completed)
  const maintenanceAlerts = await prisma.maintenance.count({
    where: {
      status: { not: 'Completed' },
    },
  })
  // ===== MONTHLY USAGE =====
  const year = new Date().getFullYear()

  const bookings = await prisma.bookings.findMany({
    where: {
      start_datetime: {
        gte: new Date(`${year}-01-01`),
        lt: new Date(`${year + 1}-01-01`),
      },
    },
    select: {
      start_datetime: true,
    },
  })

  // Initialize months
  const monthlyUsage = [
    { month: 'Jan', bookings: 0 },
    { month: 'Feb', bookings: 0 },
    { month: 'Mar', bookings: 0 },
    { month: 'Apr', bookings: 0 },
    { month: 'May', bookings: 0 },
    { month: 'Jun', bookings: 0 },
    { month: 'Jul', bookings: 0 },
    { month: 'Aug', bookings: 0 },
    { month: 'Sep', bookings: 0 },
    { month: 'Oct', bookings: 0 },
    { month: 'Nov', bookings: 0 },
    { month: 'Dec', bookings: 0 },
  ]

  // Count bookings per month
  bookings.forEach((b) => {
    const monthIndex = new Date(b.start_datetime).getMonth()
    monthlyUsage[monthIndex].bookings += 1
  })

  // ===== RECENT BOOKINGS =====
  const recentBookings = await prisma.bookings.findMany({
    orderBy: {
      created_at: 'desc',
    },
    take: 5,
    include: {
      resources: {
        select: {
          resource_name: true,
        },
      },
      users_bookings_user_idTousers: {
        select: {
          name: true,
        },
      },
    },
  })

  return (
    <DashboardClientPage
      stats={{
        totalResources,
        totalBookings,
        pendingApprovals,
        upcomingBookings,
        maintenanceAlerts,
      }}
      monthlyUsage={monthlyUsage}
      recentBooking={recentBookings}
    />
  )

}


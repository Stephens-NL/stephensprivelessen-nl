/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_PUBLIC_GOOGLE_CALENDAR_URL: 'https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ0ExnxClOFAOP1PMhPF8Fw8-1cRnQbplBUH6MxBrpofDsNARyMG9pjDafwA-D2dS2UGXyO6Qpl_'
  },
  typescript: {
    // Temporarily ignore TypeScript errors during build
    ignoreBuildErrors: true,
  },
}

module.exports = nextConfig 
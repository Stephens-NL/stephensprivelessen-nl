/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_PUBLIC_GOOGLE_CALENDAR_URL: 'https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ0ExnxClOFAOP1PMhPF8Fw8-1cRnQbplBUH6MxBrpofDsNARyMG9pjDafwA-D2dS2UGXyO6Qpl_'
  },
  typescript: {
    // We want to catch type errors during development and CI
    ignoreBuildErrors: process.env.VERCEL_ENV === 'production',
  },
  // Ensure test files are excluded from the build
  webpack: (config, { dev, isServer }) => {
    config.module.rules.push({
      test: /\.(test|spec)\.(js|ts|tsx)$/,
      loader: 'ignore-loader',
    });
    return config;
  },
  // Optimize output
  swcMinify: true,
  poweredByHeader: false,
}

module.exports = nextConfig 
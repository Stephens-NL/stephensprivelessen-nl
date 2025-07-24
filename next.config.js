/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_PUBLIC_GOOGLE_CALENDAR_URL: 'https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ0ExnxClOFAOP1PMhPF8Fw8-1cRnQbplBUH6MxBrpofDsNARyMG9pjDafwA-D2dS2UGXyO6Qpl_'
  },
  typescript: {
    // Enable type checking in development, ignore in production for faster builds
    ignoreBuildErrors: process.env.NODE_ENV === 'production',
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
  poweredByHeader: false,
  // Move serverComponentsExternalPackages to the top level
  serverExternalPackages: ['@vercel/og'],
}

module.exports = nextConfig 
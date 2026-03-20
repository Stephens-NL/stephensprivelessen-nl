const createNextIntlPlugin = require('next-intl/plugin');
const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  env: {
    NEXT_PUBLIC_GOOGLE_CALENDAR_URL: 'https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ0ExnxClOFAOP1PMhPF8Fw8-1cRnQbplBUH6MxBrpofDsNARyMG9pjDafwA-D2dS2UGXyO6Qpl_'
  },
  poweredByHeader: false,
  async redirects() {
    return [
      // Removed pages — 301 redirect to preserve SEO juice
      { source: '/services', destination: '/', permanent: true },
      { source: '/en/services', destination: '/en', permanent: true },
      { source: '/booking', destination: '/contact', permanent: true },
      { source: '/en/booking', destination: '/en/contact', permanent: true },
      // Consolidated location pages → privelessen hub
      { source: '/privelessen/amsterdam-zuid', destination: '/privelessen', permanent: true },
      { source: '/privelessen/amsterdam-centrum', destination: '/privelessen', permanent: true },
      { source: '/privelessen/amsterdam-noord', destination: '/privelessen', permanent: true },
      { source: '/privelessen/amsterdam-west', destination: '/privelessen', permanent: true },
      { source: '/privelessen/amsterdam-oost', destination: '/privelessen', permanent: true },
      { source: '/en/privelessen/amsterdam-:area', destination: '/en/privelessen', permanent: true },
    ];
  },
};

module.exports = withNextIntl(nextConfig);

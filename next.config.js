const createNextIntlPlugin = require('next-intl/plugin');
const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  env: {
    NEXT_PUBLIC_GOOGLE_CALENDAR_URL: 'https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ0ExnxClOFAOP1PMhPF8Fw8-1cRnQbplBUH6MxBrpofDsNARyMG9pjDafwA-D2dS2UGXyO6Qpl_'
  },
poweredByHeader: false,
};

module.exports = withNextIntl(nextConfig);

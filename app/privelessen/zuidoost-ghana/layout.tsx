import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Weekend Tutoring in Zuidoost | By Stephen | €30/hour',
  description: 'Expert tutoring by Stephen, a Ghanaian tutor who understands both academic excellence and cultural connection. From improving his own grades dramatically to helping others succeed, he offers personalized tutoring in Amsterdam Zuidoost. Special community rate of €30/hour (regular €60). Available at Douwe Egberts or home tutoring in Gein.',
  openGraph: {
    title: 'Weekend Tutoring in Zuidoost | By Stephen | €30/hour',
    description: 'Expert tutoring by Stephen, a Ghanaian tutor who understands both academic excellence and cultural connection. From improving his own grades dramatically to helping others succeed, he offers personalized tutoring in Amsterdam Zuidoost. Special community rate of €30/hour (regular €60). Available at Douwe Egberts or home tutoring in Gein.',
  },
};

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return children;
} 
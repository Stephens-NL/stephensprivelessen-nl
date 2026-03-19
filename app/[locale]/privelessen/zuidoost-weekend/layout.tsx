import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Weekend Tutoring in Zuidoost | By Stephen | €30/hour',
  description: "Expert weekend tutoring by Stephen, who turned his own academic journey into a passion for teaching. From struggling with math to achieving excellence, he now offers personalized tutoring in Amsterdam Zuidoost. Special community rate of €30/hour (regular €60). Available at Douwe Egberts or home tutoring in Gein.",
  openGraph: {
    title: 'Weekend Tutoring in Zuidoost | By Stephen | €30/hour',
    description: "Expert weekend tutoring by Stephen, who turned his own academic journey into a passion for teaching. From struggling with math to achieving excellence, he now offers personalized tutoring in Amsterdam Zuidoost. Special community rate of €30/hour (regular €60). Available at Douwe Egberts or home tutoring in Gein.",
  },
};

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return children;
} 
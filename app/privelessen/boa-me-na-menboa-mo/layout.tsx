import type { Metadata } from 'next';
import { Space_Grotesk } from 'next/font/google';

const spaceGrotesk = Space_Grotesk({ 
  subsets: ['latin'],
  variable: '--font-space-grotesk',
});

export const metadata: Metadata = {
  title: 'Boa me na menboa mo | Weekend Tutoring by Stephen | €30/hour',
  description: "Expert weekend tutoring by Stephen, who combines his Ghanaian heritage with academic excellence. From turning his own grades around to helping others succeed, he offers personalized tutoring in Amsterdam Zuidoost. Special community rate of €30/hour (regular €60). Available at Douwe Egberts or home tutoring in Gein.",
  openGraph: {
    title: 'Boa me na menboa mo | Weekend Tutoring by Stephen | €30/hour',
    description: "Expert weekend tutoring by Stephen, who combines his Ghanaian heritage with academic excellence. From turning his own grades around to helping others succeed, he offers personalized tutoring in Amsterdam Zuidoost. Special community rate of €30/hour (regular €60). Available at Douwe Egberts or home tutoring in Gein.",
  },
};

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className={`${spaceGrotesk.variable} font-sans`}>
      <div className="fixed inset-0 bg-gradient-to-br from-amber-950 via-amber-900 to-yellow-900 -z-10" />
      <div className="min-h-screen">
        {children}
      </div>
    </div>
  );
} 
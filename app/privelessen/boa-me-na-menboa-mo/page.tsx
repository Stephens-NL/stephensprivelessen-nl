import { Metadata } from 'next';
import { WeekendGhanaContent } from '@/components/privelessen/WeekendGhanaContent';

export const metadata: Metadata = {
  title: 'Boa me na menboa wo | Weekend Tutoring for Ghanaian Youth Amsterdam',
  description: 'Weekend tutoring for the Ghanaian community in Amsterdam Zuidoost. Ɛyɛ mmerɛw! (It\'s easy!) €30 per hour with neighborhood discount. Me ne wo bɛyɛ adwuma! (Let\'s work together!) Free trial lesson available. Nhyira ne asomdwee! (Blessings and peace!)',
  keywords: [
    // Twi keywords
    'boa me na menboa wo amsterdam',
    'nea onnim no sua a ohu',
    'yɛbɛyɛ bi akɔ education',
    'sankofa tutoring zuidoost',
    'akwaaba tutoring amsterdam',
    'adesua ne ahoto',  // education and comfort
    'nyansa ne nkabom', // wisdom and unity
    
    // English keywords
    'ghanaian tutoring amsterdam',
    'weekend tutoring southeast',
    'african education zuidoost',
    'ghana homework help',
    'amsterdam ghanaian youth',
    'math tutoring ghanaian',
    'affordable tutoring southeast',
    
    // Mixed keywords
    'twi speaking tutor amsterdam',
    'ghana education zuidoost',
    'african success coaching',
    'bijles ghanaian community',
    'homework guidance ghana'
  ],
  openGraph: {
    title: 'Boa me na menboa wo | Together We Learn, Together We Succeed',
    description: 'Quality weekend tutoring for Ghanaian youth in Amsterdam Zuidoost. Affordable rates, experienced tutor, free trial lesson. Yɛbɛyɛ bi akɔ! (We will make it!)',
  }
};

export default function WeekendGhanaPage() {
  return <WeekendGhanaContent />;
} 
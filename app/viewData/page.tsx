'use client';

import dynamic from 'next/dynamic';

const FeedbackDataViewer = dynamic(
  () => import('../../components/FeedbackSystem/FeedbackDataViewer'),
  { ssr: false }
);

const page = () => {
  return (
    <FeedbackDataViewer />
  )
}

export default page
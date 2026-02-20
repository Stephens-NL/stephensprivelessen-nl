'use client';

import dynamic from 'next/dynamic';

const FeedbackDataViewer = dynamic(
  () => import('../../components/FeedbackSystem/FeedbackDataViewer'),
  { ssr: false }
);

export default function ViewDataContent() {
  return <FeedbackDataViewer />;
}

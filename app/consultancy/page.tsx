import type { Metadata } from 'next';
import { metadata as consultancyMetadata } from './metadata';
import ConsultancyContent from './ConsultancyContent';

export const metadata: Metadata = consultancyMetadata;

export default function ConsultancyPage() {
  return <ConsultancyContent />;
}

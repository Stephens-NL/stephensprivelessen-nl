import type { Metadata } from 'next';
import WorkshopsContent from '@/components/workshops/WorkshopsContent';
import { metadata as workshopsMetadata, jsonLd } from './metadata';

export const metadata: Metadata = workshopsMetadata;

export default function WorkshopsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <WorkshopsContent />
    </>
  );
} 
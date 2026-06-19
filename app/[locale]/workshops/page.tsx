import { JsonLd } from '@/components/JsonLd';
import WorkshopsContent from '@/components/workshops/WorkshopsContent';
import { jsonLd } from './metadata';

export { generateMetadata } from './metadata';

export default function WorkshopsPage() {
  return (
    <>
      <JsonLd data={jsonLd} />
      <WorkshopsContent />
    </>
  );
} 
export { generateMetadata } from './metadata';
import ConsultancyContent from './ConsultancyContent';
import { jsonLd } from './metadata';
import { JsonLd } from '@/components/JsonLd';

export default function ConsultancyPage() {
  return (
    <>
      <JsonLd data={jsonLd} />
      <ConsultancyContent />
    </>
  );
}

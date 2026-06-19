export { generateMetadata } from './metadata';
import ScriptiebegeleidingContent from './ScriptiebegeleidingContent';
import { jsonLd } from './metadata';
import { JsonLd } from '@/components/JsonLd';

export default function ScriptiebegeleidingPage() {
  return (
    <>
      <JsonLd data={jsonLd} />
      <ScriptiebegeleidingContent />
    </>
  );
}

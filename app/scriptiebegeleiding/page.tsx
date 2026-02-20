import type { Metadata } from 'next';
import { metadata as scriptiebegeleidingMetadata } from './metadata';
import ScriptiebegeleidingContent from './ScriptiebegeleidingContent';

export const metadata: Metadata = scriptiebegeleidingMetadata;

export default function ScriptiebegeleidingPage() {
  return <ScriptiebegeleidingContent />;
}

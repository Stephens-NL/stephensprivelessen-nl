import type { Metadata } from 'next';
import { metadata as mboRekenenMetadata } from './metadata';
import MboRekenenContent from './MboRekenenContent';

export const metadata: Metadata = mboRekenenMetadata;

export default function MboRekenenPage() {
  return <MboRekenenContent />;
}

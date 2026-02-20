import type { Metadata } from 'next';
import { metadata as boaMetadata } from './metadata';
import BoaContent from './BoaContent';

export const metadata: Metadata = boaMetadata;

export default function BoaPage() {
  return <BoaContent />;
}

import type { Metadata } from 'next';
import { metadata as mboRekenenMetadata } from './metadata';

export const metadata: Metadata = mboRekenenMetadata;

export default function MboRekenenLayout({ children }: { children: React.ReactNode }) {
  return children;
}

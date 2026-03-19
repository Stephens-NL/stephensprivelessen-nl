import './globals.css';

// Root layout passes through to [locale]/layout.tsx which renders <html> and <body>
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

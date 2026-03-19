// Custom layout for aantekeningen page - no navbar or footer
export default function AantekeningenLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="fixed inset-0 z-50 bg-white">
      {children}
    </div>
  );
}

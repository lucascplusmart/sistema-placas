import Header from '@/components/header';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen w-full">
      <Header />
      <main>{children}</main>
    </div>
  );
}

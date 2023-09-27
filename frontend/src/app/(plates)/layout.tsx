import Header from '@/components/header';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen min-w-full">
      <Header />
      <main className="flex items-center justify-center min-h-screen min-w-full">
        {children}
      </main>
    </div>
  );
}

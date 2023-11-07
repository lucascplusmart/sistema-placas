'use client';

import Header from '@/components/header';

import { BellRing } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import userAlert from '@/functions/user/user-alert';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { toast } = useToast();

  const handleToast = () => {
    toast({
      variant: 'destructive',
      title: 'Alerta',
      description:
        'Inconsistência de dados ou equipamentos foram detectados no sistema',
      duration: 2000,
    });
  };

  const handleAlert = () => {
    userAlert()
      .then((res) => console.log(res))
      .finally(() => {
        handleToast();
      });
  };

  return (
    <div className="flex flex-col min-h-screen min-w-full">
      <Header />
      <main className="relative flex items-center justify-center min-h-screen min-w-full">
        {children}
        <Button
          variant="destructive"
          size="icon"
          className="absolute w-14 h-14 bottom-24 left-8 rounded-full"
          onClick={handleAlert}
        >
          <BellRing />
        </Button>
      </main>
    </div>
  );
}

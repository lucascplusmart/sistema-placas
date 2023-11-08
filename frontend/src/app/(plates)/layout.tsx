'use client';

import Header from '@/components/header';

import { BellRing } from 'lucide-react';

import { Button } from '@/components/ui/button';

import userAlert from '@/functions/user/user-alert';

import showToast from '@/utils/show-toast';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const handleAlert = () => {
    userAlert()
      .then((res) => {
        showToast(
          'Alerta',
          'Inconsistência de dados ou equipamentos foram detectados no sistema!',
          true
        );
      })
      .catch((e) => {
        showToast('Erro', 'Ocorreu um erro ao acionar o alerta!', true);
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

'use client';

import Header from '@/components/header';

import { useState } from 'react';

import { BellRing } from 'lucide-react';

import { Button } from '@/components/ui/button';

import userAlert from '@/functions/user/user-alert';

import showToast from '@/utils/show-toast';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isFetching, setIsFetching] = useState(false);

  const handleAlert = () => {
    setIsFetching(true);

    userAlert()
      .then(() => {
        showToast(
          'Alerta',
          'Inconsistência de dados ou equipamentos foram detectados no sistema!',
          true
        );
      })
      .catch((e) => {
        console.log(e);
        showToast('Erro', 'Ocorreu um erro ao acionar o alerta!', true);
      })
      .finally(() => {
        setIsFetching(false);
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
          disabled={isFetching}
        >
          <BellRing />
        </Button>
      </main>
    </div>
  );
}

'use client';

import Link from 'next/link';

import Header from '@/components/header';

import { useEffect, useState } from 'react';

import { redirect } from 'next/navigation';

import { BellRing, Cpu } from 'lucide-react';

import { Button } from '@/components/ui/button';

import userAlert from '@/functions/user/user-alert';

import showToast from '@/utils/show-toast';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isFetching, setIsFetching] = useState(false);
  const [userToken, setUserToken] = useState('');

  // Checando se existe um token
  useEffect(() => {
    setUserToken(sessionStorage.getItem('auth-token') || '');
  }, [userToken]);

  // Função para alertar usuário ao click
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

  const handleSensor = () => {
    redirect('/sensor');
  };

  if (userToken === null) {
    console.log(userToken);
    showToast('Erro', 'Usuário não autenticado!', true);
    redirect('/login');
  }

  return (
    <div className="flex flex-col min-h-screen min-w-full">
      <Header />
      <main className="relative flex items-center justify-center min-h-screen min-w-full">
        {children}
        <div className="flex flex-col-reverse items-center justify-center gap-3 absolute bottom-24 left-8">
          <Button
            variant="destructive"
            title="Emitir alerta"
            size="icon"
            className="w-14 h-14 rounded-full"
            onClick={handleAlert}
            disabled={isFetching}
          >
            <BellRing />
          </Button>
          <Button
            asChild
            variant="secondary"
            title="Ir para sensores"
            size="icon"
            className="w-14 h-14 rounded-full"
            onClick={handleSensor}
            disabled={isFetching}
          >
            <Link href="/sensor">
              <Cpu />
            </Link>
          </Button>
        </div>
      </main>
    </div>
  );
}

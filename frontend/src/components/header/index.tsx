'use client';

import Link from 'next/link';

import { usePathname } from 'next/navigation';

import { Separator } from '@/components/ui/separator';

import { LogOut } from 'lucide-react';

const Header = () => {
  const pathname = usePathname();

  const handleLogout = () => {
    sessionStorage.removeItem('auth-token');
  };

  return (
    <header className="w-full h-12 px-5 flex items-center content-around bg-zinc-900 text-zinc-50">
      <span className="text-xl me-auto">Sistema de placas</span>
      <nav className="ms-auto flex gap-10 text-sm">
        <Link
          data-currentroute={pathname === '/user-registry' ? true : false}
          className="hover:text-zinc-300 data-[currentroute=true]:text-blue-500"
          href={'/user-registry'}
        >
          Cadastrar usuário
        </Link>
        <Separator
          orientation="vertical"
          className="h-6 bg-zinc-500"
        />
        <Link
          data-currentroute={pathname === '/plate-registry' ? true : false}
          className="hover:text-zinc-300 data-[currentroute=true]:text-blue-500"
          href={'/plate-registry'}
        >
          Registrar placa
        </Link>
        <Link
          data-currentroute={pathname === '/plate-report' ? true : false}
          className="hover:text-zinc-300 data-[currentroute=true]:text-blue-500"
          href={'/plate-report'}
        >
          Relatório de placa
        </Link>
        <Link
          data-currentroute={pathname === '/plate-search' ? true : false}
          className="hover:text-zinc-300 data-[currentroute=true]:text-blue-500"
          href={'/plate-search'}
        >
          Consultar placa
        </Link>
        <Separator
          orientation="vertical"
          className="h-6 bg-zinc-500"
        />
        <Link
          className="hover:text-zinc-300 data-[currentroute=true]:text-blue-500"
          title="Logout"
          href={'/login'}
          onClick={handleLogout}
        >
          <LogOut />
        </Link>
      </nav>
    </header>
  );
};

export default Header;

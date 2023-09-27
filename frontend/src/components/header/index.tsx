'use client';

import Link from 'next/link';

import { usePathname } from 'next/navigation';

type Props = {};

const Header = (props: Props) => {
  const pathname = usePathname();

  return (
    <header className="w-full h-12 px-5 flex items-center content-around bg-zinc-900 text-zinc-50">
      <span className="text-xl">Sistema de placas</span>
      <nav className="ms-auto flex gap-10">
        <Link
          data-currentroute={pathname === '/registry' ? true : false}
          className="hover:text-zinc-300 data-[currentroute=true]:text-blue-500"
          href={'/registry'}
        >
          Registrar
        </Link>
        <Link
          data-currentroute={pathname === '/report' ? true : false}
          className="hover:text-zinc-300 data-[currentroute=true]:text-blue-500"
          href={'/report'}
        >
          Relatório
        </Link>
        <Link
          data-currentroute={pathname === '/search' ? true : false}
          className="hover:text-zinc-300 data-[currentroute=true]:text-blue-500"
          href={'/search'}
        >
          Consultar
        </Link>
      </nav>
    </header>
  );
};

export default Header;

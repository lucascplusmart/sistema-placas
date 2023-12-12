'use client';

import { useState } from 'react';

import { fetcher } from '@/hooks/use-plate';

import { SubmitHandler, useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';

import { Loader2 } from 'lucide-react';

import showToast from '@/utils/show-toast';

import PlateProps from '@/interfaces/plate';

import SearchPlateDialog from '@/components/dialog/search-plate';

type formProps = {
  plate: string;
};

const Search = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<formProps>();

  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState<PlateProps | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onSubmit: SubmitHandler<formProps> = (plateData) => {
    setIsLoading(true);

    fetcher(`placas/consulta/${plateData.plate}`)
      .then((res) => {
        setData(res.placa);
      })
      .catch((e) => {
        console.error(e);
        showToast('Erro', 'Ocorreu um erro ao buscar a placa', true);
      })
      .finally(() => {
        setIsLoading(false), setIsOpen(true);
      });
  };

  return (
    <div className="flex flex-col w-full h-full items-center justify-start">
      <div className="w-1/2 lg:w-1/3 h-2/3 flex flex-col items-center bg-white rounded p-3">
        <div className="flex flex-col items-start w-full">
          <h1 className="text-xl text-blue-500 font-semibold">
            Consulta de placas
          </h1>
          <h2 className="text-md text-zinc-500">Busque pela sua placa</h2>
        </div>

        <form
          className="mt-5 gap-3 flex flex-col items-start w-full"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex items-start justify-between w-full ">
            <input
              className="w-1/2 shadow appearance-none border rounded py-2 px-3 text-zinc-700 text-md leading-tight focus:outline-blue-500 focus:shadow-outline transition"
              id="plate_input"
              type="text"
              placeholder="Digite sua placa"
              {...register('plate')}
              disabled={isLoading}
              required
            />

            <Button
              className="text-white py-2 px-3 cursor-pointer rounded"
              type="submit"
              disabled={isLoading}
            >
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Pesquisar
            </Button>
          </div>
        </form>

        <SearchPlateDialog
          data={data}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />
      </div>
    </div>
  );
};

export default Search;

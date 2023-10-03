'use client';

import { useState } from 'react';

import { SubmitHandler, useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';

import { fetcher } from '@/hooks/use-report';

import { Loader2 } from 'lucide-react';

type formProps = {
  plate: string;
};

const Report = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<formProps>();

  const [isUpdating, setIsUpdating] = useState(false);

  const onSubmit: SubmitHandler<formProps> = (data) => {
    setIsUpdating(true);

    fetcher(`relatorio/cidade/${data.plate}`)
      .then((res) => {
        // Setting various property values
        let alink = document.createElement('a');
        alink.href = `http://localhost:8080/api/placas/relatorio/cidade/${data.plate}`;
        alink.setAttribute('download', 'relatorio.pdf');
        alink.click();
      })
      .finally(() => {
        setIsUpdating(false);
      });
  };

  return (
    <div className="flex flex-col w-full h-full items-center justify-start">
      <div className="w-1/2 lg:w-1/3 h-2/3 flex flex-col items-center bg-white rounded p-3">
        <div className="flex flex-col items-start w-full">
          <h1 className="text-xl text-blue-500 font-semibold">Relatório</h1>
          <h2 className="text-md text-zinc-500">
            Gere um relatório de acordo com a cidade
          </h2>
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
              disabled={isUpdating}
              required
            />

            <Button
              className="text-white py-2 px-3 cursor-pointer rounded"
              type="submit"
              disabled={isUpdating}
            >
              {isUpdating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Pesquisar
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Report;

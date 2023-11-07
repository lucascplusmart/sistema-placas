'use client';

import { useState } from 'react';

import PlateProps from '@/interfaces/plate';

import { fetcher } from '@/hooks/use-plate';

import { SubmitHandler, useForm } from 'react-hook-form';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import { Label } from '@/components/ui/label';

import { Button } from '@/components/ui/button';

import { Loader2 } from 'lucide-react';

type formProps = {
  plate: string;
};

const Search = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<formProps>();

  const [resData, setResData] = useState<PlateProps>();
  const [isOpen, setIsOpen] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const onSubmit: SubmitHandler<formProps> = (data) => {
    setIsUpdating(true);

    fetcher(data.plate)
      .then((res) => {
        const plate_data = res.data.placa;
        setResData(plate_data);

        setIsOpen(true);
      })
      .catch((e) => {
        console.log(e);
      })
      .finally(() => {
        setIsUpdating(false);
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

        <Dialog
          open={isOpen}
          onOpenChange={setIsOpen}
        >
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
                {isUpdating && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                Pesquisar
              </Button>
            </div>
          </form>

          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Dados da placa</DialogTitle>
              <DialogDescription>
                Descrição dos dados da placa em questão
              </DialogDescription>
            </DialogHeader>
            <div className="flex flex-col w-full gap-3">
              {/* placa */}
              <div className="flex flex-col items-start">
                <Label
                  htmlFor="placa"
                  className="text-lg font-bold text-blue-500"
                >
                  Placa
                </Label>
                <span id="placa">{resData?.placa}</span>
              </div>

              {/* cidade */}
              <div className="flex flex-col items-start">
                <Label
                  htmlFor="cidade"
                  className="text-lg font-bold text-blue-500"
                >
                  Cidade
                </Label>
                <span id="cidade ">{resData?.cidade}</span>
              </div>

              {/* data */}
              <div className="flex flex-col items-start">
                <Label
                  htmlFor="data"
                  className="text-lg font-bold text-blue-500"
                >
                  Data
                </Label>
                <span id="data">{resData?.data}</span>
              </div>

              {/* hora */}
              <div className="flex flex-col items-start">
                <Label
                  htmlFor="hora"
                  className="text-lg font-bold text-blue-500"
                >
                  Hora
                </Label>
                <span id="hora">{resData?.hora}</span>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Search;

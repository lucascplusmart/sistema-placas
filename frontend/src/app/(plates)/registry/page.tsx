'use client';

import { useState } from 'react';

import PlateProps from '@/interfaces/plate';
import RegistryProps from '@/interfaces/plate-registry';

import { SubmitHandler, useForm } from 'react-hook-form';

import { fetcher } from '@/hooks/use-registry';

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

const Registry = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegistryProps>();

  const [isOpen, setIsOpen] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const [resData, setResData] = useState<PlateProps>();

  const onSubmit: SubmitHandler<RegistryProps> = (data) => {
    setIsUpdating(true);

    const formData = new FormData();
    formData.append('cidade', data.cidade);
    formData.append('image', data.image[0]);

    fetcher('/cadastroPlaca', formData)
      .then((res) => {
        const plate_data = res.data;
        console.log(plate_data), setResData(plate_data), console.log(res);
      })
      .finally(() => {
        setIsUpdating(false), setIsOpen(true);
      });
  };

  return (
    <div className="w-full flex items-center justify-center">
      <Dialog
        open={isOpen}
        onOpenChange={setIsOpen}
      >
        <form
          className="flex flex-col items-start gap-3 bg-zinc-50 w-1/2 lg:w-1/3 shadow-md rounded p-6"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="w-full text-blue-500 text-xl font-bold text-center mb-3">
            <h1>Cadastro de placas</h1>
          </div>
          <div className="mb-4 w-10/12">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="city_input"
            >
              Cidade
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-zinc-700 leading-tight focus:outline-blue-500 focus:shadow-outline transition"
              id="city_input"
              type="text"
              placeholder="Nome da cidade"
              disabled={isUpdating}
              {...register('cidade')}
              required
            />
          </div>
          <div className="mb-4 w-10/12">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="file_input"
            >
              Imagem
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-zinc-700 leading-tight cursor-pointer"
              id="file_input"
              type="file"
              accept="image/png"
              disabled={isUpdating}
              {...register('image')}
              required
            />
            <p className="p-2 text-zinc-600">.PNG</p>
          </div>
          <div className="w-full flex items-end justify-end">
            <Button
              className="cursor-pointer text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
              disabled={isUpdating}
            >
              {isUpdating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Enviar
            </Button>
          </div>
        </form>

        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Dados enviados com sucesso</DialogTitle>
            <DialogDescription>Descrição dos dados</DialogDescription>
          </DialogHeader>
          <div className="flex flex-col w-full gap-3">
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
  );
};

export default Registry;

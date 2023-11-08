'use client';

import { useState } from 'react';

import RegistryProps from '@/interfaces/plate-registry';

import { SubmitHandler, useForm } from 'react-hook-form';

import postRegistry from '@/hooks/use-registry';

import { Button } from '@/components/ui/button';

import { Loader2 } from 'lucide-react';
import showToast from '@/utils/show-toast';

const Registry = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegistryProps>();

  const [isUpdating, setIsUpdating] = useState(false);

  const onSubmit: SubmitHandler<RegistryProps> = (data) => {
    const formData = new FormData();
    formData.append('cidade', data.cidade);
    formData.append('image', data.image[0]);

    setIsUpdating(true);
    postRegistry(formData)
      .then((res) => {
        showToast('Sucesso!', 'Placa cadastrada com sucesso!', false);
      })
      .catch((e) => {
        showToast('Erro', 'Ocorreu um erro no cadastro!', true);
      })
      .finally(() => {
        setIsUpdating(false);
      });
  };

  return (
    <div className="w-full flex items-center justify-center">
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
    </div>
  );
};

export default Registry;

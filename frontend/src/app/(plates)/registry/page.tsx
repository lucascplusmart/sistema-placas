'use client';

import { SubmitHandler, useForm } from 'react-hook-form';

type Props = {};

interface formProps {
  city: string;
  image: File;
}

const Registry = (props: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<formProps>();

  const onSubmit: SubmitHandler<formProps> = (data) => {
    console.log(data);
  };

  return (
    <form
      className="flex flex-col items-start gap-3 bg-zinc-50 w-1/3 shadow-md rounded p-6"
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
          {...register('city')}
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
          {...register('image')}
          required
        />
        <p className="p-2 text-zinc-600">.PNG</p>
      </div>
      <div className="w-full flex items-end justify-end">
        <input
          className="bg-blue-500 hover:bg-blue-700 cursor-pointer text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
          value="Enviar"
        />
      </div>
    </form>
  );
};

export default Registry;

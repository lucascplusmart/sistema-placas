'use client';

import { fetcher } from '@/hooks/use-plate';
import { SubmitHandler, useForm } from 'react-hook-form';

type formProps = {
  plate: string;
};

const Search = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<formProps>();

  const onSubmit: SubmitHandler<formProps> = (data) => {
    console.log(data);
    fetcher(`consulta/${data.plate}`).then((res) => console.log(res));
  };

  return (
    <div className="flex flex-col w-full h-full items-center justify-start">
      <div className="w-1/3 h-2/3 flex flex-col items-center bg-white rounded p-3">
        <div className="flex flex-col items-start w-full">
          <h1 className="text-xl text-blue-500 font-semibold">Relatório</h1>
          <h2 className="text-md text-zinc-500">Consulte aqui sua placa</h2>
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
              required
            />

            <input
              className="bg-blue-500 hover:bg-blue-600 py-2 px-3 cursor-pointer rounded"
              type="submit"
              value="Pesquisar"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Search;

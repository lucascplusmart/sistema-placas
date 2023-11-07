'use client';

import React, { useState } from 'react';

import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';

import { SubmitHandler, useForm } from 'react-hook-form';

import { Loader2 } from 'lucide-react';

import { useToast } from '@/components/ui/use-toast';
import userRegistry from '@/functions/user/registry-user';

type UserRegistryProps = {
  email: string;
  password: string;
};

const UserRegistry = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserRegistryProps>();

  const [isUpdating, setIsUpdating] = useState(false);

  const { push } = useRouter();

  const { toast } = useToast();

  const callToast = (
    title: string,
    description: string,
    isDestructive: boolean
  ) => {
    toast({
      title: title,
      description: description,
      variant: isDestructive ? 'destructive' : 'default',
      duration: 2000,
    });
  };

  const onSubmit: SubmitHandler<UserRegistryProps> = (data) => {
    setIsUpdating(true);
    userRegistry(data.email, data.password)
      .then((res) => {
        console.log(res);
        callToast('Sucesso', 'Cadastro realizado!', false);
        push('/plate-registry');
      })
      .catch((e) => {
        console.log(e);
        callToast('Erro', 'Algo deu errado na requisição!', true);
      })
      .finally(() => {
        setIsUpdating(false);
      });
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-black">
      <form
        className="flex flex-col items-start gap-3 border border-solid border-zinc-500 bg-black w-1/2 lg:w-1/3 shadow-md rounded p-6"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="w-full text-blue-500 text-xl font-bold text-center mb-3">
          <h1>Cadastro de usuário</h1>
        </div>
        <div className="mb-4 w-10/12">
          <label
            className="block text-gray-50 text-sm font-bold mb-2"
            htmlFor="email_input"
          >
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-zinc-700 leading-tight focus:outline-blue-500 focus:shadow-outline transition"
            id="email_input"
            type="email"
            placeholder="example@gmail.com"
            disabled={isUpdating}
            {...register('email')}
            required
          />
        </div>
        <div className="mb-4 w-10/12">
          <label
            className="block text-gray-50 text-sm font-bold mb-2"
            htmlFor="password_input"
          >
            Senha
          </label>
          <input
            className="shadow relative appearance-none border rounded w-full py-2 px-3 text-zinc-700 leading-tight cursor-pointer"
            id="password_input"
            type="password"
            disabled={isUpdating}
            {...register('password')}
            required
          />
        </div>
        <div className="w-full flex items-end justify-end">
          <Button
            className="cursor-pointer text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
            disabled={isUpdating}
          >
            {isUpdating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Cadastrar
          </Button>
        </div>
      </form>
    </div>
  );
};

export default UserRegistry;

'use client';

import React, { useState } from 'react';

import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';

import { SubmitHandler, useForm } from 'react-hook-form';

import { Loader2 } from 'lucide-react';

import userLogin from '@/functions/user/user-login';

import { Separator } from '@radix-ui/react-separator';

import showToast from '@/utils/show-toast';

type LoginProps = {
  email: string;
  password: string;
};

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginProps>();

  const [isUpdating, setIsUpdating] = useState(false);

  const { push } = useRouter();

  const onSubmit: SubmitHandler<LoginProps> = (data) => {
    setIsUpdating(true);

    userLogin(data.email, data.password)
      .then((res) => {
        sessionStorage.setItem('auth-token', res.data.Token);
        showToast('Sucesso!', 'Login realizado com sucesso!', false);
        push('/plate-registry');
      })
      .catch((e) => {
        console.log(e);
        showToast('Erro', 'Ocorreu um erro no login!', true);
      })
      .finally(() => {
        setIsUpdating(false);
      });
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-black">
      <form
        className="flex flex-col items-center gap-3 border border-solid border-zinc-500 bg-black w-1/2 lg:w-1/3 shadow-md rounded py-6 px-10"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="w-full text-zinc-50 text-xl font-bold text-center mb-8">
          <h1>Login</h1>
        </div>
        <div className="w-full">
          <label
            className="block text-gray-50 text-sm font-bold mb-2"
            htmlFor="email_input"
          >
            Email
          </label>
          <input
            className="shadow relative appearance-none border border-zinc-600 rounded w-full py-2 px-3 text-zinc-100 bg-transparent leading-tight cursor-pointer"
            id="email_input"
            type="text"
            placeholder="example@gmail.com"
            disabled={isUpdating}
            {...register('email')}
            required
          />
        </div>
        <div className="w-full">
          <label
            className="block text-gray-50 text-sm font-bold mb-2"
            htmlFor="password_input"
          >
            Senha
          </label>
          <input
            className="shadow relative appearance-none border border-zinc-600 rounded w-full py-2 px-3 text-zinc-100 bg-transparent leading-tight cursor-pointer"
            placeholder="digite sua senha..."
            id="password_input"
            type="password"
            disabled={isUpdating}
            {...register('password')}
            required
          />
        </div>
        <Separator className="h-[1px] w-2/3 my-2 bg-zinc-700" />
        <Button
          className="cursor-pointer bg-zinc-50 hover:bg-zinc-800 text-black hover:text-zinc-50 font-bold py-2 w-full rounded focus:outline-none focus:shadow-outline transition ease-in-out duration-300"
          type="submit"
          disabled={isUpdating}
        >
          {isUpdating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Entrar
        </Button>
      </form>
    </div>
  );
};

export default Login;

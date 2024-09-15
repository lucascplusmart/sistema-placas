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

  const { push, replace } = useRouter();

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

  function guardlessLogin() {
    replace('/plate-registry')
  }

  return (
    <div className="flex items-center justify-center w-full min-h-screen bg-black">
      <form
        className="flex flex-col items-center w-1/2 gap-3 px-10 py-6 bg-black border border-solid rounded shadow-md border-zinc-500 lg:w-1/3"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="w-full mb-8 text-xl font-bold text-center text-zinc-50">
          <h1>Login</h1>
        </div>
        <div className="w-full">
          <label
            className="block mb-2 text-sm font-bold text-gray-50"
            htmlFor="email_input"
          >
            Email
          </label>
          <input
            className="relative w-full px-3 py-2 leading-tight bg-transparent border rounded shadow appearance-none cursor-pointer border-zinc-600 text-zinc-100"
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
            className="block mb-2 text-sm font-bold text-gray-50"
            htmlFor="password_input"
          >
            Senha
          </label>
          <input
            className="relative w-full px-3 py-2 leading-tight bg-transparent border rounded shadow appearance-none cursor-pointer border-zinc-600 text-zinc-100"
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
          className="w-full py-2 font-bold text-black transition duration-300 ease-in-out rounded cursor-pointer bg-zinc-50 hover:bg-zinc-800 hover:text-zinc-50 focus:outline-none focus:shadow-outline"
          type="submit"
          disabled={isUpdating}
        >
          {isUpdating && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
          Entrar
        </Button>
      </form>
    </div>
  );
};

export default Login;

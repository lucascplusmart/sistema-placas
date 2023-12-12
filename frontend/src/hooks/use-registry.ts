'use client';

import { useState, useCallback } from 'react';

import { axiosBaseConfig } from '@/utils/api-base-config';

import showToast from '@/utils/show-toast';

export default function useRegistry() {
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const postRegistry = useCallback((args: FormData) => {
    setIsLoading(true);

    axiosBaseConfig({
      method: 'post',
      url: 'placas/cadastroPlaca',
      headers: {
        'Content-Type': 'multiply/form-data',
      },
      data: args,
    })
      .then(() => {
        showToast('Sucesso!', 'Placa registrada com sucesso!', false);
      })
      .catch((e) => {
        setError(e);
        showToast('Erro', 'Erro ao registrar placa', true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return { postRegistry, error, isLoading };
}

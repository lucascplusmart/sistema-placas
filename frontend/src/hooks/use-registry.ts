'use client';

import { axiosBaseConfig } from '@/utils/api-base-config';

const postRegistry = async (args: FormData) => {
  const res = await axiosBaseConfig({
    method: 'post',
    url: 'placas/cadastroPlaca',
    headers: {
      'Content-Type': 'multiply/form-data',
      'x-auth-token': localStorage.getItem('auth-token') || '',
    },
    data: args,
  });

  return res;
};

export default postRegistry;

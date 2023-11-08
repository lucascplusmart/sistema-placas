import { axiosBaseConfig } from '@/utils/api-base-config';

export const fetcher = async (plate: string) => {
  const res = await axiosBaseConfig({
    method: 'get',
    url: `placas/consulta/${plate}`,
    headers: {
      'x-auth-token': localStorage.getItem('auth-token') || '',
    },
  });

  return res;
};

import { axiosBaseConfig } from '@/utils/api-base-config';

export const fetcher = async (city: string) => {
  const res = await axiosBaseConfig({
    method: 'get',
    url: `placas/relatorio/cidade/${city}`,
    headers: {
      'Content-Type': 'application/pdf',
      'x-auth-token': localStorage.getItem('auth-token') || '',
    },
  });

  return res;
};

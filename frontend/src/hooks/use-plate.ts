import PlateProps from '@/interfaces/plate';

import useSWR from 'swr';

import { axiosBaseConfig } from '@/utils/api-base-config';

export const fetcher = async (url: string) => {
  const res = await axiosBaseConfig({
    method: 'get',
    url: url,
  });

  return res.data;
};

export function usePlate(plate: string) {
  const { data, error, isLoading } = useSWR<PlateProps | null, Error>(
    `placas/consulta/${plate}`,
    fetcher
  );

  return { data, error, isLoading };
}

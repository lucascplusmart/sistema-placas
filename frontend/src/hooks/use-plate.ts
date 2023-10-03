import useSWR from 'swr';

import { axiosBaseConfig } from '@/utils/api-base-config';

export const fetcher = async (url: string) => {
  const res = await axiosBaseConfig({
    method: 'get',
    url: url,
  });

  return res;
};

export const usePlate = (plate: string) => {
  const { data, error, isLoading, mutate } = useSWR(
    `consulta/${plate}`,
    fetcher
  );

  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

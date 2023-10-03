import useSWR from 'swr';

import { axiosBaseConfig } from '@/utils/api-base-config';

export const fetcher = async (url: string) => {
  const res = await axiosBaseConfig({
    method: 'get',
    url: url,
    headers: {
      'Content-Type': 'application/pdf',
    },
  });

  return res;
};

export const useReport = (city: string) => {
  const { data, error, isLoading } = useSWR(
    `relatorio/cidade/${city}`,
    fetcher
  );

  return {
    plate: data,
    error,
    isLoading,
  };
};

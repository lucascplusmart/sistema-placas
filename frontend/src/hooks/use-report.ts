import useSWR from 'swr';

import { axiosBaseConfig } from '@/utils/api-base-config';

const fetcher = async (url: string) => {
  const res = await axiosBaseConfig({
    method: 'get',
    url: url,
  });

  return res.data;
};

const useReport = (city: string) => {
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

export default useReport;

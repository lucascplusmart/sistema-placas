import useSWR from 'swr';

import { axiosBaseConfig } from '@/utils/api-base-config';

export const fetcher = async (url: string, args: FormData) => {
  const res = await axiosBaseConfig({
    method: 'post',
    url: url,
    headers: {
      'Content-Type': 'multiply/form-data',
    },
    data: args,
  });

  return res;
};

// const useRegistry = async (registry: RegistryProps) => {
//   const { data, error, isLoading } = useSWR(
//     {
//       url: '/cadastroPlaca',
//       args: registry,
//     },
//     fetcher
//   );

//   return {
//     data,
//     error,
//     isLoading,
//   };
// };

// export default useRegistry;

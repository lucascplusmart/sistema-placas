'use client';

import { useEffect, useState } from 'react';

import { axiosBaseConfig } from '@/utils/api-base-config';

export function useRegistry<T = unknown>(url: string, args: FormData) {
  const [data, setData] = useState<T | null>(null);
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    axiosBaseConfig({
      method: 'post',
      url: url,
      headers: {
        'Content-Type': 'multiply/form-data',
      },
      data: args,
    }).then;
  });

  return data;
}

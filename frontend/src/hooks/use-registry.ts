'use client';

import { useEffect, useState } from 'react';

import { axiosBaseConfig } from '@/utils/api-base-config';

export const postRegistry = async (url: string, args: FormData) => {
  const res = await axiosBaseConfig({
    method: 'post',
    url: url,
    headers: {
      'Content-Type': 'multiply/form-data',
      'x-auth-token': sessionStorage.getItem('auth-token'),
    },
    data: args,
  });

  return res;
};

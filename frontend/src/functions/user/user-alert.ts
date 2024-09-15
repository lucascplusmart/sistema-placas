import { axiosBaseConfig } from '@/utils/api-base-config';

let token = '';

if (typeof window !== 'undefined') {
  token = localStorage.getItem('auth-token') ?? '';
}

const userAlert = async () => {
  const response = await axiosBaseConfig({
    method: 'post',
    url: '/alerta',
  });

  return response;
};

export default userAlert;

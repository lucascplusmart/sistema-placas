import { axiosBaseConfig } from '@/utils/api-base-config';

const userAlert = async () => {
  const response = await axiosBaseConfig({
    method: 'post',
    url: '/alerta',
    headers: {
      'x-auth-token': sessionStorage.getItem('auth-token'),
    },
  });

  return response;
};

export default userAlert;

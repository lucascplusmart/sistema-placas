import { axiosBaseConfig } from '@/utils/api-base-config';

const userAlert = async () => {
  const response = await axiosBaseConfig({
    method: 'post',
    url: '/alerta',
  });

  return response;
};

export default userAlert;

import { axiosBaseConfig } from '@/utils/api-base-config';

const userRegistry = async (email: string, password: string) => {
  let user = {
    email,
    password,
  };

  const response = await axiosBaseConfig({
    method: 'post',
    url: '/usuario/cadastro',
  });

  return response;
};

export default userRegistry;

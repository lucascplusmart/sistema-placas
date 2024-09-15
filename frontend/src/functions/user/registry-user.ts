import { axiosBaseConfig } from '@/utils/api-base-config';

const userRegistry = async (email: string, password: string) => {
  let user = {
    email,
    senha: password,
  };

  const response = await axiosBaseConfig({
    method: 'post',
    url: '/usuario/cadastro',
    data: user,
  });

  return response;
};

export default userRegistry;

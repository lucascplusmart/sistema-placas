import { axiosBaseConfig } from '@/utils/api-base-config';

const userLogin = async (email: string, password: string) => {
  let user = {
    email,
    senha: password,
  };

  const response = await axiosBaseConfig({
    method: 'post',
    url: '/usuario/login',
    data: user,
  });

  return response;
};

export default userLogin;

import { axiosBaseConfig } from '@/utils/api-base-config';

const userLogin = async (email: string, password: string) => {
  let user = {
    email,
    password,
  };
  console.log(user);

  const response = await axiosBaseConfig({
    method: 'post',
    url: '/usuario/login',
  });

  return response;
};

export default userLogin;

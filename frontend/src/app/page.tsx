import { redirect } from 'next/navigation';

const Home = async ({ params }: { params: any }) => {
  // Redirecionando para a tela de login
  redirect('/login');
  return;
};

export default Home;

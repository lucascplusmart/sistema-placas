import { redirect } from 'next/navigation';

const Home = async ({ params }: { params: any }) => {
  redirect('/login');
  return;
};

export default Home;

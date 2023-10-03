import { redirect } from 'next/navigation';

const Home = async ({ params }: { params: any }) => {
  redirect('/registry');
  return;
};

export default Home;

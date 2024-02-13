'use server';
import { redirect } from 'next/navigation';
const RedirectPage = ({ params }: any) => {
  redirect(`https://q.menuma.online/${params.slug}`);

  return null;
};

export default RedirectPage;

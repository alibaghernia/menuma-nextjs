import { useRouter } from 'next/router';
import { axios } from '@/utils/axios';

// TODO fix client side redirect. make sure redirect will be just server side
const RedirectPage = () => {
  const router = useRouter();
  // Fetch the data needed for redirection
  // For example, you might fetch the target URL based on the provided slug
  // This can be done using an API call or any other data fetching method

  // For demonstration purposes, let's assume the target URL is hardcoded
  const targetUrl = 'https://menuma.online';

  // Redirect the user to the target URL
  if (typeof window !== 'undefined') {
    // Client-side redirect
    window.location.href = targetUrl;
  } else {
    // Server-side redirect
    // This will be executed on the server during server-side rendering (SSR)
    // The user won't see this part since they are being redirected
    router.replace(targetUrl);
  }

  // Return an empty component, as the user won't see it due to the redirection
  return null;
};

export async function getServerSideProps(context: any) {
  const { slug } = context.params;

  // Fetch the necessary data for redirection based on the slug
  // For demonstration purposes, let's assume the target URL is hardcoded
  const { destination }: any = await axios
    .get(`/api/go/${slug}`)
    .then(({ data }) => data);

  const targetUrl = destination;

  // Return a props object with 'notFound' set to false, and 'redirect' set to the target URL
  return {
    props: {},
    redirect: {
      destination: `https://q.menuma.online/${slug}`,
      permanent: false, // Set to true if the redirection is permanent (HTTP status code 301)
    },
  };
}

export default RedirectPage;

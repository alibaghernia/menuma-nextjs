
import type { AppProps } from 'next/app'
import "@/assets/styles/global.scss"
import "leaflet/dist/leaflet.css";
import 'react-toastify/dist/ReactToastify.css';
import Provider from '@/providers/main/provider'
import { QueryClientProvider, QueryClient } from 'react-query';
import { Fragment } from 'react';
import { ToastContainer } from 'react-toastify';


export default function App({ Component, pageProps }: AppProps) {

  //@ts-ignore
  const PageProvider = Component.provider || Fragment

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 5 * 60 * 1000
      }
    }
  })

  return (
    <>
    <div className='z-10'>
    <Provider>
      <QueryClientProvider client={queryClient}>
        <PageProvider>
          <Component {...pageProps} />
        </PageProvider>
      </QueryClientProvider>
    </Provider>
    </div>
    <ToastContainer className="z-20" rtl />
    </>
  )
}

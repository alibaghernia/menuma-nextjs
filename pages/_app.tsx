
import type { AppProps } from 'next/app'
import LocalFont from 'next/font/local'
import "@/assets/styles/global.scss"
import "leaflet/dist/leaflet.css";
import 'react-toastify/dist/ReactToastify.css';
import { QueryClientProvider, QueryClient } from 'react-query';
import { Fragment } from 'react';
import { ToastContainer } from 'react-toastify';
import classNames from 'classnames';
import Provider from '@/providers/main/provider';
import { GeneralProvider } from '@/providers/general/provider';

const vazirMatn = LocalFont({
  src: [
    {
      path: "../assets/fonts/vazirFD-100.woff2",
      weight: "100",
      style: "normal"
    },
    {
      path: "../assets/fonts/vazirFD-300.woff2",
      weight: "300",
      style: "normal"
    },
    {
      path: "../assets/fonts/vazirFD-400.woff2",
      weight: "400",
      style: "normal"
    },
    {
      path: "../assets/fonts/vazirFD-500.woff2",
      weight: "500",
      style: "normal"
    },
    {
      path: "../assets/fonts/vazirFD-700.woff2",
      weight: "700",
      style: "normal"
    },
    {
      path: "../assets/fonts/vazirFD-900.woff2",
      weight: "900",
      style: "normal"
    }
  ]
})

export default function App({ Component, pageProps }: AppProps) {

  //@ts-ignore
  const PageProvider = Component.provider || Provider

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 5 * 60 * 1000
      }
    }
  })


  return (
    <>
      <main className={classNames('z-10', vazirMatn.className)}>
        <PageProvider>
          <GeneralProvider>
            <QueryClientProvider client={queryClient}>
              <Component {...pageProps} />
            </QueryClientProvider>
          </GeneralProvider>
        </PageProvider>
      </main>
      <ToastContainer className="z-20" rtl />
    </>
  )
}

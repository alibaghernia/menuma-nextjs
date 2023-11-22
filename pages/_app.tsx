
import type { AppProps } from 'next/app'
import "@/assets/styles/global.scss"


export default function App({ Component, pageProps }: AppProps) {
  return <main className='min-h-screen'><Component {...pageProps} /></main>
}

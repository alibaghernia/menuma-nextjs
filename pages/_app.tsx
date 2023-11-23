
import type { AppProps } from 'next/app'
import "@/assets/styles/global.scss"
import Provider from '@/store/provider'


export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider>
      <Component {...pageProps} />
    </Provider>
  )
}

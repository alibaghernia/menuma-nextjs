import type { AppProps } from 'next/app';
import LocalFont from 'next/font/local';
import '@/assets/styles/global.scss';
import classNames from 'classnames';
import Provider from '@/providers/main/provider';
import { GeneralProvider } from '@/providers/general/provider';
import { ConfigProvider } from 'antd/lib';

export default function App({ Component, pageProps }: AppProps) {
  //@ts-ignore
  const PageProvider = Component.provider || Provider;

  return (
    <>
      <main className={classNames('z-10')}>
        <ConfigProvider
          theme={{
            token: {
              fontFamily: 'vazirmatn',
            },
          }}
        >
          <PageProvider>
            <GeneralProvider>
              <Component {...pageProps} />
            </GeneralProvider>
          </PageProvider>
        </ConfigProvider>
      </main>
    </>
  );
}

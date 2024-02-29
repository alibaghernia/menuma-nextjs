import '@/assets/styles/global.scss';
import type { Metadata } from 'next';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import { ConfigProvider } from 'antd';
import { GeneralProvider } from '@/providers/general/provider';
import { RouteChangeProvider } from '@/providers/routeChange/provider';
import faIR from 'antd/locale/fa_IR';
import _ from 'lodash';
import Provider from '@/providers/main/provider';
import { cookies } from 'next/headers';
import { getIsNotMenuma } from '@/actions/cookie';
import {
  GoogleAnalytics as GoogleAnalyticsTag,
  GoogleTagManager as GoogleTagManagerTag,
} from '@next/third-parties/google';
import { Fragment } from 'react';

export const generateMetadata = (): Awaited<Metadata> => {
  const isNotMenuma = getIsNotMenuma();
  return {
    title: isNotMenuma ? '' : 'منوما',
    description: 'پلتفرم مدیریت، مقایسه و تعامل با کافه ها و رستوران ها',
  };
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isNotMenuma = !!+cookies().get('is-not-menuma')?.value!;

  let GoogleAnalytics: any = Fragment;
  let GAID;
  if (process.env.NODE_ENV == 'production') {
    GAID = process.env.NEXT_PUBLIC_GAID;
    if (!GAID) {
      console.error('Check google analytics ID');
      process.exit(1);
    }
    GoogleAnalytics = GoogleAnalyticsTag;
  }

  let GoogleTagManager: any = Fragment;
  let GTMID;
  if (process.env.NODE_ENV == 'production') {
    GTMID = process.env.NEXT_PUBLIC_GTMID;
    if (!GTMID) {
      console.error('Check google tag manager ID');
      process.exit(1);
    }
    GoogleTagManager = GoogleTagManagerTag;
  }

  return (
    <html lang="fa" dir="rtl">
      <GoogleAnalytics gaId={GAID} />
      <GoogleTagManager gtmId={GTMID} />
      <body>
        <main className="bg-background">
          <ConfigProvider
            direction="rtl"
            theme={{
              token: {
                colorPrimary: '#3177FF',
                fontSize: 16,
              },
              components: {
                Input: {
                  paddingBlock: 6,
                },
              },
            }}
            locale={faIR}
          >
            <RouteChangeProvider>
              <GeneralProvider>
                <Provider isNotMenuma={isNotMenuma}>
                  <AntdRegistry>{children}</AntdRegistry>
                </Provider>
              </GeneralProvider>
            </RouteChangeProvider>
          </ConfigProvider>
        </main>
      </body>
    </html>
  );
}

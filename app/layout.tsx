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

export const generateMetadata = (): Promise<Metadata> => {
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

  return (
    <html lang="fa" dir="rtl">
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

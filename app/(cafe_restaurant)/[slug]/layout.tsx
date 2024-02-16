'use server';
import CoffeShopProvider from '@/providers/coffee_shop/provider';
import { BusinessService } from '@/services/business/business.service';
import { Result, Layout as AntLayout } from 'antd/lib';
import { Content } from 'antd/lib/layout/layout';
import { AxiosError } from 'axios';
import { Metadata } from 'next';

export const generateMetadata = async (
  { params }: any,
  parent: any,
): Promise<Metadata> => {
  const parentLayout = await parent;

  const businessService = new BusinessService(params?.slug);
  try {
    const { data: business } = await businessService.get();
    return {
      title: [parentLayout.title.absolute, business.name]
        .filter(Boolean)
        .reverse()
        .join(' - '),
      description: business.description,
      openGraph: {
        images: business.logo_url,
      },
    };
  } catch (error) {
    return {
      title: 'error',
    };
  }
};

const Layout = async ({ params, children, ...other }: any) => {
  const businessService = new BusinessService(params?.slug);

  try {
    const { data: business } = await businessService.get();
    return <CoffeShopProvider profile={business}>{children}</CoffeShopProvider>;
  } catch (error) {
    let content;
    if (error instanceof AxiosError) {
      if (error.response?.status == 404)
        content = (
          <Result status="404" className="text-center">
            کافه پیدا نشد
          </Result>
        );
    } else
      content = (
        <Result status="500" className="text-center">
          خطای ناشناخته
        </Result>
      );

    return (
      <AntLayout className="min-h-screen">
        <Content className="flex items-center justify-center">
          {content}
        </Content>
      </AntLayout>
    );
  }
};

export default Layout;

'use server';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import React, { cache } from 'react';
import { Section } from '@/components/common/section/section';
import Product from '@/components/common/product/product';
import { FlexBox } from '@/components/common/flex_box/flex_box';
import { FlexItem } from '@/components/common/flex_item/flex_item';
import { BusinessService } from '@/services/business/business.service';
import DailyOffers from '@/components/menu/dayli_offers/daily_offers';
import Client from './components/client';
import { getBusiness } from '@/actions/business';
import Categories from './components/categories';
import { getSlug } from '@/utils/serverSideUtils';
import dynamic from 'next/dynamic';
import { Metadata } from 'next';

const Navbar = dynamic(() => import('@/components/core/navbar/navbar'), {
  ssr: false,
});
const menuFetcher = cache((slug: string, search: string) => {
  const businessService = BusinessService.init(slug);
  return businessService.getMenu({ search }).then((data) => data.data);
});

const fetchDaiulyOffers = cache((slug: string) => {
  const businessService = BusinessService.init(slug);
  return businessService.productService
    .offers()
    .then((data) => data.data.items);
});

export const generateMetadata = async (
  { params }: any,
  parent: any,
): Promise<Metadata> => {
  const parentLayout = await parent;
  return {
    title: [parentLayout.title?.absolute, 'منو'].reverse().join(' - '),
  };
};
async function MenuPage({ params, searchParams }: any) {
  const search = searchParams.search || '';
  const business = await getBusiness(params.slug);
  const menuData = await menuFetcher(params.slug, search);
  const dailyOffers = await fetchDaiulyOffers(params.slug);
  const slug = getSlug(params.slug, false);
  const renderDailyOffersSection = () => {
    return (
      <DailyOffers
        title="پیشنهادات روز"
        productArray={dailyOffers}
        classNameSection="scroll-mt-[20rem]"
        contentClassNamesSection="px-4 md:px-0"
        slug={slug}
      />
    );
  };

  const renderProducts = (category: (typeof menuData)[number]) => {
    const categoryItems = category?.products || [];
    const filtred = categoryItems;
    if (!filtred.length)
      return (
        <div className="w-full text-gray-400 text-[1rem] text-center">
          آیتمی یافت نشد
        </div>
      );

    return categoryItems?.map((product, key1) => {
      return (
        <Product
          key={key1}
          fullWidth
          className="px-5 max-w-lg"
          category_uuid={category.uuid}
          slug={params.slug}
          orderable={business.pager}
          link={`/${[slug, 'menu', 'product', product.uuid]
            .filter(Boolean)
            .join('/')}`}
          {...product}
        />
      );
    });
  };

  const renderCategorySections = () => {
    return menuData
      .filter((category) => category.products.length)
      .map((category, key) => (
        <Section
          key={key}
          id={`category-${category.uuid}`}
          className="mt-[1.125rem] pb-5 scroll-mt-[20rem]"
          contentClassNames="flex flex-col gap-[1rem] items-center"
          title={category.title}
        >
          {renderProducts(category)}
        </Section>
      ));
  };

  return (
    <>
      <Client menuData={menuData} />
      <div className="bg-background min-h-screen">
        <Navbar fixed={false} title={business.name} note back />
        <FlexBox direction="column">
          <Categories menuData={menuData} />
          {!!dailyOffers?.length && (
            <FlexItem>{renderDailyOffersSection()}</FlexItem>
          )}
          <FlexItem className="z-10 relative">
            {renderCategorySections()}
          </FlexItem>
        </FlexBox>
      </div>
    </>
  );
}

export default MenuPage;

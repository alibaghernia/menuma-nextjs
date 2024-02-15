'use server';
import { Navbar } from '@/components/core/navbar/navbar';
import { CategoryCard } from '@/components/menu/category-card';
import noImage from '@/assets/images/no-image.jpg';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import React, {
  cache,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import { Section } from '@/components/common/section/section';
import { Product } from '@/components/common/product/product';
import { chunk, throttle } from 'lodash';
import { SearchField } from '@/components/common/search_field/search_field';
import { CoffeeShopProviderContext } from '@/providers/coffee_shop/provider';
import Head from 'next/head';
import { useSlug } from '@/providers/main/hooks';
import { Container } from '@/components/common/container/container';
import { FlexBox } from '@/components/common/flex_box/flex_box';
import { FlexItem } from '@/components/common/flex_item/flex_item';
import classNames from 'classnames';
import { twMerge } from 'tailwind-merge';
import { useLoadings, useMessage } from '@/utils/hooks';
import { BusinessService } from '@/services/business/business.service';
import { DailyOffers } from '@/components/menu/dayli_offers';
import { ProviderContext } from '@/providers/main/provider';
import { ProductEntity } from '@/services/business/business';
import { ProductService } from '@/services/product/product.service';
import { useParams } from 'next/navigation';
import { getSlug } from '@/utils/serverSideUtils';
import Client from './components/client';
import { getBusiness } from '@/actions/business';
import Categories from './components/categories';

const menuFetcher = cache((slug: string) => {
  const businessService = BusinessService.init(slug);
  return businessService.getMenu().then((data) => data.data);
});

const fetchDaiulyOffers = cache((slug: string) => {
  const businessService = BusinessService.init(slug);
  return businessService.productService
    .offers()
    .then((data) => data.data.items);
});
async function MenuPage({ params, ...other }: any) {
  const business = await getBusiness(params.slug);
  const menuData = await menuFetcher(params.slug);
  const dailyOffers = await fetchDaiulyOffers(params.slug);
  console.log({
    other,
  });
  const slug = getSlug(params.slug, false);

  const renderDailyOffersSection = () => {
    return (
      <DailyOffers
        title="پیشنهادات روز"
        productArray={dailyOffers}
        classNameSection="scroll-mt-[20rem]"
        contentClassNamesSection="px-4 md:px-0"
      />
    );
  };

  const renderProducts = (category: (typeof menuData)[number]) => {
    const categoryItems = category?.products || [];
    const filtred = categoryItems;
    // .filter((product) =>
    //   product.title.includes(searchInput!),
    // );
    if (!filtred.length)
      return (
        <div className="w-full text-gray-400 text-[1rem] text-center">
          آیتمی یافت نشد
        </div>
      );
    return (
      categoryItems
        // .filter((product) => product.title.includes(searchInput!))
        ?.map((product, key1) => (
          <Product
            key={key1}
            {...product}
            fullWidth
            className="px-5 max-w-lg"
            category_uuid={category.uuid}
          />
        ))
    );
  };

  const renderCategorySections = () => {
    return menuData
      .filter(
        (category) =>
          // .filter((product) =>
          //   product.title.includes(searchInput!),
          // )
          category.products.length,
      )
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
        <Navbar title={business.name} note back />
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

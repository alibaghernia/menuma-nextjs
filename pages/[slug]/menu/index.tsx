import { Navbar } from '@/components/core/navbar/navbar';
import { CategoryCard } from '@/components/menu/category-card';
import noImage from '@/assets/images/no-image.jpg';
import styles from '@/assets/styles/pages/menu/menu.module.scss';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import React, {
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
import _ from 'lodash';
import { SearchField } from '@/components/common/search_field/search_field';
import { CoffeeShopProviderContext } from '@/providers/coffee_shop/provider';
import { serverBaseUrl } from '@/utils/axios';
import Head from 'next/head';
import { useSlug } from '@/providers/main/hooks';
import { Container } from '@/components/common/container/container';
import { FlexBox } from '@/components/common/flex_box/flex_box';
import { FlexItem } from '@/components/common/flex_item/flex_item';
import classNames from 'classnames';
import { twMerge } from 'tailwind-merge';
import { CoffeeShopPageProvider } from '@/providers/coffee_shop/page_provider';
import { withCafeeShopProfile } from '@/utils/serverSideUtils';
import {
  useCustomRouter,
  useLoadings,
  useMessage,
  usePageLoading,
} from '@/utils/hooks';
import { BusinessService } from '@/services/business/business.service';
import { DailyOffers } from '@/components/menu/dayli_offers';
import { ProviderContext } from '@/providers/main/provider';
import { CategoryEntity, ProductEntity } from '@/services/business/business';
import { ProductService } from '@/services/product/product.service';

function MenuPage() {
  const [addL, removeL] = useLoadings();
  usePageLoading();
  const message = useMessage();
  const [scrolled, setScrolled] = useState(false);
  const [menuData, setMenuData] = useState<
    Awaited<ReturnType<typeof businessService.getMenu>>['data']
  >([]);
  const { state } = useContext(CoffeeShopProviderContext);
  const { checkCartItemsExist, state: mainProviderState } =
    useContext(ProviderContext);
  const [searchInput, setSearchInput] = useState<string>('');
  const { query: params } = useCustomRouter();
  const [dailyOffers, setDailyOffers] = useState<ProductEntity[]>([]);
  const slug = useSlug(false);
  const businessService = BusinessService.init(params.slug as string);
  const productService = ProductService.init(params.slug as string);
  const [selectedCategory, setSelectedCategory] = useState<string | number>();

  function menuFetcher() {
    addL('fetch-menu');
    businessService
      .getMenu()
      .finally(() => {
        removeL('fetch-menu');
      })
      .then((data) => {
        setMenuData(data.data);
      })
      .catch(() => {
        message.error('خطا در دریافت اطلاعات منو');
      });
  }

  function fetchDaiulyOffers() {
    addL('fetch-offers');
    productService
      .offers()
      .then((data) => {
        setDailyOffers(data.data.items);
      })
      .catch(() => {
        message.error('مشکلی در دریافت پیشنهادات وجود دارد.');
      })
      .finally(() => {
        removeL('fetch-offers');
      });
  }

  useEffect(() => {
    if (mainProviderState.restored && menuData) {
      checkCartItemsExist(
        menuData
          ?.map(
            (cat: any) =>
              cat.products?.filter((item: any) =>
                item.metadata.some((tag: string) => tag == 'sold_out'),
              ),
          )
          .flat() || [],
      );
    }
  }, [mainProviderState.restored, menuData]);

  useEffect(() => {
    menuFetcher();
    fetchDaiulyOffers();
  }, []);
  useEffect(() => {
    const handler = () => {
      const actegoryBar = window.document.getElementById('category-bar');
      const scroll = window.scrollY;
      if (scrolled && scroll == 0) {
        setScrolled(false);
      } else if (scroll > (actegoryBar?.clientHeight || 100) / 2.8) {
        setScrolled(true);
      }
    };

    window.addEventListener('scroll', _.throttle(handler, 50));

    return () => {
      window.removeEventListener('scroll', _.throttle(handler, 50));
    };
  }, [scrolled]);

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

  const categoriesSwiperSlides = useMemo(() => {
    return _.chunk(menuData, 2).map((categories, key1) => (
      <SwiperSlide
        className="!flex !flex-row !flex-nowrap !items-center !gap-[.5rem] !w-fit"
        key={key1}
      >
        {categories.map((category, key2) => (
          <div key={key2}>
            <CategoryCard
              className={classNames({
                'w-[6.7rem] h-[3.7rem] rounded-[1rem]': scrolled,
              })}
              titleClassName={classNames({
                'text-[.9rem]': scrolled,
              })}
              image={category.image_url ? category.image_url : undefined}
              title={category.title}
              onClick={() => {
                setSelectedCategory(category.uuid);
                setSearchInput('');
                window.document
                  .getElementById(`category-${category.uuid}`)
                  ?.scrollIntoView({
                    behavior: 'smooth',
                  });
              }}
            />
          </div>
        ))}
      </SwiperSlide>
    ));
  }, [menuData, setSelectedCategory, scrolled]);

  const renderProducts = useCallback(
    (category: (typeof menuData)[number]) => {
      const categoryItems = category?.products || [];
      const filtred = categoryItems.filter((product) =>
        product.title.includes(searchInput!),
      );
      if (!filtred.length)
        return (
          <div className="w-full text-gray-400 text-[1rem] text-center">
            آیتمی یافت نشد
          </div>
        );
      return categoryItems
        .filter((product) => product.title.includes(searchInput!))
        ?.map((product, key1) => (
          <Product
            key={key1}
            {...product}
            fullWidth
            className="px-5 max-w-lg"
            category_uuid={category.uuid}
          />
        ));
    },
    [searchInput],
  );

  const renderCategorySections = () => {
    return menuData
      .filter(
        (category) =>
          category.products.filter((product) =>
            product.title.includes(searchInput!),
          ).length,
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

  const navbar = useMemo(
    () => <Navbar title={state?.profile?.name} note back />,
    [state.profile],
  );
  return (
    <>
      <Head>
        <title>
          {`${state.profile.name + ' - منو' + (slug ? ' - منوما' : '')}`}
        </title>
      </Head>
      <div className="bg-background min-h-screen">
        {navbar}
        <FlexBox direction="column">
          <Container
            position="sticky"
            id="category-bar"
            className={twMerge(
              classNames('top-0 bg-background z-20', {
                'pb-[1.125rem]': !scrolled,
                'pb-[1rem]': scrolled,
              }),
            )}
          >
            <FlexBox direction="column">
              <FlexItem>
                <FlexBox direction="column" gap={2} className="pt-[4.5rem]">
                  <FlexItem className="px-2">
                    <Swiper
                      slidesPerView={'auto'}
                      spaceBetween={8}
                      grabCursor={true}
                      scrollbar
                      pagination={{
                        clickable: true,
                        el: '#swiper-pagination',
                        bulletElement: 'div',
                        bulletClass: styles['swiper-pagination-bullet'],
                        bulletActiveClass:
                          styles['swiper-pagination-bullet-active'],
                      }}
                      breakpoints={{
                        768: {
                          centerInsufficientSlides: true,
                        },
                      }}
                      modules={[Pagination]}
                    >
                      {categoriesSwiperSlides}
                    </Swiper>
                  </FlexItem>
                  <FlexItem
                    id="swiper-pagination"
                    className={twMerge(
                      classNames(
                        'mx-auto mt-2 !flex !w-fit transition-all duration-[.3s]',
                        {
                          '!hidden': scrolled,
                        },
                      ),
                    )}
                  />
                </FlexBox>
              </FlexItem>
              <FlexItem>
                <div className="mt-4 md:max-w-md md:mx-auto mx-6">
                  <SearchField
                    value={searchInput ?? ''}
                    onChange={setSearchInput}
                    onSearch={(value) => {}}
                  />
                </div>
              </FlexItem>
            </FlexBox>
          </Container>

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

export const getServerSideProps = withCafeeShopProfile();

export default CoffeeShopPageProvider(MenuPage);

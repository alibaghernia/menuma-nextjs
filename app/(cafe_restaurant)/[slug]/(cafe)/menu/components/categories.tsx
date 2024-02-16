'use client';
import { Container } from '@/components/common/container/container';
import { FlexBox } from '@/components/common/flex_box/flex_box';
import { FlexItem } from '@/components/common/flex_item/flex_item';
import { SearchField } from '@/components/common/search_field/search_field';
import { CategoryCard } from '@/components/menu/category-card';

import classNames from 'classnames';
import styles from '@/assets/styles/pages/menu/menu.module.scss';
import { chunk, throttle, words } from 'lodash';
import React, { useEffect, useMemo, useState } from 'react';
import { Swiper, SwiperSlide } from './client';
import { twMerge } from 'tailwind-merge';
import { Pagination } from 'swiper/modules';
import { useRouter, useSearchParams } from 'next/navigation';
import { useSlug } from '@/providers/main/hooks';
import { useCustomRouter } from '@/utils/hooks';

const Categories = ({ menuData }: any) => {
  const searchParams = useSearchParams();
  const [searchInput, setSearchInput] = useState<string>(
    searchParams.get('search') || '',
  );
  const [scrolled, setScrolled] = useState(false);
  const router = useCustomRouter();
  const slug = useSlug(false);
  const [navbarHeight, setNavbarHeight] = useState(0);
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

    window.addEventListener('scroll', throttle(handler, 50));

    return () => {
      window.removeEventListener('scroll', throttle(handler, 50));
    };
  }, [scrolled]);

  const categoriesSwiperSlides = useMemo(
    () =>
      chunk(menuData, 2).map((categories, key1) => (
        <SwiperSlide
          className="!flex !flex-row !flex-nowrap !items-center !gap-[.5rem] !w-fit"
          key={key1}
        >
          {categories.map((category: any, key2) => (
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
      )),
    [scrolled],
  );

  function getSearchURL(value: string) {
    const search = new URLSearchParams();
    if (value) search.set('search', value);
    return `/${[[slug, 'menu'].filter(Boolean).join('/'), search.toString()]
      .filter(Boolean)
      .join('?')}`;
  }

  useEffect(() => {
    if (window) {
      process.nextTick(() => {
        const navbar = document.getElementById('navbar')!;
        setNavbarHeight(navbar?.clientHeight);
      });
    }
  }, []);

  return (
    <Container
      position="sticky"
      id="category-bar"
      className={twMerge(
        classNames('bg-background z-20', {
          'pb-[1.125rem]': !scrolled,
          'pb-[1rem]': scrolled,
        }),
      )}
      style={{
        top: `${navbarHeight}px`,
      }}
    >
      <FlexBox direction="column">
        {!!menuData?.length && (
          <FlexItem>
            <FlexBox direction="column" gap={2} className="">
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
        )}
        <FlexItem>
          <div className="mt-4 md:max-w-md md:mx-auto mx-6">
            <SearchField
              value={searchInput ?? ''}
              onChange={setSearchInput}
              onSearch={(value) => {
                router.replace(getSearchURL(value));
              }}
            />
          </div>
        </FlexItem>
      </FlexBox>
    </Container>
  );
};

export default Categories;

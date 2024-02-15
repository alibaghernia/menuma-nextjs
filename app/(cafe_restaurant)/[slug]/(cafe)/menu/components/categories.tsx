'use client';
import { Container } from '@/components/common/container/container';
import { FlexBox } from '@/components/common/flex_box/flex_box';
import { FlexItem } from '@/components/common/flex_item/flex_item';
import { SearchField } from '@/components/common/search_field/search_field';
import { CategoryCard } from '@/components/menu/category-card';

import classNames from 'classnames';
import styles from '@/assets/styles/pages/menu/menu.module.scss';
import { chunk, throttle } from 'lodash';
import React, { useEffect, useMemo, useState } from 'react';
import { Swiper, SwiperSlide } from './client';
import { twMerge } from 'tailwind-merge';
import { Pagination } from 'swiper/modules';

const Categories = ({ menuData }: any) => {
  const [searchInput, setSearchInput] = useState<string>('');
  const [scrolled, setScrolled] = useState(false);
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
    [],
  );

  return (
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
                  bulletActiveClass: styles['swiper-pagination-bullet-active'],
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
  );
};

export default Categories;

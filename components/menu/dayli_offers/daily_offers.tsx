'use client';
import React, { useMemo } from 'react';
import { IDailyOffers } from './types';
import { Section } from '@/components/common/section/section';
import { FlexItem } from '@/components/common/flex_item/flex_item';
import { FlexBox } from '@/components/common/flex_box/flex_box';
import classNames from 'classnames';
import { twMerge } from 'tailwind-merge';
import styles from '@/assets/styles/pages/menu/menu.module.scss';
import { Pagination } from 'swiper/modules';
import dynamic from 'next/dynamic';
import { Swiper, SwiperSlide } from 'swiper/react';
const Product = dynamic(() => import('@/components/common/product/product'), {
  ssr: false,
});
const DailyOffers: IDailyOffers = (props) => {
  const slides = useMemo(
    () =>
      props.productArray?.map((product: any, key: any) => {
        return (
          <SwiperSlide
            className={twMerge(
              classNames(
                '!flex !flex-row !flex-nowrap !items-center !gap-[.5rem] w-full md:!w-fit',
                props.classNameScroll,
              ),
            )}
            key={key}
          >
            <Product
              fullWidth
              className={twMerge('w-full md:w-[30rem]')}
              single_mode
              slug={props.slug}
              link={`/${[props.slug, 'menu/product', product.uuid]
                .filter(Boolean)
                .join('/')}`}
              {...product}
            />
          </SwiperSlide>
        );
      }),
    [],
  );

  return (
    <Section
      className={twMerge(classNames(), props.classNameSection)}
      contentClassNames={twMerge(classNames(), props.contentClassNamesSection)}
      title={props.title}
    >
      <FlexBox direction="column" gap={2}>
        <FlexItem>
          <Swiper
            slidesPerView={'auto'}
            grabCursor={true}
            scrollbar
            spaceBetween={15}
            pagination={{
              clickable: true,
              el: '#swiper-pagination-offers',
              bulletClass: styles['swiper-pagination-bullet'],
              bulletActiveClass: styles['swiper-pagination-bullet-active'],
            }}
            breakpoints={{
              768: {
                centerInsufficientSlides: true,
              },
              640: {
                slidesPerView: 1,
              },
            }}
            modules={[Pagination]}
          >
            {slides}
          </Swiper>
        </FlexItem>
        <FlexItem
          id="swiper-pagination-offers"
          className={twMerge(
            classNames(
              'mx-auto mt-2 !flex !w-fit transition-all duration-[.3s]',
            ),
          )}
        />
      </FlexBox>
    </Section>
  );
};
export default DailyOffers;

'use client';
import React from 'react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import { IDailyOffers } from './types';
import { Section } from '@/components/common/section/section';
import { FlexItem } from '@/components/common/flex_item/flex_item';
import { FlexBox } from '@/components/common/flex_box/flex_box';
import classNames from 'classnames';
import { twMerge } from 'tailwind-merge';
import { Product } from '@/components/common/product/product';
import { Swiper, SwiperSlide } from './client-components';
import styles from '@/assets/styles/pages/menu/menu.module.scss';
import { Pagination } from 'swiper/modules';
export const DailyOffers: IDailyOffers = (props) => {
  console.log({
    props,
  });
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
            {props.productArray?.map((product: any, key: any) => (
              <SwiperSlide
                className={twMerge(
                  classNames(
                    '!flex !flex-row !flex-nowrap !items-center !gap-[.5rem] w-full md:!w-fit',
                    props.classNameScroll,
                  ),
                )}
                key={product.id}
              >
                <Product
                  {...product}
                  fullWidth
                  className={twMerge('w-full md:w-[30rem]')}
                  single_mode
                />
              </SwiperSlide>
            ))}
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

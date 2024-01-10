import React, { useMemo } from 'react';
import { IOrderBox } from './types';
import { Section } from '@/components/common/section/section';
import { FlexItem } from '@/components/common/flex_item/flex_item';
import classNames from 'classnames';
import { twMerge } from 'tailwind-merge';
import noImage from '@/assets/images/no-image.jpg';
import { Product } from '@/components/common/product/product';
import { serverBaseUrl } from '@/utils/axios';
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';
import styles from '@/assets/styles/pages/menu/menu.module.scss';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
export const OrderBox: IOrderBox = (props) => {
  const element = useMemo(
    () => (
      <>
        <Section
          className={twMerge(classNames(), props.classNameSection)}
          contentClassNames={twMerge(
            classNames(),
            props.contentClassNamesSection,
          )}
          title={props.title}
        ></Section>
        <FlexItem className="px-2">
          <Swiper
            slidesPerView={'auto'}
            grabCursor={true}
            scrollbar
            pagination={{
              clickable: true,
              el: '#swiper-pagination',
              bulletActiveClass: styles['swiper-pagination-bullet'],
            }}
            breakpoints={{
              768: {
                centerInsufficientSlides: true,
              },
            }}
            modules={[Pagination]}
          >
            {props.productArray?.map((product: any, key: any) => (
              <SwiperSlide
                className="!flex !flex-row !flex-nowrap !items-center !gap-[.5rem] !w-fit"
                key={key}
              >
                <Product
                  id={product.id}
                  title={product.name}
                  descriptions={product.description}
                  image={
                    product.image_path
                      ? `${serverBaseUrl}/storage/${product.image_path}`
                      : noImage.src
                  }
                  prices={product.prices || []}
                  fullWidth
                  className="px-5 w-96"
                  categoryId={product.categoryId}
                  tags={product.tags}
                  single_mode
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </FlexItem>
        <FlexItem
          id="swiper-pagination"
          className={twMerge(
            classNames(
              'mx-auto mt-2 !flex !w-fit transition-all duration-[.3s] !gap-1',
              {
                '!hidden': props.scrolled,
              },
            ),
          )}
        />
      </>
    ),
    [props],
  );
  return element;
};

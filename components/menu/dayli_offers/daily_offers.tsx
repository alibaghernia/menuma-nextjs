import React, { Fragment, useMemo } from 'react';
import { IDailyOffers } from './types';
import { Section } from '@/components/common/section/section';
import { FlexItem } from '@/components/common/flex_item/flex_item';
import { FlexBox } from '@/components/common/flex_box/flex_box';
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
export const DailyOffers: IDailyOffers = (props) => {
  const element = useMemo(
    () => (
      <Section
        className={twMerge(classNames(), props.classNameSection)}
        contentClassNames={twMerge(
          classNames(),
          props.contentClassNamesSection,
        )}
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
                    className={twMerge('w-full md:w-[30rem]')}
                    categoryId={product.category_id}
                    tags={product.tags}
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
    ),
    [props],
  );
  return element;
};

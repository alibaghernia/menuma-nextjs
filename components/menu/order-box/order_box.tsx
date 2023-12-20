
import React, { useMemo } from 'react'
import { IOrderBox } from './types'
import { Section } from '@/components/common/section/section';
import { FlexItem } from '@/components/common/flex_item/flex_item';
import classNames from 'classnames'
import { twMerge } from 'tailwind-merge'
import { Product } from '@/components/common/product/product';
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';
import styles from '@/assets/styles/pages/menu/menu.module.scss';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
export const OrderBox: IOrderBox = (props) => {
    const element = useMemo(() => (
        <>
            <Section className={
                twMerge(
                    classNames(),
                    props.classNameSection
                )
            } contentClassNames={
                twMerge(
                    classNames(),
                    props.contentClassNamesSection
                )
            } title={props.title}>
            </Section>
            <FlexItem className="px-2">
                <Swiper
                    slidesPerView={"auto"}
                    grabCursor={true}
                    scrollbar
                    pagination={{
                        clickable: true,
                        el: "#swiper-pagination",
                        bulletActiveClass: styles['swiper-pagination-bullet']
                    }}
                    breakpoints={{
                        768: {
                            centerInsufficientSlides: true
                        }
                    }}
                    modules={[Pagination]}
                >

                    {
                        props.productArray?.map((product: any, key: any) => (
                            <SwiperSlide className='!flex !flex-row !flex-nowrap !items-center !gap-[.5rem] !w-fit' key={key}>
                                <Product
                                    id={product.id}
                                    title={product.title}
                                    descriptions={product.description}
                                    image={product.image}
                                    prices={product.prices}
                                    fullWidth
                                    className='px-5 max-w-lg'
                                    categoryId={product.categoryId}
                                    tags={product.tags}
                                    single_mode={product.single_mode}
                                />
                            </SwiperSlide >
                        ))
                    }

                </Swiper>

            </FlexItem>
            <FlexItem
                id="swiper-pagination" className={
                    twMerge(
                        classNames(
                            'mx-auto mt-2 !flex !w-fit transition-all duration-[.3s] !gap-1',
                            {
                                '!hidden': props.scrolled
                            }
                        )
                    )}
            />

        </>
    ), [props])
    return (
        element
    )
}

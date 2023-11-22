import { Navbar } from '@/components/core/navbar'
import { CategoryCard } from '@/components/menu/category-card'
import warmDrink from '@/assets/images/warm-drink.png'
import styles from '@/assets/styles/pages/menu/menu.module.scss'
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { EffectCoverflow, Pagination } from 'swiper/modules';
import { SearchIcon } from '@/icons/search';
import { Section } from '@/components/common/section/section';

export default function MenuPage() {
    return (
        <main className='bg-secondary min-h-screen'>
            <Navbar title='کافه شب' note />
            <div className="flex flex-col gap-2 pt-[5.5rem]">
                <div className="px-2">
                    <Swiper
                        slidesPerView={"auto"}
                        spaceBetween={8}
                        grabCursor={true}
                        pagination={{
                            clickable: true,
                            el: "#swiper-pagination",
                            bulletActiveClass: styles['swiper-pagination-bullet']
                        }}
                        modules={[Pagination]}
                    >
                        <SwiperSlide className='!flex !flex-row !flex-nowrap !items-center !gap-2 !w-fit'>
                            <CategoryCard image={warmDrink.src} title='نوشیدنی گرم' url='#' />
                            <CategoryCard image={warmDrink.src} title='نوشیدنی گرم' url='#' />
                        </SwiperSlide>
                        <SwiperSlide className='!flex !flex-row !flex-nowrap !items-center !gap-2 !w-fit'>
                            <CategoryCard image={warmDrink.src} title='نوشیدنی گرم' url='#' />
                            <CategoryCard image={warmDrink.src} title='نوشیدنی گرم' url='#' />
                        </SwiperSlide>
                        <SwiperSlide className='!flex !flex-row !flex-nowrap !items-center !gap-2 !w-fit'>
                            <CategoryCard image={warmDrink.src} title='نوشیدنی گرم' url='#' />
                            <CategoryCard image={warmDrink.src} title='نوشیدنی گرم' url='#' />
                        </SwiperSlide>
                        <SwiperSlide className='!flex !flex-row !flex-nowrap !items-center !gap-2 !w-fit'>
                            <CategoryCard image={warmDrink.src} title='نوشیدنی گرم' url='#' />
                            <CategoryCard image={warmDrink.src} title='نوشیدنی گرم' url='#' />
                        </SwiperSlide>
                    </Swiper>
                </div>
                <div id="swiper-pagination" className='mx-auto mt-2 !flex gap-0 !w-fit'></div>
            </div>
            <div className="mt-4">
                <div className="rounded-full p-1 flex items-center mx-6 bg-white overflow-hidden gap-2">
                    <div className="p-[.4rem] px-2 bg-black/[15%] rounded-tr-2xl rounded-br-2xl rounded-tl-lg rounded-bl-lg cursor-pointer">
                        <SearchIcon width={18} height={18} />
                    </div>
                    <input type="text" className='outline-none bg-transparent placeholder:text-[.8rem] w-full' placeholder='جستجو...' />
                </div>
            </div>
            <Section classNames="mt-[1.125rem]" title='ویژه ها' append={<div className='text-more whitespace-nowrap text-[0.625rem] font-bold'>مشاهده همه</div>}>
                
            </Section>
        </main>
    )
}

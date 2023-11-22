import { Navbar } from '@/components/core/navbar'
import { CategoryCard } from '@/components/menu/category-card'
import warmDrink from '@/assets/images/warm-drink.png'
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { EffectCoverflow, Pagination } from 'swiper/modules';

export default function MenuPage() {
    return (
        <main className='bg-secondary min-h-screen'>
            <Navbar title='کافه شب' note />
            <div className="pt-[6.5rem] px-10">

                <Swiper
                    slidesPerView={2}
                    spaceBetween={15}
                    grabCursor={true}
                    pagination={{
                        clickable: true,
                    }}
                    modules={[Pagination]}
                >
                    <SwiperSlide className='!w-fit'>
                        <CategoryCard image={warmDrink.src} title='نوشیدنی گرم' url='#' />
                    </SwiperSlide>
                    <SwiperSlide className='!w-fit'>
                        <CategoryCard image={warmDrink.src} title='نوشیدنی گرم' url='#' />
                    </SwiperSlide>
                    <SwiperSlide className='!w-fit'>
                        <CategoryCard image={warmDrink.src} title='نوشیدنی گرم' url='#' />
                    </SwiperSlide>
                    <SwiperSlide className='!w-fit'>
                        <CategoryCard image={warmDrink.src} title='نوشیدنی گرم' url='#' />
                    </SwiperSlide>
                </Swiper>
            </div>
        </main>
    )
}

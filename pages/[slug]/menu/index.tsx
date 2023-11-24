import { Navbar } from '@/components/core/navbar/noSSR'
import { CategoryCard } from '@/components/menu/category-card'
import warmDrink from '@/assets/images/warm-drink.png'
import sperso from '@/assets/images/sperso.png'
import styles from '@/assets/styles/pages/menu/menu.module.scss'
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import React, { useMemo, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { EffectCoverflow, Pagination } from 'swiper/modules';
import { SearchIcon } from '@/icons/search';
import { Section } from '@/components/common/section/section';
import { Product } from '@/components/common/product/product';
import _ from 'lodash'
import { IProductProps } from '@/components/common/product/types'
import { title } from 'process'
import { SearchField } from '@/components/common/search_field/search_field'
import { useParams } from 'next/navigation'
import resolveConfig from 'tailwindcss/resolveConfig'
import tailwindConfig from '@/tailwind.config'
import { useRouter } from 'next/router'

export default function MenuPage() {
    const [searchInput, setSearchInput] = useState<string>()
    const router = useRouter()
    const params = useParams()
    const categories: category[] = useMemo(() => [
        {
            id: "1",
            title: "نوشیدنی گرم",
            image: warmDrink.src,
        },
        {
            id: "2",
            title: "نوشیدنی گرم",
            image: warmDrink.src,
        },
        {
            id: "3",
            title: "نوشیدنی گرم",
            image: warmDrink.src,
        },
        {
            id: "4",
            title: "نوشیدنی گرم",
            image: warmDrink.src,
        },
        {
            id: "5",
            title: "نوشیدنی گرم",
            image: warmDrink.src,
        },
    ], []);
    const products = useMemo<IProductProps[]>(() => [
        {
            id: "sperso1",
            title: "اسپرسو",
            descriptions: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم.",
            image: sperso.src,
            prices: [
                {
                    id: "single",
                    amount: 45000,
                    title: "تک"
                }, {
                    id: "double",
                    amount: 50000,
                    title: "دبل"
                }
            ],
        },
        {
            id: "sperso2",
            title: "اسپرسو",
            descriptions: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم.",
            image: sperso.src,
            prices: [{
                id: "single",
                amount: 45000,
                title: "تک"
            }],
        },
        {
            id: "sperso3",
            title: "اسپرسو",
            descriptions: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم.",
            image: sperso.src,
            prices: [{
                id: "single",
                amount: 45000,
                title: "تک"
            }],
        },
    ], [])


    const [selectedCategory, setSelectedCategory] = useState(categories[0].id)


    const categoriesSwiperSlides = useMemo(() => {
        return _.chunk(categories, 2).map((categories, key1) => (
            <SwiperSlide className='!flex !flex-row !flex-nowrap !items-center !gap-[1rem] !w-fit' key={key1}>
                {categories.map((category, key2) => (
                    <div key={key2}>
                        <CategoryCard image={category.image} title={category.title} url={category.url!}
                            // selected={selectedCategory == category.id} 
                            onClick={() => { setSelectedCategory(category.id) }} />
                    </div>
                ))}
            </SwiperSlide>
        )
        )
    }, [categories])

    const renderProducts = useMemo(() => {
        return products.map((product, key1) => (
            <Product
                key={key1}
                id={product.id}
                title={product.title}
                descriptions={product.descriptions}
                image={product.image}
                prices={product.prices}
                fullWidth
                className='px-5 max-w-lg'
            />
        )
        )
    }, [products])

    return (
        <main className='bg-secondary min-h-screen'>
            <Navbar title='کافه شب' note back />
            <div className="flex flex-col gap-2 pt-[5.5rem]">
                <div className="px-2">
                    <Swiper
                        slidesPerView={"auto"}
                        spaceBetween={16.96}
                        grabCursor={true}
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
                        {categoriesSwiperSlides}
                    </Swiper>
                </div>
                <div id="swiper-pagination" className='mx-auto mt-2 !flex gap-0 !w-fit'></div>
            </div>
            <div className="mt-4 mx-6">
                <SearchField value={searchInput ?? ""} onChange={setSearchInput} onSearch={(value) => { }} />
            </div>
            <Section className="mt-[1.125rem]" title='ویژه ها' append={<Section.AppentRegularButton title="مشاهده همه" onClick={() => {
                router.push(`/${params.slug}/menu/special`)
            }} />}>
                <Swiper
                    slidesPerView={"auto"}
                    slidesOffsetBefore={30.4}
                    slidesOffsetAfter={30.4}
                    spaceBetween={25.6}
                    modules={[Pagination]}
                    breakpoints={{
                        768: {
                            centerInsufficientSlides: true
                        }
                    }}
                >
                    <SwiperSlide className='!flex !flex-row !flex-nowrap !items-center !gap-2 !w-fit'>
                        <Product
                            id='sperso1'
                            title='اسپرسو'
                            descriptions='لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم.'
                            single_mode
                            image={sperso.src}
                            prices={[{
                                id: "single",
                                amount: 45000,
                                title: "تک"
                            }]}
                        />
                    </SwiperSlide>
                    <SwiperSlide className='!flex !flex-row !flex-nowrap !items-center !gap-2 !w-fit'>
                        <Product
                            id='sperso2'
                            title='اسپرسو'
                            descriptions='لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم.'
                            single_mode
                            image={sperso.src}
                            prices={[{
                                id: "single",
                                amount: 45000,
                                title: "تک"
                            }]}
                        />
                    </SwiperSlide>
                    <SwiperSlide className='!flex !flex-row !flex-nowrap !items-center !gap-2 !w-fit'>
                        <Product
                            id='sperso3'
                            title='اسپرسو'
                            descriptions='لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم.'
                            single_mode
                            image={sperso.src}
                            prices={[{
                                id: "single",
                                amount: 45000,
                                title: "تک"
                            }]}
                        />
                    </SwiperSlide>
                    <SwiperSlide className='!flex !flex-row !flex-nowrap !items-center !gap-2 !w-fit'>
                        <Product
                            id='sperso4'
                            title='اسپرسو'
                            descriptions='لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم.'
                            single_mode
                            image={sperso.src}
                            prices={[{
                                id: "single",
                                amount: 45000,
                                title: "تک"
                            }]}
                        />
                    </SwiperSlide>
                </Swiper>
            </Section>
            <Section className="mt-[1.125rem] pb-5" contentClassNames='flex flex-col gap-[1rem] items-center' title={categories.find(item => item.id == selectedCategory)?.title!}>
                {renderProducts}
            </Section>
        </main>
    )
}

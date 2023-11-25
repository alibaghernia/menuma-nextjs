import { Navbar } from '@/components/core/navbar/navbar'
import { CategoryCard } from '@/components/menu/category-card'
import warmDrink from '@/assets/images/warm-drink.png'
import sperso from '@/assets/images/sperso.png'
import noImage from '@/assets/images/no-image.jpg'
import styles from '@/assets/styles/pages/menu/menu.module.scss'
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import React, { useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react'
import { EffectCoverflow, Pagination } from 'swiper/modules';
import { Section } from '@/components/common/section/section';
import { Product } from '@/components/common/product/product';
import _ from 'lodash'
import { IProductProps } from '@/components/common/product/types'
import { SearchField } from '@/components/common/search_field/search_field'
import { useParams } from 'next/navigation'
import { useRouter } from 'next/router'
import CoffeShopProvider, { CoffeeShopProviderContext } from '@/providers/coffee_shop/provider'
import { axios, serverBaseUrl } from '@/utils/axios'
import { useQuery } from 'react-query'
import { ProviderContext } from '@/providers/main/provider'
import Head from 'next/head'
import { toast } from 'react-toastify'

function MenuPage() {
    const [menuData, setMenuData] = useState<APICateogory[]>([])
    const { state } = useContext(CoffeeShopProviderContext)
    const { setLoading } = useContext(ProviderContext)
    const [searchInput, setSearchInput] = useState<string>("")
    const router = useRouter()
    const params = useParams()

    const [selectedCategory, setSelectedCategory] = useState<string | number>()

    function menuFetcher(): Promise<APICateogory[]> {
        return axios.get(`/api/cafe-restaurants/${params.slug}/menu`).then(({ data }) => data)
    }

    const { isSuccess, data, refetch, status, isError } = useQuery({ queryKey: `fetch-menu-${params?.slug}`, queryFn: menuFetcher, enabled: false, retry: 2, cacheTime: 5 * 60 * 1000 })

    useEffect(() => {
        if (isError) {
            toast.error("خطا در ارتباط با سرور")
        }
    }, [isError])
    useEffect(() => {
        if (!params) return
        setLoading(true)
        refetch()
    }, [refetch, setLoading, params])

    useEffect(() => {
        if (isSuccess && menuData) {
            setSelectedCategory(data[0].id)
            setMenuData(data)
            setLoading(false)
        }
    }, [isSuccess, setLoading, data, status, menuData, params])


    const categoriesSwiperSlides = useMemo(() => {
        return _.chunk(menuData, 2).map((categories, key1) => (
            <SwiperSlide className='!flex !flex-row !flex-nowrap !items-center !gap-[.5rem] !w-fit' key={key1}>
                {categories.map((category, key2) => (
                    <div key={key2}>
                        <CategoryCard image={category.background_path ? `${serverBaseUrl}/storage/${category.background_path}` : noImage.src} title={category.name} url={`#${category.name}`}
                            onClick={() => { setSelectedCategory(category.id); setSearchInput("") }} />
                    </div>
                ))}
            </SwiperSlide>
        )
        )
    }, [menuData, setSelectedCategory])

    const renderProducts = useCallback((category: APICateogory) => {
        const categoryItems = category?.items || []
        const filtred = categoryItems.filter(product => product.name.includes(searchInput!))
        if (!filtred.length) return (
            <div className="w-full text-gray-400 text-[1rem] text-center">
                آیتمی یافت نشد
            </div>
        )
        return categoryItems.filter(product => product.name.includes(searchInput!))?.map((product, key1) => (
            <Product
                key={key1}
                id={product.id}
                title={product.name}
                descriptions={product.description}
                image={product.image_path ? `${serverBaseUrl}/storage/${product.image_path}` : noImage.src}
                prices={product.prices || []}
                fullWidth
                className='px-5 max-w-lg'
                categoryId={product.category_id}
            />
        )
        )
    }, [searchInput])

    const renderCategorySections = () => {
        return menuData.filter(category => category.items.filter(product => product.name.includes(searchInput!)).length).map((category, key) => (
            <Section key={key} id={category.name} className="mt-[1.125rem] pb-5 scroll-mt-[20rem]" contentClassNames='flex flex-col gap-[1rem] items-center' title={category.name}>
                {renderProducts(category)}
            </Section>
        ))
    }

    return (
        <>
            <Head>
                <title>
                    {state.profile?.name} - منو - منوما
                </title>
            </Head>
            <main className='bg-secondary min-h-screen'>
                <Navbar title={state?.profile?.name} note back />
                <div className="sticky top-0 bg-secondary z-20 pb-[1.125rem]">
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
                </div>
                <div className="z-10 relative">
                    {/* <Section title='ویژه ها' append={<Section.AppentRegularButton title="مشاهده همه" onClick={() => {
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
                                    price: "45000",
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
                                    price: "45000",
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
                                    price: "45000",
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
                                    price: "45000",
                                    title: "تک"
                                }]}
                            />
                        </SwiperSlide>
                    </Swiper>
                </Section> */}
                    {renderCategorySections()}
                </div>
            </main>

        </>
    )
}

MenuPage.provider = CoffeShopProvider

export default MenuPage
import { Navbar } from '@/components/core/navbar/noSSR'
import noImage from '@/assets/images/no-image.jpg'



import sperso from '@/assets/images/sperso.png'
import warmDrink from '@/assets/images/warm-drink.png'
import styles from '@/assets/styles/pages/menu/menu.module.scss'
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';




import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react'
import Image from 'next/image';
import { ProviderContext } from '@/providers/main/provider';
import CoffeShopProvider, { CoffeeShopProviderContext } from '@/providers/coffee_shop/provider';
import { useParams } from 'next/navigation';
import { useQuery } from 'react-query';
import { axios, serverBaseUrl } from '@/utils/axios';
import Head from 'next/head';
import { toast } from 'react-toastify';
import _ from 'lodash'
import { useSlug } from '@/providers/main/hooks';
import { FlexBox } from '@/components/common/flex_box/flex_box';
import { FlexItem } from '@/components/common/flex_item/flex_item';
import { Container } from '@/components/common/container/container';
import { withCafeeShopProfile } from '@/utils/serverSideUtils';
import { CoffeeShopPageProvider } from '@/providers/coffee_shop/page_provider';


import { Section } from '@/components/common/section/section';
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react'
import { Product } from '@/components/common/product/product';
import { EffectCoverflow, Pagination } from 'swiper/modules';
import { twMerge } from 'tailwind-merge'
import classNames from 'classnames'
import { IProduct } from '@/components/common/product/types'



function ProductPage() {
    const [scrolled, setScrolled] = useState(false)


    const { setLoading, functions } = useContext(ProviderContext)
    const { state } = useContext(CoffeeShopProviderContext)
    const params = useParams()
    const slug = useSlug(false)
    const [orderedItems, setOrderedItems] = useState<Record<string, any>>({})
    const [product, setProduct] = useState<APIProduct>()
    function productFetcher(): Promise<APIProduct> {
        return axios.get(`/api/cafe-restaurants/${params.slug}/menu/items/${params.product_slug}`).then(({ data }) => data)
    }

    const {
        isSuccess,
        data,
        refetch,
        status,
        isError
    } = useQuery({
        queryKey: `fetch-menu-${params.slug}-item-${params.product_slug}`,
        queryFn: productFetcher,
        enabled: false,
        retry: 2,
        cacheTime: 5 * 60 * 1000
    })

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
        if (isSuccess) {
            setProduct(data)
            setLoading(false)
        }
    }, [isSuccess, setLoading, data, status, params])



    const renderProducts = () => {
        const prductArray = [
            {
                id: '1',
                title: "اسپرسو",
                description: "اسپرسو یکی از پرمصرف ترین نوع قهوه ها به شمار می رود",
                image: sperso.src,
                prices: [{ id: '1', title: 'small', price: '9000' }],
                fullWidth: true,
                className: 'px-5 max-w-lg',
                categoryId: 1,
                tags: [],
                single_mode: true,
            },
            {
                id: '2',
                title: "کاپوچینو",
                description: "کاپوچینو یکی از پرمصرف ترین به شمار می رود",
                image: warmDrink.src,
                prices: [{ id: '1', title: 'small', price: '9000' }],
                fullWidth: true,
                className: 'px-5 max-w-lg',
                categoryId: 1,
                tags: [],
                single_mode: true,
            },
            {
                id: '3',
                title: "آماکیتو",
                description: "آماکیتو یکی از پرمصرف ترین نوع قهوه ها به شمار می رود",
                image: sperso.src,
                prices: [{ id: '1', title: 'small', price: '9000' }],
                fullWidth: true,
                className: 'px-5 max-w-lg',
                categoryId: 1,
                tags: [],
                single_mode: true,
            },
            {
                id: '3',
                title: "ماکتیل",
                description: "ماکتیل یکی از پرمصرف ترین نوع قهوه ها به شمار می رود",
                image: warmDrink.src,
                prices: [{ id: '1', title: 'small', price: '9000' }],
                fullWidth: true,
                className: 'px-5 max-w-lg',
                categoryId: 1,
                tags: [],
                single_mode: true,
            },
            {
                id: '4',
                title: "اسپرسو",
                description: "اسپرسو یکی از پرمصرف ترین نوع قهوه ها به شمار می رود",
                image: sperso.src,
                prices: [{ id: '1', title: 'small', price: '9000' }],
                fullWidth: true,
                className: 'px-5 max-w-lg',
                categoryId: 1,
                tags: [],
                single_mode: true,
            }
        ]
        return prductArray?.map((product, key) => (
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
    const orderItem = useCallback((price: any) => {
        const key = `${product?.id}-${price.id}`
        functions.cart.addItem({
            id: key,
            image: product?.image_path ? `${serverBaseUrl}/storage/${product?.image_path}` : noImage.src,
            title: product?.name!,
            count: 1,
            price: price.price,
            type: price.title,
            product: {
                id: product?.id!,
                title: product?.name!,
                descriptions: product?.description!,
                //@ts-ignore
                prices: product?.prices,
                categoryId: product?.category_id,
                image: product?.image_path ? `${serverBaseUrl}/storage/${product.image_path}` : noImage.src
            }
        })
    }, [functions, product])

    const increaseOrderItemCount = useCallback((price: any) => {
        const key = `${product?.id}-${price.id}`
        functions.cart.increaseCount(key)
    }, [functions, product?.id])

    const decreasOrderItemCount = useCallback((price: any) => {
        const key = `${product?.id}-${price.id}`
        const item = functions.cart.getItem(key)
        if (item!.count == 1) {
            console.log("delete");
            functions.cart.removeItem(key)
        } else
            functions.cart.decreaseCount(key)
    }, [functions, product?.id])
    const prices = useMemo(() => product?.prices?.map((price: any, key: number) => {

        const order = functions.cart.getItem(`${product.id}-${price.id}`);

        return (
            <FlexItem key={key}>
                <FlexBox
                    justify='between'
                    alignItems='center'
                    className="p-[.5rem] px-[1.5rem] rounded-[2rem] bg-more/[.1] md:max-w-md md:w-full md:mx-auto">
                    <FlexItem
                        className="text-[1.3rem] text-typography">
                        <FlexBox gap={2} alignItems='center'>
                            {price.title && (
                                <FlexItem className='text-[1rem]'>
                                    {price.title}:
                                </FlexItem>
                            )}
                            <FlexItem>
                                {parseInt(price.price).toLocaleString("IR-fa")}
                            </FlexItem>
                        </FlexBox>
                    </FlexItem>
                    {!order ? (
                        <FlexItem
                            className="rounded-[1rem] py-[.2rem] px-[1.5rem] bg-more text-typography cursor-pointer active:scale-[.8] transition duration-[.2s]"
                            onClick={() => orderItem(price)}
                        >
                            سفارش
                        </FlexItem>
                    ) : (
                        <FlexItem>
                            <FlexBox gap={2} alignItems='center'>
                                <FlexItem className="relative w-7 h-7 bg-more rounded-lg cursor-pointer active:scale-[.8] transition duration-[.2s] select-none" onClick={_.throttle(() => increaseOrderItemCount(price), 500)}>
                                    <Container center>
                                        +
                                    </Container>
                                </FlexItem>
                                {order.count}
                                <FlexItem className="relative w-7 h-7 flex items-center justify-center bg-more rounded-lg cursor-pointer active:scale-[.8] transition duration-[.2s] select-none" onClick={() => decreasOrderItemCount(price)}>
                                    <Container center>
                                        -
                                    </Container>
                                </FlexItem>
                            </FlexBox>
                        </FlexItem>
                    )}
                </FlexBox>
            </FlexItem>)
    }), [product, functions, increaseOrderItemCount, decreasOrderItemCount, orderItem])

    const navbar = useMemo(() => (
        <Navbar title={state.profile?.name} note back />
    ), [state.profile])

    return (
        <>
            <Head>
                <title>
                    {`${state.profile.name + ` - ${product?.name || ""}` + (slug ? ' - منوما' : '')}`}
                </title>
            </Head>
            {navbar}
            <div className='bg-secondary pt-[4.5rem] z-10 px-4'>
                <FlexBox direction='column'>
                    <FlexItem
                        className="rounded-[2.4rem] overflow-hidden relative max-w-[22.4rem] w-full h-[22.4rem] mx-auto bg-white shadow"
                    >
                        <Image src={product?.image_path ? `${serverBaseUrl}/storage/${product?.image_path}` : noImage.src} alt={product?.name! || "pic"} className='inset-0 block object-cover' fill />
                    </FlexItem>
                    <FlexItem className="mt-[1.1rem] max-w-[22.4rem] w-full mx-auto bg-white/[.5] p-4 pb-10 rounded-[.5rem]" grow>
                        <FlexBox direction='column'>
                            <FlexItem>
                                <FlexBox alignItems='center' gap={2}>
                                    <hr className="border-black/10 w-full" />
                                    <div className="w-fit text-[1.8rem] font-[500] whitespace-nowrap text-typography">{product?.name}</div>
                                    <hr className="border-black/10 w-full" />
                                </FlexBox>
                            </FlexItem>
                            <FlexItem className="text-[1rem] font-[400] mt-[1.5rem] text-typography md:text-center text-justify">
                                {product?.description}
                            </FlexItem>
                            <FlexItem className="mt-[3rem]">
                                <FlexBox direction='column' gap={2}>
                                    {prices}
                                </FlexBox>
                            </FlexItem>

                        </FlexBox>

                    </FlexItem>
                </FlexBox>

                <FlexBox direction='column' className='mt-[1rem]'>
                    <FlexItem>
                        <FlexBox
                            direction='column'
                            gap={2}
                            className=" mb-[1.25rem]"
                        >
                            <Section key={0} id={`category-123`} className="scroll-mt-[20rem]" contentClassNames='flex flex-col gap-[1rem] items-center' title='پیشنهادات روز'>
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

                                    {renderProducts()}

                                </Swiper>

                            </FlexItem>
                            <FlexItem
                                id="swiper-pagination" className={
                                    twMerge(
                                        classNames(
                                            'mx-auto mt-2 !flex !w-fit transition-all duration-[.3s] !gap-1',
                                            {
                                                '!hidden': scrolled
                                            }
                                        )
                                    )}
                            />
                        </FlexBox>
                    </FlexItem>

                </FlexBox>
            </div>
        </>
    )
}
export const getServerSideProps = withCafeeShopProfile()

export default CoffeeShopPageProvider(ProductPage)
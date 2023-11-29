import { Navbar } from '@/components/core/navbar/noSSR'
import noImage from '@/assets/images/no-image.jpg'
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

function ProductPage() {
    const { setLoading } = useContext(ProviderContext)
    const { state, functions } = useContext(ProviderContext)
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
        queryKey: `fetch-menu-${slug}`,
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
        <Navbar title={product?.name} note back />
    ), [product])

    return (
        <>
            <Head>
                <title>
                    {product?.name} - منوما
                </title>
            </Head>
            {navbar}
            <div className='bg-secondary h-screen pt-[4.5rem] z-10 px-4'>
                <FlexBox direction='column'>
                    <FlexItem
                        className="rounded-[2.4rem] overflow-hidden relative max-w-[22.4rem] w-full h-[22.4rem] mx-auto bg-white shadow"
                    >
                        <Image src={product?.image_path ? `${serverBaseUrl}/storage/${product?.image_path}` : noImage.src} alt={product?.name!} className='inset-0 block object-cover' fill />
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
            </div>
        </>
    )
}


ProductPage.provider = CoffeShopProvider

export default ProductPage
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
import { withCafeeShopProfile } from '@/utils/serverSideUtils';
import { CoffeeShopPageProvider } from '@/providers/coffee_shop/page_provider';
import { useLoadings, useMessage, usePageLoading } from '@/utils/hooks';
import { ProductService } from '@/services/product/product.service';

function ProductPage() {
    usePageLoading()
    const [addL, removeL] = useLoadings()
    const message = useMessage()
    const { functions } = useContext(ProviderContext)
    const { state } = useContext(CoffeeShopProviderContext)
    const params = useParams()
    const slug = useSlug(false)
    const productService = ProductService.init(params.slug as string);
    const [product, setProduct] = useState<ProductType>()
    function fetchProduct() {
        addL('fetch-product')
        productService.getOne(params.product_slug as string)
            .then(({ data }) => {
                setProduct(data)
            })
            .catch(() => {
                message.error('مشکلی در دریافت اطلاعات آیتم وجود دارد.')
            })
            .finally(() => {
                removeL('fetch-product')
            })
    }

    useEffect(() => {
        fetchProduct()
    }, [])

    const orderItem = useCallback((price: ProductPrice) => {
        const key = `${product?.uuid}-${price.value}`
        functions.cart.addItem({
            id: key,
            image: product?.images[0] ? `${serverBaseUrl}/files/${product?.images[0]}` : noImage.src,
            title: product?.title!,
            count: 1,
            price: price.value,
            type: price.title,
            product: {
                uuid: product?.uuid!,
                title: product?.title!,
                descriptions: product?.description!,
                //@ts-ignore
                prices: product?.prices,
                categoryId: product?.category_uuid,
                image: product?.images[0] ? `${serverBaseUrl}/files/${product?.images[0]}` : noImage.src
            }
        })
    }, [functions, product])

    const increaseOrderItemCount = useCallback((price: ProductPrice) => {
        const key = `${product?.uuid}-${price.value}`
        functions.cart.increaseCount(key)
    }, [functions, product?.uuid])

    const decreasOrderItemCount = useCallback((price: ProductPrice) => {
        const key = `${product?.uuid}-${price.value}`
        const item = functions.cart.getItem(key)
        if (item!.count == 1) {
            console.log("delete");
            functions.cart.removeItem(key)
        } else
            functions.cart.decreaseCount(key)
    }, [functions, product?.uuid])

    const prices = useMemo(() => product?.prices?.map((price: ProductPrice, key: number) => {

        const order = functions.cart.getItem(`${product.uuid}-${price.value}`);

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
                                {price.value.toLocaleString("IR-fa")}
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
                    {`${state.profile.name + ` - ${product?.title || ""}` + (slug ? ' - منوما' : '')}`}
                </title>
            </Head>
            {navbar}
            <div className='bg-secondary h-screen pt-[4.5rem] z-10 px-4'>
                <FlexBox direction='column'>
                    <FlexItem
                        className="rounded-[2.4rem] overflow-hidden relative max-w-[22.4rem] w-full h-[22.4rem] mx-auto bg-white shadow"
                    >
                        <Image src={product?.images[0] ? `${serverBaseUrl}/files/${product?.images[0]}` : noImage.src} alt={product?.title! || "pic"} className='inset-0 block object-cover' fill />
                    </FlexItem>
                    <FlexItem className="mt-[1.1rem] max-w-[22.4rem] w-full mx-auto bg-white/[.5] p-4 pb-10 rounded-[.5rem] shadow" grow>
                        <FlexBox direction='column'>
                            <FlexItem>
                                <FlexBox alignItems='center' gap={2}>
                                    <hr className="border-black/10 w-full" />
                                    <div className="w-fit text-[1.8rem] font-[500] whitespace-nowrap text-typography">{product?.title}</div>
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


export const getServerSideProps = withCafeeShopProfile()

export default CoffeeShopPageProvider(ProductPage)
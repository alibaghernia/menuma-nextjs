import React, { useContext } from 'react'
import { ICart } from './types'
import classNames from 'classnames'
import { LinedCloseIcon } from '@/icons/lined_close'
import sperso from '@/assets/images/sperso.png'
import resolveConfig from 'tailwindcss/resolveConfig'
import colors from 'tailwindcss/colors'
import tailwindConfig from '@/tailwind.config'
import Image from 'next/image'
import { Trash1Icon } from '@/icons/trash1'
import { ProviderContext } from '@/providers/main/provider'
import { CoffeeShopProviderContext } from '@/providers/coffee_shop/provider'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useSlug } from '@/providers/main/hooks'
import { FlexBox } from '@/components/common/flex_box/flex_box'
import { FlexItem } from '@/components/common/flex_item/flex_item'
import { Container } from '../container/container'

export const Cart: ICart = (props) => {
    const params = useParams()
    const slug = useSlug()
    const resolvedTailwindConfig = resolveConfig(tailwindConfig)
    const { state, functions } = useContext(ProviderContext)
    const { state: coffeeShopState } = useContext(CoffeeShopProviderContext)

    const orderItems = state.cart

    const renderOrderItems = orderItems.map((orderItem, key) => {
        const productSlug = params && orderItem.product ? `/${slug}menu/${orderItem.product.categoryId}/${orderItem.product?.id}` : "#";


        return (
            <FlexBox gap={3} className="border border-black/[0.05] px-[.5rem] py-[.5rem] rounded-[1.5rem]" key={key}>
                <FlexItem className='relative bg-white rounded-[.5rem] overflow-hidden w-[6rem]'>
                    <Link href={productSlug}>
                        <Image fill src={orderItem.image || sperso.src} alt='' className='object-cover' />
                    </Link>
                </FlexItem>
                <FlexItem grow>
                    <FlexBox direction='column' gap={'2rem'} className="w-full">
                        <FlexItem>
                            <FlexBox alignItems='center' justify='between'>
                                <FlexItem>
                                    <Link href={productSlug}>
                                        <FlexBox direction='column' gap={1}>
                                            <FlexItem>
                                                {orderItem.type ? `${orderItem.title} - ${orderItem.type}` : orderItem.title}
                                            </FlexItem>
                                        </FlexBox>
                                    </Link>
                                </FlexItem>
                                <FlexItem className="cursor-pointer" onClick={(e) => {
                                    e.preventDefault();
                                    functions.cart.removeItem(orderItem.id);
                                }}>
                                    <Trash1Icon color={colors.red[500]} />
                                </FlexItem>
                            </FlexBox>
                        </FlexItem>
                        <FlexBox justify='between' gap={3} alignItems='center'>
                            <FlexItem>
                                <div className="text-[.7rem] font-bold whitespace-nowrap">
                                    {orderItem.count > 1 ? `${(orderItem.price).toLocaleString("IR-fa")} * ${orderItem.count}` : (orderItem.price).toLocaleString("IR-fa")}
                                </div>
                            </FlexItem>
                            <FlexItem grow>
                                <hr className='w-full' />
                            </FlexItem>
                            <FlexItem>
                                <FlexBox alignItems='center' gap={1} className="whitespace-nowrap">
                                    <FlexItem>
                                        <div className="text-[1rem] font-bold bg-typography text-white px-[.7rem] py-[.2rem] rounded-full">
                                            {(orderItem.price * orderItem.count).toLocaleString("IR-fa")} ت
                                        </div>
                                    </FlexItem>
                                </FlexBox>
                            </FlexItem>
                        </FlexBox>
                    </FlexBox>
                </FlexItem>
            </FlexBox>
        )
    })

    const getCartSum = () => {
        const prices = orderItems.map(orderItem => orderItem.price * orderItem.count)
        if (!prices.length) return 0
        return prices.reduce((a, b) => a + b).toLocaleString("IR-fa")
    }


    return (
        <Container
            position='fixed'
            center="horizontal"
            className={
                classNames(
                    "max-w-sm w-full py-[1rem] px-[1.5rem] pb-[3rem] bg-white z-50 rounded-[2.5rem] top-[5rem] bottom-[5rem] overflow-hidden",
                    {
                        "block": props.open,
                        "hidden": !props.open
                    }
                )
            }>
            <FlexBox direction='column' className='h-full'>
                <FlexItem>
                    <Container className="top-[1.5rem] right-[2rem]">
                        <div className="cursor-pointer" onClick={props.onClose}>
                            <LinedCloseIcon color={resolvedTailwindConfig.theme?.colors?.['typography'].toString()} />
                        </div>
                    </Container>
                </FlexItem>
                <FlexItem grow={false}>
                    <div className='text-[1.5rem] font-bold text-center w-full'>سفارشات شما</div>
                </FlexItem>
                {renderOrderItems.length ? (
                    <FlexItem grow>
                        <FlexBox gap={3} direction='column' className="mt-4 overflow-y-auto">
                            {renderOrderItems}
                        </FlexBox>
                    </FlexItem>
                ) : (
                    <FlexItem grow>
                        <Container center>
                            <div className="text-gray-400 text-center">سفارشی ثبت نکرده اید</div>
                        </Container>
                    </FlexItem>
                )}
                <FlexItem grow={false} className="mt-[1.5rem]">
                    <FlexBox gap={3} alignItems='center' className="whitespace-nowrap">
                        <FlexItem>
                            <div className="text-[1rem]">
                                مبلغ قابل پرداخت
                            </div>
                        </FlexItem>
                        <FlexItem grow>
                            <hr className='w-full' />
                        </FlexItem>
                        <FlexItem>
                            <div className="text-[1rem]">
                                {getCartSum()} تومان
                            </div>
                        </FlexItem>
                    </FlexBox>
                </FlexItem>
                <FlexItem grow={false} className="mt-[1.5rem]">
                    {Boolean(parseInt(coffeeShopState.profile.has_pager)) && (
                        <div className="px-[2rem] py-[.8rem] w-full text-center text-typography bg-more/[.1] active:bg-more/[.2] active:scale-[.99] active:text-more transition-colors duration-[.1s] select-none border border-more rounded-[1rem] font-bold">
                            صدا زدن گارسون
                        </div>
                    )}
                </FlexItem>
            </FlexBox>
        </Container>
    )
}

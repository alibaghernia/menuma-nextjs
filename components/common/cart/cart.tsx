import React, { useCallback, useContext, useState } from 'react'
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
import { IConfirmModalProps } from '../confirm_modal/types'
import { ConfirmModal } from '../confirm_modal/confirm_modal'
import _ from 'lodash'

export const Cart: ICart = (props) => {
    const params = useParams()
    const slug = useSlug()
    const [dismissModal, setDismissModal] = useState<IConfirmModalProps | undefined>(undefined)
    const resolvedTailwindConfig = resolveConfig(tailwindConfig)
    const { state, functions } = useContext(ProviderContext)
    const { state: coffeeShopState } = useContext(CoffeeShopProviderContext)

    const orderItems = state.cart


    const increaseOrderItemCount = useCallback((product: any, price: any) => {
        const key = `${product?.id}-${price}`
        functions.cart.increaseCount(key)
    }, [functions])

    const decreasOrderItemCount = useCallback((product: any, price: any) => {
        const key = `${product?.id}-${price}`
        const item = functions.cart.getItem(key)
        if (item!.count == 1) {
            console.log("delete");
            functions.cart.removeItem(key)
        } else
            functions.cart.decreaseCount(key)
    }, [functions])


    const renderOrderItems = orderItems.map((orderItem, key) => {
        const productSlug = params && orderItem.product ? `/${slug}menu/${orderItem.product.categoryId}/${orderItem.product?.id}` : "#";


        return (
            <FlexItem key={key}>
                <FlexBox direction='column' gap={2} className='border border-black/[0.05] p-[1rem] rounded-[1.5rem]'>
                    <FlexItem>
                        <FlexBox gap="1rem" className="">
                            <FlexItem className='relative bg-white rounded-[1rem] overflow-hidden w-[6rem] h-[6rem]'>
                                <Link href={productSlug}>
                                    <Image fill src={orderItem.image || sperso.src} alt='' className='object-cover' />
                                </Link>
                            </FlexItem>
                            <FlexItem grow>
                                <FlexBox direction='column' gap={'.5rem'} className="w-full">
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
                                        </FlexBox>
                                    </FlexItem>
                                    <FlexItem className='text-[.8rem] text-typography text-justify'>
                                        {orderItem.product.descriptions}
                                    </FlexItem>
                                </FlexBox>
                            </FlexItem>
                        </FlexBox>
                    </FlexItem>
                    <FlexItem>
                        <FlexBox justify='between' gap={2} alignItems='center' className=''>
                            <FlexItem>
                                <div className="text-[.7rem] font-bold whitespace-nowrap">
                                    {orderItem.count > 1 ? `${(orderItem.price).toLocaleString("IR-fa")} * ${orderItem.count}` : (orderItem.price).toLocaleString("IR-fa")}
                                </div>
                            </FlexItem>
                            <FlexItem grow>
                                <hr className='w-full' />
                            </FlexItem>
                            <FlexItem>
                                <FlexBox alignItems='center' gap={2} className="whitespace-nowrap">
                                    <FlexItem>
                                        <div className="text-[1rem] font-bold bg-typography text-white px-[.7rem] py-[.2rem] rounded-full">
                                            {(orderItem.price * orderItem.count).toLocaleString("IR-fa")} ت
                                        </div>
                                    </FlexItem>
                                </FlexBox>
                            </FlexItem>
                        </FlexBox>
                    </FlexItem>
                    <FlexItem className='mt-2'>
                        <FlexBox className='w-full'>
                            <FlexItem grow>
                                <FlexBox gap={2} alignItems='center'>
                                    <FlexItem className="relative w-14 h-7 bg-more rounded-lg cursor-pointer active:scale-[.8] transition duration-[.2s] select-none" onClick={_.throttle(() => increaseOrderItemCount(orderItem.product, orderItem.id.split("-")[1]), 500)}>
                                        <Container center>
                                            +
                                        </Container>
                                    </FlexItem>
                                    <FlexItem className='w-7 h-7 relative'>
                                        <Container center>
                                            {orderItem.count}
                                        </Container>
                                    </FlexItem>
                                    <FlexItem className={classNames("relative w-14 h-7 flex items-center justify-center bg-more rounded-lg cursor-pointer active:scale-[.8] transition duration-[.2s] select-none", {
                                        "opacity-[.5] pointer-events-none": orderItem.count < 2
                                    })}
                                        onClick={() => {
                                            decreasOrderItemCount(orderItem.product, orderItem.id.split("-")[1])
                                        }}>
                                        <Container center>
                                            -
                                        </Container>
                                    </FlexItem>
                                </FlexBox>
                            </FlexItem>
                            <FlexItem grow={false} className="cursor-pointer transition-all duration-[.2s] active:bg-red-200 px-2 py-1 rounded-full" onClick={(e) => {
                                e.preventDefault();
                                setDismissModal({
                                    open: true,
                                    title: "هشدار",
                                    content: "آیا از حذف این مورد اطمینان دارید؟",
                                    confirmText: "بله",
                                    onClose: () => setDismissModal(undefined),
                                    onConfirm: () => {
                                        functions.cart.removeItem(orderItem.id);
                                        setDismissModal(undefined)
                                    },
                                })
                            }}>
                                <FlexBox alignItems='center' gap={2}>
                                    <FlexItem className='text-[.8rem] font-bold text-red-600'>
                                        حذف
                                    </FlexItem>
                                    <FlexItem>
                                        <Trash1Icon width={20} height={20} color={colors.red[500]} />
                                    </FlexItem>
                                </FlexBox>
                            </FlexItem>
                        </FlexBox>
                    </FlexItem>
                </FlexBox>
            </FlexItem>
        )
    })

    const getCartSum = () => {
        const prices = orderItems.map(orderItem => orderItem.price * orderItem.count)
        if (!prices.length) return 0
        return prices.reduce((a, b) => a + b).toLocaleString("IR-fa")
    }


    return (
        <>
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
                            <FlexBox gap={2} direction='column' className="mt-4 overflow-y-auto">
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
                    <FlexItem grow={false} className={classNames("mt-[1.5rem]", { "hidden": !getCartSum() })}>
                        <FlexBox gap={2} alignItems='center' className="whitespace-nowrap">
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
            <ConfirmModal
                open={dismissModal?.open || false}
                content={dismissModal?.content}
                onClose={dismissModal?.onClose!}
                {...dismissModal}
            />
        </>
    )
}

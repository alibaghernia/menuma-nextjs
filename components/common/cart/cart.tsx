import React, { useCallback, useContext, useMemo, useState } from 'react'
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
import _ from 'lodash'
import { CallGarson } from '../call_garson/call_garson'
import dynamic from 'next/dynamic'
const ConfirmModal = dynamic(() => import('@/components/common/confirm_modal/confirm_modal'), { ssr: false })
export const Cart: ICart = (props) => {
    const params = useParams()
    const slug = useSlug()
    const [dismissModal, setDismissModal] = useState<IConfirmModalProps | undefined>(undefined)
    const resolvedTailwindConfig = resolveConfig(tailwindConfig)
    const { state, functions } = useContext(ProviderContext)
    const { state: coffeeShopState, handleCallGarson, cancelGarsonCallButton } = useContext(CoffeeShopProviderContext)

    const orderItems = state.cart


    const increaseOrderItemCount = useCallback((product: ProductType, price: number) => {
        const key = `${product?.uuid}-${price}`
        functions.cart.increaseCount(key)
    }, [functions])

    const decreasOrderItemCount = useCallback((product: ProductType, price: number) => {
        const key = `${product?.uuid}-${price}`
        const item = functions.cart.getItem(key)
        if (item!.count == 1) {
            functions.cart.removeItem(key)
        } else
            functions.cart.decreaseCount(key)
    }, [functions])


    const renderOrderItems = useMemo(() => orderItems.map((orderItem, key) => {
        const productSlug = params && orderItem.product ? `/${slug}menu/${orderItem.product.category_uuid}/${orderItem.product?.uuid}` : "#";


        return (
            <FlexItem key={key}>
                <FlexBox direction='column' gap={2} className='border border-black/[0.05] p-[1rem] rounded-[1.5rem]'>
                    <FlexItem>
                        <FlexBox gap="1rem" className="">
                            <FlexItem className='relative bg-white rounded-[1rem] overflow-hidden w-[6rem] h-[6rem] shrink-0'>
                                <Link href={productSlug}>
                                    <Image fill src={orderItem.image || sperso.src} alt='' className='object-cover' />
                                </Link>
                            </FlexItem>
                            <FlexItem grow>
                                <FlexBox direction='column' gap={'.5rem'} className="w-full">
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
                        <FlexBox justify='center' className='w-full'>
                            <FlexItem>
                                <FlexBox gap={2} alignItems='center'>
                                    <FlexItem className="relative w-14 h-7 bg-more rounded-lg cursor-pointer active:scale-[.8] transition duration-[.2s] select-none text-typography" onClick={_.throttle(() => increaseOrderItemCount(orderItem.product, orderItem.price), 500)}>
                                        <Container center>
                                            +
                                        </Container>
                                    </FlexItem>
                                    <FlexItem className='w-7 h-7 relative'>
                                        <Container center>
                                            {orderItem.count}
                                        </Container>
                                    </FlexItem>
                                    <FlexItem className={classNames("relative w-14 h-7 flex items-center justify-center bg-more rounded-lg cursor-pointer active:scale-[.8] transition duration-[.2s] select-none")}
                                        onClick={() => {
                                            if (orderItem.count > 1)
                                                decreasOrderItemCount(orderItem.product, orderItem.price)
                                            else
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
                                        <Container center>
                                            {orderItem.count < 2 ? (
                                                <Trash1Icon width={20} height={20} color={resolvedTailwindConfig.theme?.colors!['typography'].toString()} />
                                            ) : (<>-</>)}
                                        </Container>
                                    </FlexItem>
                                </FlexBox>
                            </FlexItem>
                        </FlexBox>
                    </FlexItem>
                </FlexBox>
            </FlexItem>
        )
    }), [orderItems, decreasOrderItemCount, increaseOrderItemCount, functions.cart, params, resolvedTailwindConfig.theme, slug])

    const getCartSum = () => {
        const prices = orderItems.map(orderItem => orderItem.price * orderItem.count)
        if (!prices.length) return 0
        return prices.reduce((a, b) => a + b).toLocaleString("IR-fa")
    }


    return (
        <>
            <Container
                position='fixed'
                centerHorizontal
                className={
                    classNames(
                        "max-w-sm xs:max-w-xs  w-full py-[1rem] px-[1.5rem] bg-white z-50 rounded-[2.5rem] top-[5rem] bottom-[5rem] overflow-hidden",
                        {
                            "block": props.open,
                            "hidden": !props.open
                        }
                    )
                }>
                <FlexBox direction='column' className='h-full'>
                    <Container className="top-[1.5rem] right-[2rem]">
                        <div className="cursor-pointer" onClick={props.onClose}>
                            <LinedCloseIcon color={resolvedTailwindConfig.theme?.colors?.['typography'].toString()} />
                        </div>
                    </Container>
                    <FlexItem grow={false}>
                        <div className='text-[1.5rem] font-bold text-center w-full'>سفارشات شما</div>
                    </FlexItem>
                    {renderOrderItems.length ? (
                        <FlexItem className='mt-4 relative grow overflow-y-auto'>
                            <FlexBox gap={2} direction='column' className="overflow-y-auto h-full pb-10">
                                {renderOrderItems}
                            </FlexBox>
                            <Container className='h-10 bg-gradient-to-b from-transparent to-white bottom-0 right-0 left-0' />
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
                            <CallGarson onClick={handleCallGarson} isCancel={cancelGarsonCallButton} size='large' />

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

export default React.memo(Cart)
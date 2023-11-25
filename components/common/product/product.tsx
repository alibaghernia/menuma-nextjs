import React, { useCallback, useContext, useMemo } from 'react'
import { IProduct } from './types'
import Image from 'next/image'
import classNames from 'classnames'
import { LinedAddIcon } from '@/icons/lined_add'
import noImage from '@/assets/images/no-image.jpg'
import { ProviderContext } from '@/providers/main/provider';
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { serverBaseUrl } from '@/utils/axios'

export const Product: IProduct = (props) => {
    const router = useRouter()
    const params = useParams()
    const { state, functions } = useContext(ProviderContext)

    const productSlug = useMemo(() => params ? `/${params?.slug}/menu/${props.categoryId}/${props.id}` : "#", [params, props])



    const orderItem = useCallback((price: any) => {
        const key = `${props.id}-${price.id}`
        functions.cart.addItem({
            id: key,
            image: props.image || noImage.src,
            title: props.title,
            count: 1,
            price: price.price,
            type: price.title
        })
    }, [functions, props])

    const increaseOrderItemCount = useCallback((price: any) => {
        const key = `${props.id}-${price.id}`
        functions.cart.increaseCount(key)
    }, [functions, props.id])

    const decreasOrderItemCount = useCallback((price: any) => {
        const key = `${props.id}-${price.id}`
        const item = functions.cart.getItem(key)
        if (item!.count == 1) {
            functions.cart.removeItem(key)
        } else
            functions.cart.decreaseCount(key)
    }, [functions, props.id])


    const renderPrices = useCallback(() => props.prices.map((price, key) => {
        const itemId = `${props.id}-${price.id}`
        const order = functions.cart.getItem(itemId)
        return (
            <div className={classNames("w-full relative bg-white h-[5rem] mt-[-2rem] rounded-bl-[2rem] rounded-br-[2rem] overflow-hidden border border-white")} style={{
                zIndex: ~key
            }} key={price.id}>
                <span className="absolute inset-0 bg-typography/[.20]"></span>
                <div className="py-[.5rem] px-[1.7rem] absolute bottom-0 left-0 right-0 flex items-center justify-between">
                    <div className="flex gap-2 items-center px-[0.9rem]">
                        {props.prices.length > 1 && (
                            <div className="text-typography text-[1rem] font-bold">
                                {key + 1}-
                            </div>
                        )}
                        <div className="text-typography text-[1rem] font-bold" >
                            {price.title}
                        </div>
                    </div>
                    <div className={classNames('px-[.8rem] py-[.2rem] bg-white/[.3] flex items-center rounded-[1rem] gap-2 cursor-pointer transition-all duration-[.3s]', {
                        "active:scale-[.8]": !order
                    })} onClick={() => orderItem(price)}>
                        <div className="text-[1rem] font-[500] text-typography">
                            {`${parseInt(price.price).toLocaleString("IR-fa")} ت`}
                        </div>
                        {order ? (
                            <div className="flex items-center gap-2">
                                <div className="w-6 h-6 flex items-center justify-center bg-white/[.4] rounded-lg cursor-pointer active:scale-[.8] transition duration-[.2s]" onClick={(e) => { e.stopPropagation(); decreasOrderItemCount(price) }}>-</div>
                                {order.count}
                                <div className="w-6 h-6 flex items-center justify-center bg-white/[.4] rounded-lg cursor-pointer active:scale-[.8] transition duration-[.2s]" onClick={(e) => { e.stopPropagation(); increaseOrderItemCount(price) }}>+</div>
                            </div>
                        ) : (
                            <LinedAddIcon color='#434343' />
                        )}
                    </div>
                </div>
            </div>
        )
    }), [orderItem, increaseOrderItemCount, decreasOrderItemCount, functions, props])

    const renderImage = useCallback((mono: boolean) => {
        return (
            <Link href={productSlug} className={classNames("flex-shrink-0 bg-white !w-[10rem] overflow-hidden rounded-[2.4rem] block border border-black/[.05]", {
                "absolute !h-[12rem] right-[0]": !mono,
                "relative h-full": mono,
            })}>
                <Image fill src={props.image!} alt={props.title} className='z-0' />
                {props.single_mode && (
                    <>
                        <span className="z-10 absolute inset-0" style={{
                            background: "linear-gradient(180deg, rgba(255, 255, 255, 0.00) 40%, rgba(224, 224, 224, 0.75) 100%)"
                        }}></span>
                        <div className="text-[1.2rem] text-typography absolute bottom-[.3rem] left-[50%] translate-x-[-50%] font-bold z-20">
                            {`${parseInt(props.prices[0].price).toLocaleString("IR-fa")} ت`}
                        </div>
                    </>
                )}

            </Link>
        )
    }, [props, productSlug])

    const renderSingleModePrice = () => {

        return (<div className="text-[.8rem] px-[.8rem] py-[.3rem] text-typography bg-typography/[.1] text-center rounded-[1rem] font-[600] cursor-pointer active:scale-[.8] transition-transform duration-[.3s]" onClick={() => router.push(productSlug)}>
            سفارش
        </div>)
    }

    return (
        <div className={classNames({ "w-full": props.fullWidth }, props.className)}>
            <div className={classNames("flex items-center relative", { "w-full": props.fullWidth, "pr-[7.25rem]": !props.fullWidth, "flex flex-col": !props.single_mode })}>
                {!props.fullWidth && (
                    renderImage(false)
                )}
                <div className={classNames("bg-white h-[12.9rem] rounded-[2rem] flex border border-black/[.05]", { "w-[16.3rem] pr-[5.6rem] flex-col  py-[1.1rem] pl-[1.4rem]  items-center  justify-between": !props.fullWidth, "w-full p-[1rem] items-start gap-[1.4rem] z-10": props.fullWidth, "z-20": !props.single_mode })}>
                    {props.fullWidth && (
                        renderImage(true)
                    )}
                    <div className='flex flex-col gap-2'>
                        <Link href={productSlug} className="text-[1.2rem] font-[500] text-typography w-full">
                            {props.title}
                        </Link>
                        <div className="text-[0.8rem] font-[300] text-typography w-full line-clamp-[4]">
                            {props.descriptions}
                        </div>
                    </div>
                    {props.single_mode && renderSingleModePrice()}
                </div>
                {!props.single_mode && (
                    <div className="flex shrink-0 flex-col w-full z-0">
                        {renderPrices()}
                    </div>
                )}
            </div>
        </div>
    )
}

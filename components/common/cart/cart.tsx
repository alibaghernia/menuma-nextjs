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
import { ProviderContext } from '@/store/provider'

export const Cart: ICart = (props) => {
    const resolvedTailwindConfig = resolveConfig(tailwindConfig)
    const { state, functions } = useContext(ProviderContext)

    const orderItems = state.cart

    const renderOrderItems = orderItems.map((orderItem, key) => (
        <div className="flex gap-3 border border-black/[0.05] px-[.5rem] py-[.5rem] rounded-[1.5rem]" key={key}>
            <div className="relative w-[10rem] bg-white rounded-[.5rem] overflow-hidden">
                <Image fill src={sperso.src} alt='' />
            </div>
            <div className="flex flex-col gap-10 w-full ">
                <div className="flex items-center justify-between">
                    <div className="flex flex-col gap-1">
                        {`${orderItem.title} - ${orderItem.type}`}
                    </div>
                    <div className="cursor-pointer" onClick={(e) => { e.stopPropagation(); functions.cart.removeItem(orderItem.id) }}>
                        <Trash1Icon color={colors.red[500]} />
                    </div>
                </div>
                <div className="flex justify-between gap-3 items-center">
                    <div className="text-[.7rem] font-bold whitespace-nowrap">
                        {orderItem.count > 1 ? `${(orderItem.price).toLocaleString("IR-fa")} * ${orderItem.count}` : (orderItem.price).toLocaleString("IR-fa")}
                    </div>
                    <hr className='w-full' />
                    <div className="flex items-center gap-1 whitespace-nowrap">
                        <div className="text-[1rem] font-bold bg-typography text-white px-[.7rem] py-[.2rem] rounded-full">
                            {(orderItem.price * orderItem.count).toLocaleString("IR-fa")} ت
                        </div>
                    </div>
                </div>
            </div>
        </div>
    ))

    const getCartSum = () => {
        const prices = orderItems.map(orderItem => orderItem.price * orderItem.count)
        if (!prices.length) return 0
        return prices.reduce((a, b) => a + b).toLocaleString("IR-fa")
    }


    return (
        <div className={classNames("fixed left-[50%] translate-x-[-50%] max-w-sm w-full py-[1rem] px-[1.5rem] pb-[3rem] bg-white z-50 rounded-[2.5rem] top-[5rem] bottom-[5rem] overflow-hidden flex flex-col", { "block": props.open, "hidden": !props.open })}>
            <div className="absolute top-[1.5rem] right-[2rem]">
                <div className=" cursor-pointer" onClick={props.onClose}>
                    <LinedCloseIcon color={resolvedTailwindConfig.theme?.colors?.['typography'].toString()} />
                </div>
            </div>
            <div className="text-[1.5rem] font-bold text-center w-full grow-0">سفارشات شما</div>
            {renderOrderItems.length ? (
            <div className="flex flex-col mt-4 overflow-y-auto grow">
                {renderOrderItems}
            </div>
            ) : (
                <div className="flex flex-col justify-center grow">
                    <div className="text-gray-400 text-center">سفارشی ثبت نکرده اید</div>
                </div>
            )}
            <div className="mt-[1.5rem] grow-0">
                <div className="flex gap-3 items-center whitespace-nowrap">
                    <div className="text-[1rem]">
                        مبلغ قابل پرداخت
                    </div>
                    <hr className='w-full' />
                    <div className="text-[1rem]">
                        {getCartSum()} تومان
                    </div>
                </div>
            </div>
            <div className="mt-[1.5rem] grow-0">
                <div className="px-[2rem] py-[.8rem] w-full text-center text-typography bg-more/[.1] active:bg-more/[.2] active:scale-[.99] active:text-more transition-colors duration-[.1s] select-none border border-more rounded-[1rem] font-bold">
                    صدا زدن گارسون
                </div>
            </div>
        </div >
    )
}

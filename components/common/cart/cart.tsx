import React from 'react'
import { ICart } from './types'
import classNames from 'classnames'
import { LinedCloseIcon } from '@/icons/lined_close'
import sperso from '@/assets/images/sperso.png'
import resolveConfig from 'tailwindcss/resolveConfig'
import colors from 'tailwindcss/colors'
import tailwindConfig from '../../../tailwind.config'
import Image from 'next/image'
import { Trash1Icon } from '@/icons/trash1'

export const Cart: ICart = (props) => {
    const resolvedTailwindConfig = resolveConfig(tailwindConfig)

    const orderItems = [
        {
            title: "اسپرسو",
            type: "تک",
            price: 45000,
            count: 2,
        },
        {
            title: "اسپرسو",
            type: "دبل",
            price: 50000,
            count: 3,
        },
    ]

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
                    <div className="cursor-pointer">
                        <Trash1Icon color={colors.red[500]} />
                    </div>
                </div>
                <div className="flex justify-between gap-3 items-center">
                    <div className="text-[.7rem] font-bold whitespace-nowrap">
                        {`${(orderItem.price).toLocaleString("IR-fa")} * ${orderItem.count}`}
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
        return orderItems.map(orderItem => orderItem.price * orderItem.count).reduce((a, b) => a + b).toLocaleString("IR-fa")
    }


    return (
        <div className={classNames("fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] max-w-sm w-full py-[1rem] px-[1.5rem] pb-[3rem] bg-white z-50 rounded-[2.5rem]", { "block": props.open, "hidden": !props.open })}>
            <div className="flex flex-col">
                <div className="absolute top-[1.5rem] right-[2rem] cursor-pointer" onClick={props.onClose}>
                    <LinedCloseIcon color={resolvedTailwindConfig.theme?.colors?.['typography'].toString()} />
                </div>
                <div className="text-[1.5rem] font-bold text-center">سفارشات شما</div>
                <div className="flex flex-col gap-3 mt-[2rem]">
                    {renderOrderItems}
                </div>
                <div className="mt-[1.5rem]">
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
            </div>
        </div>
    )
}

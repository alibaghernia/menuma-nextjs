import React, { useCallback } from 'react'
import { IProduct } from './types'
import Image from 'next/image'
import classNames from 'classnames'
import { LinedAddIcon } from '@/icons/lined_add'

export const Product: IProduct = (props) => {

    const renderPrices = useCallback(() => props.prices.map((price, key) => (
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
                    <div className="text-typography text-[1rem] font-bold">
                        {price.title}
                    </div>
                </div>
                <div className='px-[.8rem] py-[.2rem] bg-white/[.3] flex items-center rounded-[1rem] gap-2 active:scale-[.8] cursor-pointer transition-all duration-[.3s] '>
                    <div className="text-[1rem] font-[500] text-typography">
                        {`${price.amount.toLocaleString("IR-fa")} ت`}
                    </div>
                    <LinedAddIcon color='#434343' />
                </div>
            </div>
        </div>
    )), [props.prices])


    return (
        <div className={classNames({ "w-full": props.fullWidth }, props.className)}>
            <div className={classNames("flex items-center relative", { "w-full": props.fullWidth, "pr-[7.25rem]": !props.fullWidth, "flex flex-col": !props.single_mode })}>
                {!props.fullWidth && (
                    <div className="absolute bg-white !w-[10rem] !h-[12rem] overflow-hidden rounded-[2.4rem] right-[0] border border-black/[.05]">
                        <Image fill src={props.image!} alt={props.title} className='z-0' />
                        {props.single_mode && (
                            <>
                                <span className="z-10 absolute inset-0" style={{
                                    background: "linear-gradient(180deg, rgba(255, 255, 255, 0.00) 50.52%, rgba(224, 224, 224, 0.75) 100%)"
                                }}></span>
                                <div className="text-[1rem] font-[500] text-typography absolute bottom-[.3rem] left-[3rem] z-20">
                                    {`${props.prices[0].amount.toLocaleString("IR-fa")} ت`}
                                </div>
                            </>
                        )}

                    </div>
                )}
                <div className={classNames("bg-white h-[12.9rem] rounded-[2rem] flex border border-black/[.05]", { "w-[16.3rem] pr-[5.6rem] flex-col  py-[1.1rem] pl-[1.4rem]  items-center  justify-between": !props.fullWidth, "w-full p-[1rem] items-start gap-[1.4rem] z-10": props.fullWidth, "z-20": !props.single_mode })}>
                    {props.fullWidth && (
                        <div className="relative bg-white !w-[10rem] h-full overflow-hidden rounded-[2.4rem] right-[0] border border-black/[.05]">
                            <Image fill src={props.image!} alt={props.title} className='z-0' />
                            {props.single_mode && (
                                <>
                                    <span className="z-10 absolute inset-0" style={{
                                        background: "linear-gradient(180deg, rgba(255, 255, 255, 0.00) 50.52%, rgba(224, 224, 224, 0.75) 100%)"
                                    }}></span>
                                    <div className="text-[1rem] font-[500] text-typography absolute bottom-[.3rem] left-[3rem] z-20">
                                        {`${props.prices[0].amount.toLocaleString("IR-fa")} ت`}
                                    </div>
                                </>
                            )}

                        </div>
                    )}
                    <div className='flex flex-col gap-2'>
                        <div className="text-[1.2rem] font-[500] text-typography w-full">
                            {props.title}
                        </div>
                        <div className="text-[0.8rem] font-[300] text-typography w-full">
                            {props.descriptions}
                        </div>
                    </div>
                    {props.single_mode && (
                        <div className="text-[.8rem] px-[.8rem] py-[.3rem] text-typography bg-typography/[.1] text-center rounded-[1rem] font-[600]">
                            افزودن به سفارشات
                        </div>
                    )}
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

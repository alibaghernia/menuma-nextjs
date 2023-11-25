import React from 'react'
import { ISection } from './types'
import classNames from 'classnames'
import { twMerge } from 'tailwind-merge'

const Section: ISection = ({ children, ...props }) => {
    return (
        <div className={twMerge("flex flex-col gap-[.5rem]", props.className)} id={props.id}>
            <div className="flex gap-2 items-center justify-between px-[1.9rem]">
                <div className="text-[1.4rem] text-typography w-fit whitespace-nowrap">
                    {props.title}
                </div>
                <hr className='border-black/10 w-full' />
                {props.append && (
                    <div className="w-fit">
                        {props.append}
                    </div>
                )}
            </div>
            <div className={classNames(props.contentClassNames)}>
                {children}
            </div>
        </div>
    )
}

const AppentRegularButton: ISection['AppentRegularButton'] = (props) => {
    return (
        <div className='text-more whitespace-nowrap text-[1rem] font-bold cursor-pointer' onClick={props.onClick}>مشاهده همه</div>
    )
}

Section.AppentRegularButton = AppentRegularButton;

export { Section }
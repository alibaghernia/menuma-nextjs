import React from 'react'
import { ISection } from './types'
import classNames from 'classnames'

export const Section: ISection = ({ children, ...props }) => {
    return (
        <div className={classNames("flex flex-col gap-[.5rem]", props.className)}>
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

import classNames from 'classnames'
import React from 'react'
import { twMerge } from 'tailwind-merge'
import { IAbsoluteContainer } from './types'

export const AbsoluteContainer: IAbsoluteContainer = ({ children, ...props }) => {
    return (
        <div className={
            twMerge(
                "absolute",
                classNames({
                    "left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]": props.center
                },
                    props.className
                )
            )}>
            {children}
        </div>
    )
}

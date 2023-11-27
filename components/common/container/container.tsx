import classNames from 'classnames'
import React from 'react'
import { twMerge } from 'tailwind-merge'
import { IContainer } from './types'

export const Container: IContainer = ({
    children,
    position = "absolute",
    className,
    ...props
}) => {
    return (
        <div
            className={
                twMerge(
                    classNames(
                        position,
                        {
                            "left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]": typeof props.center == "boolean",
                            "left-[50%] translate-x-[-50%]": typeof props.center == "string" && props.center == "horizontal",
                            "top-[50%] translate-y-[-50%]": typeof props.center == "string" && props.center == "vertical",
                        },
                        className
                    )
                )
            }
            {...props}
        >
            {children}
        </div>
    )
}

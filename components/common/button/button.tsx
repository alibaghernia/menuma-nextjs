import React, { useMemo } from 'react'
import { IButton } from './types'
import classNames from 'classnames'
import { twMerge } from 'tailwind-merge'

export const Button: IButton = ({ type = "primary", color = "primary", ...props }) => {
    const isThemeColor = useMemo(() => color == "primary" || color == "secondary", [color])
    const button = useMemo(() => (
        <div
            className={twMerge('cursor-pointer',
                classNames(
                    twMerge('text-[1rem] rounded-[.625rem] px-[.8rem] py-[.3rem] text-typography bg-white cursor-pointer whitespace-nowrap  w-fit select-none', props.className),
                    {
                        [`rounded-[${props.rounded}]`]: typeof props.rounded == "string",
                        [`rounded-full`]: typeof props.rounded == "boolean",
                        [`shadow-[${props.shadow}]`]: typeof props.shadow == "string",
                        [`shadow`]: typeof props.shadow == "boolean",
                        [`bg-primary text-white`]: type == "primary" && isThemeColor,
                        [`bg-secondary text-white`]: type == "primary" && color == "secondary",
                        [`border border-${isThemeColor ? color : `[${color}]`} text-${isThemeColor ? color : `[${color}]`}`]: type == "ghost",
                    },
                ))}
            style={{
                ...(!isThemeColor ? {
                    "backgroundColor": color
                } : {})
            }}
            onClick={props.onClick}

        >
            {props.children}
        </div>
    ), [props, color, type, isThemeColor])

    return props.link ? (
        <a target={props.linkTarget} href={props.link}>{button}</a>
    ) : button
}

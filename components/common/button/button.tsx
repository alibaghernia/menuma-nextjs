import React, { useMemo } from 'react'
import { IButton } from './types'
import classNames from 'classnames'
import { twMerge } from 'tailwind-merge'

export const Button: IButton = (props) => {

    const button = useMemo(() => (
        <div
            className={classNames(
                twMerge('text-[1rem] px-[.8rem] py-[.3rem] text-typography bg-white cursor-pointer whitespace-nowrap  w-fit', props.className),
                {
                    [`rounded-[${props.rounded}]`]: typeof props.rounded == "string",
                    [`rounded-full`]: typeof props.rounded == "boolean",
                    [`shadow-[${props.shadow}]`]: typeof props.shadow == "string",
                    [`shadow`]: typeof props.shadow == "boolean",
                }
            )}
            onClick={props.onClick}
        >
            {props.children}
        </div>
    ), [props])

    return props.link ? (
        <a target={props.linkTarget} href={props.link}>{button}</a>
    ) : button
}

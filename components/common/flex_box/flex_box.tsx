import React from 'react'
import { IFlexBox } from './types'
import classNames from 'classnames'
import { twMerge } from 'tailwind-merge'

export const FlexBox: IFlexBox = ({
    children,
    alignItems = "stretch",
    justify = "normal",
    direction = "row",
    className,
    style,
    ...props
}) => {
    return (
        <div className={
            twMerge(
                classNames(
                    'flex',
                    {
                        "flex-row": direction == "row",
                        "flex-col": direction == "column",
                    },
                    `justify-${justify}`,
                    `items-${alignItems}`,
                    {
                        [`gap-${props.gap}`]: typeof props.gap == "number",
                    },
                ), className)}
            style={{
                gap: typeof props.gap == "string" ? props.gap : undefined,
                ...(style || {})
            }}
            {...props}
        >
            {children}
        </div>
    )
}

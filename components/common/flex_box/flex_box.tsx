import React from 'react'
import { IFlexBox } from './types'
import classNames from 'classnames'

export const FlexBox: IFlexBox = ({
    children,
    alignItems = "stretch",
    justify = "normal",
    direction = "row",
    className,
    ...props
}) => {
    return (
        <div className={classNames(
            'flex',
            {
                "flex-row": direction == "row",
                "flex-col": direction == "column",
            },
            `justify-${justify}`,
            `items-${alignItems}`,
            {
                [`gap-${props.gap}`]: typeof props.gap == "number",
                [`gap-[${props.gap}]`]: typeof props.gap == "string",
            },
            className
        )}>{children}</div>
    )
}

import React, { useMemo } from 'react'
import { ILabel } from './types'
import classNames from 'classnames'
import { twMerge } from 'tailwind-merge'

export const Label: ILabel = (props) => {
    const label = useMemo(() => (
        <label htmlFor={props.for}
            className={twMerge(classNames(
                twMerge('block mb-2 text-sm font-medium text-gray-900 ddd:text-white', props.className)
            ))}>
            {props.children}
        </label >


    ), [props])


    return label
}

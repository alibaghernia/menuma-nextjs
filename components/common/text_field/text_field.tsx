import React from 'react'
import { ITextField } from './types'
import classNames from 'classnames'
import { twMerge } from 'tailwind-merge'

export const TextField: ITextField = (props) => {
    return (
        <input
            type="text"
            name="name"
            id="name"
            onChange={() => props.onChange}
            className={twMerge(classNames(
                twMerge('block mb-2 text-sm font-medium text-gray-900 ddd:text-white', props?.className)
            ))}
            required={props?.required}
            placeholder={props?.placeholder}
        />
    )
}

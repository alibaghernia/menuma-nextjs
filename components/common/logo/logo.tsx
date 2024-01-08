import React, { useMemo } from 'react'
import { ILogo } from './types'
import classNames from 'classnames'
import { twMerge } from 'tailwind-merge'

export const Logo: ILogo = (props) => {

    return (
        <div className="text-[2.5rem] flex items-center">
            <div className="text-primary">
                منو
            </div>
            <div className="text-secondary">
                ما
            </div>
        </div>
    )
}

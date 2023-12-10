import React, { useMemo } from 'react'
import { IBadge } from './types'
import { FireIcon } from '@/icons/fire'
import { NewIcon } from '@/icons/new'

export const Badge: IBadge = (props) => {
    const typeBadge = useMemo(() => ({
        new: <div className="
        bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-green-10 dark:text-green-900 flex items-center">
            <NewIcon />
            جدید
        </div>,
        hot: <div className="
        bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-red-100 dark:text-red-900  flex items-center">
            <FireIcon color='red' />
            ویژه
        </div>,
        soldout: <div className="
        bg-white text-black-800 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-gray-300 dark:text-typography flex items-center">
            ناموجود
        </div>
    }), [])
    const badge = useMemo(() => (
        typeBadge[props.type!]
    ), [props.type, typeBadge])
    return badge
}

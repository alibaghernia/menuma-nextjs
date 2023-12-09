import React, { useMemo } from 'react'
import { IBadge } from './types'
import { FireIcon } from '@/icons/fire'
import { NewIcon } from '@/icons/new'

export const Badge: IBadge = (props) => {
    const typeBadge = {
        new: <span className="
        bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-red-900 dark:text-red-300 inline-flex items-center absolute top-0 right-0 mt-2 mr-3">
            <NewIcon />
            جدید
        </span>,
        hot: <span className="
        bg-red-100 text-red-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-red-900 dark:text-red-300 inline-flex items-center absolute top-0 right-0 mt-2 mr-3">
            <FireIcon />
            ویژه
        </span>,
        sold_out: <span className="
        bg-white text-black-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-red-900 dark:text-red-300 inline-flex items-center absolute top-0 right-0 mt-2 mr-3">
            ناموجود
        </span>
    }
    const badge = useMemo(() => (
        typeBadge[props?.type]
    ), [props])
    return badge
}

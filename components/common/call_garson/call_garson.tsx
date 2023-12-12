import React, { useMemo } from 'react'
import { ICallGarson } from './types'
import classNames from 'classnames'

export const CallGarson: ICallGarson = ({ onClick, isCancel, size: buttonSize }) => {

    const size = useMemo(() => classNames({
        "px-[1rem] py-[.2rem] text-[.9rem]": buttonSize == "small",
        "px-[2rem] py-[.8rem]": buttonSize == "large",

    }), [buttonSize])

    return (
        <div className={classNames(
            size,
            "w-full text-center text-typography active:scale-[.99]  transition-colors duration-[.1s] select-none border  rounded-[1rem] font-bold whitespace-nowrap",
            {
                "active:text-more border-more bg-more/[.1] active:bg-more/[.2]": !isCancel,
                "active:text-typography border-gray bg-gray/[.1] active:bg-gray/[.2]": isCancel,
            }
        )} onClick={onClick}>
            {
                isCancel ? 'لغو درخواست گارسون' : 'صدا زدن گارسون'
            }
        </div>
    )
}

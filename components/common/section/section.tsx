import React from 'react'
import { ISection } from './types'
import classNames from 'classnames'

export const Section: ISection = ({ children, ...props }) => {
  return (
    <div className={classNames("flex flex-col gap-[1.3rem]", props.classNames)}>
        <div className="flex gap-2 items-center justify-between px-[1.9rem]">
        {props.append && (
            <div className="w-fit">
                {props.append}
            </div>
        )}
            <hr className='border-black/10 w-full'/>
            <div className="text-[1.1rem] text-typography w-fit whitespace-nowrap">
                {props.title}
            </div>
        </div>
        {children}
    </div>
  )
}

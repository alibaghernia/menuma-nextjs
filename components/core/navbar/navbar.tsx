import React from 'react'
import { INavBar } from './types'
import { MenuIcon } from '@/icons/menu'
import classNames from 'classnames'
import { ArrowBackIcon } from '@/icons/arrow-back'
import { NoteIcon } from '@/icons/note'

export const Navbar: INavBar = (props) => {
    return (
        <div 
        className={classNames("flex items-center justify-between  px-[1.6rem] z-20 left-0 right-0 top-[1.2rem]", { "fixed ": props.fixed, "absolute ": !props.fixed, })}>
            <div className='flex items-center gap-[1rem]'>
                {props.back && (
                    <ArrowBackIcon width={32} height={33} color={props.dark ? "white" : "#434343"} />
                )}
                {props.note && (
                    <NoteIcon width={32} height={33} color={props.dark ? "white" : "#434343"} />
                )}
            </div>
            <div className='flex items-center gap-[.7rem]'>
                {
                    props.title && (
                        <div className={classNames({
                            "text-typography": !props.dark,
                            "text-white": props.dark,
                        }, "text-[1.3rem]")}>{props.title}</div>
                    )
                }
                <MenuIcon width={32} height={32} color={props.dark ? "white" : "#434343"} />
            </div>
        </div>
    )
}

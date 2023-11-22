import React, { useMemo } from 'react'
import styles from './header.module.scss'
import { IProfileHeader } from '../header/types'
import classnames from 'classnames'
import Image from 'next/image'
import Link from 'next/link'

export const ProfileHeader: IProfileHeader = (props) => {


  const timeShifts = useMemo(() => {
    const elements = props.time_shifts.map((shift, key) => (
      <div className="p-2 text-white text-[1rem] rounded-lg px-[.6rem] py-[.3rem] bg-white/[.20]" key={key}>
        {shift}
      </div>
    ))
    return (
      <div className="flex gap-2">
        {elements}
      </div>  
    )
  }, [])

  const socials = useMemo(() => {
    const elements = props.socials.map((social, key) => (
      <Link href={social.url} key={key}>
        {social.icon}
      </Link>
    ))
    return (
      <div className="flex gap-2">
        {elements}
      </div>
    )
  }, [])

  return (
    <div className='relative'>
      <div className="flex flex-col pt-[5.1rem] pb-[5.6rem] relative rounded-bl-[3.6rem] rounded-br-[3.6rem] overflow-hidden z-10">
        <Image fill src={props.image_url} alt="" className='absolute inset-0 -z-20' />
        <span className='absolute inset-0 -z-10 bg-black/[.6]' />
        <div className="text-[1.8rem] mx-auto font-bold text-white">{props.title}</div>
        <div className="text-[1rem] mx-auto font-light text-white">{props.address}</div>
        <div className="mx-auto mt-[1.4rem]">
          {timeShifts}
        </div>
        <div className="mx-auto mt-[1.4rem]">
          {socials}
        </div>
      </div>
      <div className="absolute left-[50%] bottom-[-4.25rem] rounded-full z-20 w-[8.5rem] h-[8.5rem] translate-x-[-50%] overflow-hidden border-[0.7rem] border-secondary">
        <Image fill src={props.logo_url} alt={props.title} />
      </div>
    </div>
  )
}

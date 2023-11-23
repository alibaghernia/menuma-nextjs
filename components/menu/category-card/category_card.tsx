import React from 'react'
import { ICategoryCard } from './types'
import Link from 'next/link'
import Image from 'next/image'
import classNames from 'classnames'

export const CategoryCard: ICategoryCard = (props) => {
  return (
    <Link href={props.url || "#"} className={classNames("rounded-[.625rem] w-[9.7rem] h-[11.9rem] relative px-[3.3rem] py-[4.4rem] block overflow-hidden", { "border-4": props.selected, "border-more": props.selected })} onClick={props.onClick}>
      <Image fill src={props.image} alt={props.title} className='z-0 object-cover' />
      <span className="bg-black/[.6] absolute inset-0 z-0" />

      <div className="text-white text-[1.2rem] font-bold text-center absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] z-20">{props.title}</div>
    </Link>
  )
}

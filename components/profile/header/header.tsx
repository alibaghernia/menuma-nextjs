import React, { useMemo } from 'react'
import styles from './header.module.scss'
import { IProfileHeader } from '../header/types'
import classnames from 'classnames'
import Image from 'next/image'
import Link from 'next/link'
import { Container } from '@/components/common/container/container'
import { FlexBox } from '@/components/common/flex_box/flex_box'
import { FlexItem } from '@/components/common/flex_item/flex_item'

export const ProfileHeader: IProfileHeader = (props) => {


  const timeShifts = useMemo(() => {
    const elements = props.time_shifts.map((shift, key) => (
      <FlexItem
        className="p-2 text-white text-[.9rem] rounded-lg px-[.6rem] py-[.3rem] bg-white/[.20]"
        key={key}
      >
        {shift}
      </FlexItem>
    ))
    return (
      <FlexBox gap={2}>
        {elements}
      </FlexBox>
    )
  }, [props])

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
  }, [props])

  return (
    <Container position='relative'>
      <FlexBox
        direction='column'
        className="pt-[5.1rem] pb-[5.6rem] relative rounded-bl-[2.6rem] rounded-br-[2.6rem] overflow-hidden z-10"
      >
        <FlexItem>
          <Image
            fill
            src={props.image_url} alt={props.title}
            className='absolute inset-0 -z-20 object-cover'
          />
          <Container className='inset-0 -z-10 bg-black/[.6]' />
        </FlexItem>
        <FlexItem
          className="text-[1.8rem] mx-auto font-bold text-white">
          {props.title}
        </FlexItem>
        <FlexItem
          className="text-[1rem] mx-auto font-light text-white text-center">
          {props.address}
        </FlexItem>
        {/* <div className="mx-auto mt-[1.4rem]">
          {timeShifts}
        </div> */}
        <FlexItem className="mx-auto mt-[1.4rem]">
          {socials}
        </FlexItem>
      </FlexBox>
      <Container
        className="left-[50%] bottom-[-4.25rem] rounded-full z-20 w-[8.5rem] h-[8.5rem] translate-x-[-50%] overflow-hidden border-[0.7rem] border-secondary"
      >
        <Image
          fill
          src={props.logo_url}
          alt={props.title}
          className='object-cover'
        />
      </Container>
    </Container>
  )
}

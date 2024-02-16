'use server';
import React from 'react';
import { IEventCard } from './types';
import { FlexBox } from '../flex_box/flex_box';
import { FlexItem } from '../flex_item/flex_item';
import Image from 'next/image';
import { PeopleIcon } from '@/icons/people';
import resolveConfig from 'tailwindcss/resolveConfig';
import tailwindConfig from '@/tailwind.config';
import { CalendarIcon } from '@/icons/calendar';
import moment from 'jalali-moment';
import { ClockIcon } from '@/icons/clock';
import classNames from 'classnames';
import Link from '@/components/common/link/link';
import { twMerge } from 'tailwind-merge';
import { Button } from 'antd/lib';

export const EventCard: IEventCard = (props) => {
  const resolvedTailwindConfig = resolveConfig(tailwindConfig);
  const jMoment = moment(props.start_at);
  jMoment.locale('fa');
  const date = jMoment.format('dddd jD jMMMM');

  const clock = (() => {
    const from = moment(props.start_at, 'HH:mm:ss').format('HH:mm');
    const to = moment(props.end_at, 'HH:mm:ss').format('HH:mm');
    if (props.end_at) return `${from} تا ${to}`;
    return from;
  })();
  return (
    <>
      <FlexBox
        className={twMerge(
          classNames(
            'p-[1rem] bg-white gap-[.62rem] rounded-[1rem] shadow w-full sm:w-[30rem]',
            props.className,
          ),
        )}
        direction="column"
      >
        <FlexItem>
          <FlexBox className="gap-[.81rem]">
            <FlexItem
              className={twMerge(
                classNames(
                  'w-[7rem] h-[7rem] relative rounded-[.625rem] overflow-hidden shrink-0',
                  {
                    'bg-gray-100': !!!props.banner_url,
                    'rounded-full overflow-hidden border-black/[.1] border':
                      !!props.business?.logo_url,
                  },
                ),
              )}
            >
              {props.banner_url ? (
                <Image
                  fill
                  alt={props.title}
                  src={props.banner_url}
                  className="object-cover"
                />
              ) : props.business?.logo_url ? (
                <Image
                  fill
                  alt={props.title}
                  src={props.business?.logo_url}
                  className="object-cover"
                />
              ) : (
                <div className="text-gray-400 font-bold text-[1rem] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
                  دورهمی
                </div>
              )}
            </FlexItem>
            <FlexItem>
              <FlexBox
                direction="column"
                className="gap-[.3rem]"
                alignItems="start"
              >
                <FlexItem className="text-[1.2rem] text-typography font-semibold">
                  {props.title}
                </FlexItem>
                {!props.in_scope && (
                  <FlexItem className="bg-typography/[.9] text-white text-[.689rem] px-[.5rem] py-[.2rem] rounded-[.3125rem] w-fit">
                    {props.business?.name}
                  </FlexItem>
                )}
                <FlexItem className="text-typography text-[.862rem] line-clamp-[3]">
                  {props.short_description}
                </FlexItem>
              </FlexBox>
            </FlexItem>
          </FlexBox>
        </FlexItem>
        <FlexItem>
          <FlexBox
            justify="center"
            alignItems="center"
            className="gap-[.75rem]"
          >
            <FlexItem>
              <FlexBox className="gap-[.5rem]" alignItems="center">
                <FlexItem>
                  <CalendarIcon
                    color={resolvedTailwindConfig.theme?.colors![
                      'typography'
                    ].toString()}
                    width={20}
                    height={20}
                  />
                </FlexItem>
                <FlexItem className="text-typography text-[.862rem]">
                  {date}
                </FlexItem>
              </FlexBox>
            </FlexItem>
            <FlexItem>
              <FlexBox className="gap-[.5rem]" alignItems="center">
                <FlexItem>
                  <ClockIcon
                    color={resolvedTailwindConfig.theme?.colors![
                      'typography'
                    ].toString()}
                    width={20}
                    height={20}
                  />
                </FlexItem>
                <FlexItem className="text-typography text-[.862rem]">
                  {clock}
                </FlexItem>
              </FlexBox>
            </FlexItem>
            {!!props.limit && (
              <FlexItem>
                <FlexBox className="gap-[.5rem]" alignItems="center">
                  <FlexItem>
                    <PeopleIcon
                      color={resolvedTailwindConfig.theme?.colors![
                        'typography'
                      ].toString()}
                      width={20}
                      height={20}
                    />
                  </FlexItem>
                  <FlexItem className="text-typography text-[.862rem]">
                    {props.limit} نفر
                  </FlexItem>
                </FlexBox>
              </FlexItem>
            )}
          </FlexBox>
        </FlexItem>
        <FlexItem className="mt-[.5rem]">
          <Link
            href={`/${[props.slug || props.business?.slug, 'events', props.uuid]
              .filter(Boolean)
              .join('/')}`}
            className="block"
          >
            <Button block type="primary">
              مشاهده
            </Button>
          </Link>
        </FlexItem>
      </FlexBox>
    </>
  );
};

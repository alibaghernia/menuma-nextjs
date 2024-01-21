import React, { useMemo } from 'react';
import { IEventCard } from './types';
import { FlexBox } from '../flex_box/flex_box';
import { FlexItem } from '../flex_item/flex_item';
import Image from 'next/image';
import noImage from '@/assets/images/no-image.jpg';
import { PeopleIcon } from '@/icons/people';
import resolveConfig from 'tailwindcss/resolveConfig';
import tailwindConfig from '@/tailwind.config';
import { CalendarIcon } from '@/icons/calendar';
import moment from 'jalali-moment';
import { ClockIcon } from '@/icons/clock';
import { Button } from '../button';
import classNames from 'classnames';
import Link from 'next/link';
import { useSlug } from '@/providers/main/hooks';
import { serverBaseUrl } from '@/utils/axios';
import { twMerge } from 'tailwind-merge';

export const EventCard: IEventCard = (props) => {
  const resolvedTailwindConfig = resolveConfig(tailwindConfig);
  const slug = useSlug(false);
  const date = useMemo(() => {
    const jMoment = moment(props.date);
    jMoment.locale('fa');
    return jMoment.format('dddd jD jMMMM');
  }, [props.date]);

  const clock = useMemo(() => {
    const from = moment(props.from, 'HH:mm:ss').format('HH:mm');
    const to = moment(props.to, 'HH:mm:ss').format('HH:mm');
    if (props.to) return `${from} تا ${to}`;
    return from;
  }, [props.from, props.to]);

  return (
    <>
      <FlexBox
        className={twMerge(
          classNames(
            'p-[1rem] bg-white gap-[.62rem] rounded-[1rem] shadow w-[30rem]',
            props.className,
          ),
        )}
        direction="column"
      >
        <FlexItem>
          <FlexBox className="gap-[.81rem]">
            <FlexItem className="w-[7rem] h-[7rem] relative rounded-[.625rem] overflow-hidden shrink-0">
              <Image
                fill
                alt={props.name}
                src={
                  props.banner_path
                    ? `${serverBaseUrl}/storage/${props.banner_path}`
                    : noImage.src
                }
                className="object-cover"
              />
            </FlexItem>
            <FlexItem>
              <FlexBox
                direction="column"
                className="gap-[.3rem]"
                alignItems="start"
              >
                <FlexItem className="text-[1.2rem] text-typography font-semibold">
                  {props.name}
                </FlexItem>
                <FlexItem className="bg-typography/[.9] text-white text-[.689rem] px-[.5rem] py-[.2rem] rounded-[.3125rem] w-fit">
                  {props.cafe_restaurant?.name}
                </FlexItem>
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
            {!!props.capacity && (
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
                    {props.capacity} نفر
                  </FlexItem>
                </FlexBox>
              </FlexItem>
            )}
          </FlexBox>
        </FlexItem>
        <FlexItem className="mt-[.5rem]">
          <Button
            className="w-full text-center text-[.862rem] py-[.5rem]"
            type="primary"
          >
            <Link
              href={`/${props.cafe_restaurant?.slug}/events/${props.id}`}
              className="block"
            >
              مشاهده جزئیات
            </Link>
          </Button>
        </FlexItem>
      </FlexBox>
    </>
  );
};

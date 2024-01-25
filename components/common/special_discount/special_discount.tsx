import React from 'react';
import { ISpecialDiscount } from './types';
import { FlexBox } from '../flex_box/flex_box';
import { FlexItem } from '../flex_item/flex_item';
import Image from 'next/image';
import noImage from '@/assets/images/no-image.jpg';
import { Button } from '../button';
import classNames from 'classnames';
import Link from 'next/link';
import { serverBaseUrl } from '@/utils/axios';
import { twMerge } from 'tailwind-merge';

export const SpecialDiscount: ISpecialDiscount = (discount) => {
  return (
    <>
      <FlexBox
        className={twMerge(
          classNames(
            'p-[1rem] bg-white gap-[.62rem] w-full max-w-[30rem] !overflow-hidden !rounded-[1rem] border ',
            discount.className,
          ),
        )}
        direction="column"
      >
        <FlexItem>
          <FlexBox className="gap-[.81rem]">
            <FlexItem className="w-[7rem] h-[7rem] relative rounded-[.625rem] overflow-hidden shrink-0">
              <Image
                fill
                alt={discount.title}
                src={
                  discount.business_logo
                    ? `${serverBaseUrl}/storage/${discount.business_logo}`
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
                  {discount.title}
                </FlexItem>
                <FlexItem className="bg-typography/[.9] text-white text-[.689rem] px-[.5rem] py-[.2rem] rounded-[.3125rem] w-fit">
                  {discount.business_title}
                </FlexItem>
                <FlexItem className="text-typography text-[.862rem] line-clamp-[3]">
                  {discount.description}
                </FlexItem>
              </FlexBox>
            </FlexItem>
          </FlexBox>
        </FlexItem>

        <FlexItem className="mt-[.5rem]">
          <Button
            className="w-full text-center text-[.862rem] py-[.5rem]"
            type="primary"
          >
            <Link href={`/${discount.business_slug}`} className="block">
              مشاهده کافه
            </Link>
          </Button>
        </FlexItem>
      </FlexBox>
    </>
  );
};
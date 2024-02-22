import React from 'react';
import { ISpecialDiscount } from './types';
import { FlexBox } from '../flex_box/flex_box';
import { FlexItem } from '../flex_item/flex_item';
import Image from 'next/image';
import classNames from 'classnames';
import Link from '@/components/common/link/link';
import { twMerge } from 'tailwind-merge';
import discountPlaceholer from '@/assets/images/discount-placeholder.png';
import { Button } from 'antd/lib';

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
            <FlexItem className="w-[7rem] h-[7rem] relative rounded-[1rem] overflow-hidden shrink-0 border">
              <Image
                fill
                alt={discount.title}
                src={discount.business?.logo_url! || discountPlaceholer.src}
                className="object-cover bg-gray-100"
              />
            </FlexItem>
            <FlexItem>
              <FlexBox
                direction="column"
                className="gap-[.3rem]"
                alignItems="start"
              >
                <FlexItem className="text-[1rem] text-typography font-semibold">
                  {discount.title}
                </FlexItem>
                {!discount.in_scope && (
                  <FlexItem className="bg-typography/[.9] text-white text-[.689rem] px-[.5rem] py-[.2rem] rounded-[.3125rem] w-fit">
                    {discount.business_title}
                  </FlexItem>
                )}
                <FlexItem className="text-typography text-[.862rem] line-clamp-[2]">
                  {discount.description}
                </FlexItem>
              </FlexBox>
            </FlexItem>
          </FlexBox>
        </FlexItem>
        {!discount.in_scope && (
          <FlexItem className="mt-[.5rem]">
            <Button block size="large" type="primary">
              <Link href={`/${discount.business_slug}`} className="block">
                مشاهده کافه
              </Link>
            </Button>
          </FlexItem>
        )}
      </FlexBox>
    </>
  );
};

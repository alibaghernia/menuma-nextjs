import { FC, HTMLAttributes, PropsWithChildren } from 'react';

declare interface ISpecialDiscountProps extends ConditionalDiscount {
  business_title?: string;
  business_slug?: string;
  business_logo?: string;
  in_scope?: boolean;
}

declare type ISpecialDiscount = FC<
  ISpecialDiscountProps & { className?: string }
>;

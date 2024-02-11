import { ProductEntity } from '@/services/business/business';
import { classNames } from 'classnames';
import { FC } from 'react';

declare interface IDailyOffersProps {
  title: string;
  scrolled?: boolean;
  productArray: ProductEntity[];
  classNameSection?: string;
  contentClassNamesSection?: string;
  classNameScroll?: string;
}
declare type IDailyOffers = FC<IDailyOffersProps>;

import { classNames } from 'classnames';
import { FC } from 'react';

declare interface IDailyOffersProps {
  title: string;
  scrolled?: boolean;
  productArray: any;
  classNameSection?: string;
  contentClassNamesSection?: string;
  classNameScroll?: string;
}
declare type IDailyOffers = FC<IDailyOffersProps>;

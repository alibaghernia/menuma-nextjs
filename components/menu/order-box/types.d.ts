import { classNames } from 'classnames';
import { FC } from 'react';

declare interface IOrderBoxProps {
  title: string;
  scrolled?: boolean;
  productArray: any;
  classNameSection?: string;
  contentClassNamesSection?: string;
  classNameScroll?: string
}
declare type IOrderBox = FC<IOrderBoxProps>;

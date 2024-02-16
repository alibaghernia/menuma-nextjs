import { IProductProps } from '@/components/common/product/types';
import { FC, PropsWithChildren } from 'react';

declare type ICartItem = {
  id: string;
  uuid: string; //product uuid
  image: string;
  title: string;
  type: string;
  count: number;
  price: number;
};

declare type IProviderState = {
  isNotMenuma: boolean;
  restored: boolean;
  cart: ICartItem[];
  profile: any;
};

declare type IProvider = FC<PropsWithChildren<{ isNotMenuma: boolean }>>;

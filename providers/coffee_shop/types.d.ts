import { Business } from '@/services/business/business';
import { BusinessType } from '@/services/main/main';
import { FC, PropsWithChildren } from 'react';

declare type ICartItem = {
  id: string;
  title: string;
  type: string;
  count: number;
  price: number;
};

declare type IProviderState = {
  profile: Business;
};

declare type IProvider = FC<
  PropsWithChildren<{
    profile?: any;
  }>
>;

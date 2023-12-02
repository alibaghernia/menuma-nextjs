import { FC, PropsWithChildren } from "react";

declare type ICartItem = {
  id: string;
  title: string;
  type: string;
  count: number;
  price: number;
};

declare type IProviderState = {
  profile: any;
};

declare type IProvider = FC<
  PropsWithChildren<{
    profile?: any;
  }>
>;

import { FC } from "react";

declare interface IProductProps {
  title: string;
  image?: string;
  descriptions: string;
  single_mode?: boolean;
  prices: {
    id: string;
    title: stirng;
    amount: number;
  }[];
}

declare type IProduct = FC<IProductProps>;

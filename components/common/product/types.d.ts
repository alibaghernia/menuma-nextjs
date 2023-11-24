import { FC } from "react";

declare interface IProductProps {
  id: string;
  title: string;
  image?: string;
  descriptions: string;
  single_mode?: boolean;
  fullWidth?: boolean;
  special?: boolean;
  className?: string
  categoryId?: string
  prices: {
    id: string;
    title: stirng;
    amount: number;
  }[];
}

declare type IProduct = FC<IProductProps>;

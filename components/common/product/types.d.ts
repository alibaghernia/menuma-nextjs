import { FC } from "react";

declare interface IProductProps {
  id: string | number;
  title: string;
  image?: string;
  descriptions: string;
  single_mode?: boolean;
  fullWidth?: boolean;
  special?: boolean;
  className?: string
  categoryId?: string | number
  prices: {
    id: string;
    title: stirng;
    price: string;
  }[];
}

declare type IProduct = FC<IProductProps>;

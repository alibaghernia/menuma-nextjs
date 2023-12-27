import { FC } from "react";

declare interface IProductP {
  id: string | number;
  title: string;
  image?: string;
  descriptions: string;
  single_mode?: boolean;
  fullWidth?: boolean;
  special?: boolean;
  className?: string;
  categoryId?: string | number;
  prices: {
    id: string;
    title: stirng;
    price: string;
  }[];
  tags?: {
    type: "new" | "hot" | "soldout";
  }[];
}

declare interface IProductProps extends ProductType {
  fullWidth?: boolean;
  single_mode?: boolean;
  className?: string;
}

declare type IProduct = FC<IProductProps>;

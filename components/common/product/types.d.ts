import { FC } from "react";
import { TagType } from '@/components/common/badge/types'


declare interface IProductProps {
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
  tags?: TagType[];
  // tags?: "new" | "hot" | "sold_out" | undefined[];
  // tags?: any;
}

declare type IProduct = FC<IProductProps>;

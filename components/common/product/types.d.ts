import { FC, HTMLAttributes } from 'react';
import { TagType } from '@/components/common/badge/types';
import { ProductEntity } from '@/services/business/business';

declare interface IProductProps
  extends Omit<ProductEntity, 'business_uuid' | 'createdAt' | 'updatedAt'>,
    HTMLAttributes<HTMLDivElement> {
  fullWidth?: boolean;
  category_uuid?: string;
  slug: string;
  single_mode?: boolean;
  link: string;
  orderable: boolean;
}

declare type IProduct = FC<IProductProps>;

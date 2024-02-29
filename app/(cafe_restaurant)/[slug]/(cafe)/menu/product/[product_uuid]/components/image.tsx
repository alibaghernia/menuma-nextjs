'use client';
import { IProductProps } from '@/components/common/product/types';
import Image from 'next/image';
import noImage from '@/assets/images/coffe-pattern.jpg';
import React, { FC } from 'react';
import { useCurrentBreakpoints } from '@/utils/hooks';
import { ProductEntity } from '@/services/business/business';
import classNames from 'classnames';
import { twMerge } from 'tailwind-merge';

const ProductImage: FC<ProductEntity> = (product) => {
  const breakpoints = useCurrentBreakpoints();
  const foundTagSoldOut = !!product?.metadata?.find(
    (tag: any) => tag === 'sold_out',
  );
  return (
    <Image
      src={product?.image ? product?.image_url! : noImage.src}
      alt={product?.title! || 'pic'}
      className={twMerge(
        classNames(`inset-0 block object-cover w-full h-full`, {
          grayscale: foundTagSoldOut,
        }),
      )}
      width={breakpoints.isXs ? 359 : 323}
      height={breakpoints.isXs ? 359 : 323}
      quality={product?.image ? 100 : 60}
    />
  );
};

export default ProductImage;

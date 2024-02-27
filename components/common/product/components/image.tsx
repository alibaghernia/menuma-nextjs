'use client';
import { useCurrentBreakpoints } from '@/utils/hooks';
import Image from 'next/image';
import React, { FC, useMemo } from 'react';
import noImage from '@/assets/images/coffe-pattern.jpg';
import { IProduct, IProductProps } from '../types';

const ProductImage: FC<IProductProps> = (props) => {
  const breakpoints = useCurrentBreakpoints();
  return (
    <div className={props.className}>
      <Image
        width={breakpoints.isXs ? 142 : 158}
        height={breakpoints.isXs ? 142 : 158}
        src={props.image ? props.image_url! : noImage.src}
        alt={props.title}
        quality={props.image ? 60 : 30}
      />
      {props.single_mode && (
        <>
          <span
            className="z-10 absolute inset-0"
            style={{
              background:
                'linear-gradient(180deg, rgba(255, 255, 255, 0.00) 40%, rgba(224, 224, 224, 1) 100%)',
            }}
          ></span>
          <div className="text-[1.2rem] text-typography absolute bottom-[.3rem] left-[50%] translate-x-[-50%] font-bold z-20">
            {`${props.prices[0].value.toLocaleString('IR-fa')} ت`}
          </div>
        </>
      )}
    </div>
  );
};

export default ProductImage;

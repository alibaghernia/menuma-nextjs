'use server';
import React, { cache } from 'react';
import Image from 'next/image';
import noImage from '@/assets/images/coffe-pattern.jpg';
import { FlexBox } from '@/components/common/flex_box/flex_box';
import { FlexItem } from '@/components/common/flex_item/flex_item';
import { ProductService } from '@/services/product/product.service';

import classNames from 'classnames';
import dynamic from 'next/dynamic';
import { getBusiness } from '@/actions/business';
import Price from './components/price';
import { Metadata } from 'next';
import { Flex } from 'antd/lib';
import ProductImage from './components/image';
const Navbar = dynamic(() => import('@/components/core/navbar/navbar'), {
  ssr: false,
});

const fetchProduct = cache((params: any) => {
  const productService = ProductService.init(params.slug as string);
  return productService
    .getOne(params?.product_uuid as string)
    .then((data) => data.data);
});
export const generateMetadata = async (
  { params }: any,
  parent: any,
): Promise<Metadata> => {
  const product = await fetchProduct(params);
  const parentLayout: any = await parent;
  return {
    title: [parentLayout.title?.absolute, product.title].reverse().join(' - '),
    description: product.description,
    openGraph: {
      images: product.image_url,
    },
  };
};
async function ProductPage({ params }: any) {
  const business = await getBusiness(params.slug);
  const product = await fetchProduct(params);

  const foundTagSoldOut = !!product?.metadata?.find(
    (tag: any) => tag === 'sold_out',
  );
  const prices = product?.prices?.map((price, key: number) => {
    return (
      <FlexItem key={key}>
        <Flex
          justify={business.pager ? 'space-between' : 'center'}
          align="center"
          className={classNames(
            'p-[.5rem] px-[1.5rem] pl-[.875rem] rounded-[2rem] bg-more/[.1] md:max-w-md md:w-full md:mx-auto',
            { grayscale: foundTagSoldOut },
          )}
        >
          <FlexItem className="text-[1.3rem] text-typography">
            <FlexBox gap={2} alignItems="center">
              {price.title && (
                <FlexItem className="text-[1rem]">{price.title}:</FlexItem>
              )}
              <FlexItem>{price.value.toLocaleString('IR-fa')}</FlexItem>
            </FlexBox>
          </FlexItem>
          {business.pager && <Price price={price} product={product} />}
        </Flex>
      </FlexItem>
    );
  });

  return (
    <>
      <Navbar title={business?.name} note back />
      <div className="pt-[4.5rem] pb-[2.5rem] z-10 px-4 min-h-screen">
        <FlexBox direction="column">
          <FlexItem className="rounded-[2.4rem] overflow-hidden relative max-w-[22.4rem] w-full h-[22.4rem] mx-auto bg-white shadow">
            <ProductImage {...product} />
          </FlexItem>
          <FlexItem
            className="mt-[1.1rem] max-w-[22.4rem] w-full mx-auto bg-white/[.5] p-4 pb-10 rounded-[1.5rem] border"
            grow
          >
            <FlexBox direction="column">
              <FlexItem>
                <FlexBox alignItems="center" gap={2}>
                  <hr className="border-black/10 w-full" />
                  <div className="w-fit text-[1.8rem] font-[500] whitespace-nowrap text-typography">
                    {product?.title}
                  </div>
                  <hr className="border-black/10 w-full" />
                </FlexBox>
              </FlexItem>
              <FlexItem className="text-[1rem] font-[400] mt-[1.5rem] text-typography md:text-center text-justify">
                {product?.description}
              </FlexItem>
              <FlexItem className="mt-[3rem]">
                <FlexBox direction="column" gap={2}>
                  {prices}
                </FlexBox>
              </FlexItem>
            </FlexBox>
          </FlexItem>
        </FlexBox>
      </div>
    </>
  );
}

export default ProductPage;

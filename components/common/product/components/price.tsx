'use client';
import { LinedAddIcon } from '@/icons/lined_add';
import { ProviderContext } from '@/providers/main/provider';
import { ProductEntity } from '@/services/business/business';
import _ from 'lodash';
import React, { useCallback, useContext } from 'react';
import { Container } from '../../container/container';
import { FlexBox } from '../../flex_box/flex_box';
import { FlexItem } from '../../flex_item/flex_item';
import noImage from '@/assets/images/no-image.jpg';
import { IProductProps } from '../types';

const Price = ({
  sold_out,
  product,
  price,
}: {
  sold_out: boolean;
  product: IProductProps;
  price: ProductEntity['prices'][number];
}) => {
  const { functions } = useContext(ProviderContext);
  const itemId = `${product.uuid}-${price.value}`;
  const order = functions.cart.getItem(itemId);

  const orderItem = useCallback(
    (price: ProductEntity['prices'][number]) => {
      const key = `${product.uuid}-${price.value}`;
      functions.cart.addItem({
        id: key,
        uuid: product.uuid,
        image: product.image_url || noImage.src,
        title: product.title,
        count: 1,
        price: price.value,
        type: price.title,
      });
    },
    [functions],
  );

  const increaseOrderItemCount = useCallback(
    (price: any) => {
      const key = `${product.uuid}-${price.value}`;
      functions.cart.increaseCount(key);
    },
    [functions],
  );

  const decreasOrderItemCount = useCallback(
    (price: any) => {
      const key = `${product.uuid}-${price.value}`;
      const item = functions.cart.getItem(key);
      if (item!.count == 1) {
        functions.cart.removeItem(key);
      } else functions.cart.decreaseCount(key);
    },
    [functions],
  );
  if (!product.single_mode) {
    return (
      <FlexItem onClick={() => !sold_out && orderItem(price)}>
        {order ? (
          <FlexBox alignItems="center" gap={2}>
            <FlexItem
              className="relative w-6 h-6 bg-white/[.4] rounded-lg cursor-pointer active:scale-[.8] transition duration-[.2s] select-none"
              onClick={(e) => {
                e.stopPropagation();
                !sold_out && decreasOrderItemCount(price);
              }}
            >
              <Container center>-</Container>
            </FlexItem>
            {order.count}
            <FlexItem
              className="relative w-6 h-6 bg-white/[.4] rounded-lg cursor-pointer active:scale-[.8] transition duration-[.2s] select-none"
              onClick={_.throttle((e) => {
                e.stopPropagation();
                increaseOrderItemCount(price);
              }, 500)}
            >
              <Container center>+</Container>
            </FlexItem>
          </FlexBox>
        ) : (
          <LinedAddIcon color="#434343" />
        )}
      </FlexItem>
    );
  }
  return <></>;
};

export default Price;

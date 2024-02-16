'use client';
import { ProviderContext } from '@/providers/main/provider';
import { ProductEntity } from '@/services/business/business';
import React, { useCallback, useContext } from 'react';
import noImage from '@/assets/images/coffe-pattern.jpg';
import { Container } from '@/components/common/container/container';
import { FlexBox } from '@/components/common/flex_box/flex_box';
import { FlexItem } from '@/components/common/flex_item/flex_item';
import classNames from 'classnames';
import { throttle } from 'lodash';
const Price = ({
  price,
  product,
}: {
  price: ProductEntity['prices'][number];
  product: ProductEntity;
}) => {
  const { functions } = useContext(ProviderContext);
  const foundTagSoldOut = !!product.metadata?.find(
    (tag: any) => tag === 'sold_out',
  );
  const order = functions.cart.getItem(`${product.uuid}-${price.value}`);
  const orderItem = useCallback(
    (price: ProductEntity['prices'][number]) => {
      const key = `${product?.uuid}-${price.value}`;
      functions.cart.addItem({
        id: key,
        uuid: product?.uuid!,
        image: product?.image_url ? product?.image_url : noImage.src,
        title: product?.title!,
        count: 1,
        price: price.value,
        type: price.title,
      });
    },
    [functions, product],
  );

  const increaseOrderItemCount = useCallback(
    (price: number) => {
      const key = `${product?.uuid}-${price}`;
      functions.cart.increaseCount(key);
    },
    [functions, product?.uuid],
  );

  const decreasOrderItemCount = useCallback(
    (price: number) => {
      const key = `${product?.uuid}-${price}`;
      const item = functions.cart.getItem(key);
      if (item!.count == 1) {
        console.log('delete');
        functions.cart.removeItem(key);
      } else functions.cart.decreaseCount(key);
    },
    [functions, product?.uuid],
  );
  return !order ? (
    <FlexItem
      className={classNames(
        'rounded-[1rem] py-[.2rem] px-[1.5rem] bg-more text-typography cursor-pointer active:scale-[.8] transition duration-[.2s]',
        { 'grayscale pointer-events-none': foundTagSoldOut },
      )}
      onClick={() => orderItem(price)}
    >
      {foundTagSoldOut ? 'اتمام موجودی' : 'سفارش'}
    </FlexItem>
  ) : (
    <FlexItem>
      <FlexBox gap={2} alignItems="center">
        <FlexItem
          className="relative w-7 h-7 bg-more rounded-lg cursor-pointer active:scale-[.8] transition duration-[.2s] select-none"
          onClick={throttle(() => increaseOrderItemCount(price.value), 500)}
        >
          <Container center>+</Container>
        </FlexItem>
        {order.count}
        <FlexItem
          className="relative w-7 h-7 flex items-center justify-center bg-more rounded-lg cursor-pointer active:scale-[.8] transition duration-[.2s] select-none"
          onClick={() => decreasOrderItemCount(price.value)}
        >
          <Container center>-</Container>
        </FlexItem>
      </FlexBox>
    </FlexItem>
  );
};

export default Price;

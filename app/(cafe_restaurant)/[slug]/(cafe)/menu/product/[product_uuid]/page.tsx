'use client';
import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import Image from 'next/image';
import { ProviderContext } from '@/providers/main/provider';
import { CoffeeShopProviderContext } from '@/providers/coffee_shop/provider';
import { throttle } from 'lodash';
import { Navbar } from '@/components/core/navbar/navbar';
import noImage from '@/assets/images/no-image.jpg';
import { useSlug } from '@/providers/main/hooks';
import { FlexBox } from '@/components/common/flex_box/flex_box';
import { FlexItem } from '@/components/common/flex_item/flex_item';
import { Container } from '@/components/common/container/container';
import { useLoadings, useMessage } from '@/utils/hooks';
import { ProductService } from '@/services/product/product.service';

import classNames from 'classnames';
import { ProductEntity } from '@/services/business/business';
import { useParams } from 'next/navigation';

function ProductPage() {
  const [addL, removeL] = useLoadings();
  const message = useMessage();
  const {
    functions,
    state: mainProviderState,
    checkCartItemsExist,
  } = useContext(ProviderContext);
  const { state } = useContext(CoffeeShopProviderContext);
  const params = useParams();

  const productService = ProductService.init(params?.slug as string);

  const [product, setProduct] = useState<ProductEntity>();
  function fetchProduct() {
    addL('fetch-product');
    productService
      .getOne(params?.product_uuid as string)
      .then((data) => {
        setProduct(data.data);
      })
      .catch(() => {
        message.error('مشکلی در دریافت اطلاعات آیتم وجود دارد.');
      })
      .finally(() => {
        removeL('fetch-product');
      });
  }

  useEffect(() => {
    fetchProduct();
  }, [params?.product_slug]);

  useEffect(() => {
    if (
      mainProviderState.restored &&
      product &&
      product.metadata?.some((tag: string) => tag == 'sold_out')
    ) {
      checkCartItemsExist([product]);
    }
  }, [mainProviderState.restored, product]);
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

  const prices = useMemo(
    () =>
      product?.prices?.map((price, key: number) => {
        const foundTagSoldOut = !!product.metadata?.find(
          (tag: any) => tag === 'sold_out',
        );
        const order = functions.cart.getItem(`${product.uuid}-${price.value}`);
        return (
          <FlexItem key={key}>
            <FlexBox
              justify="between"
              alignItems="center"
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
              {!order ? (
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
                      onClick={throttle(
                        () => increaseOrderItemCount(price.value),
                        500,
                      )}
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
              )}
            </FlexBox>
          </FlexItem>
        );
      }),
    [
      product,
      functions,
      increaseOrderItemCount,
      decreasOrderItemCount,
      orderItem,
    ],
  );

  const foundTagSoldOut = !!product?.metadata?.find(
    (tag: any) => tag === 'sold_out',
  );
  return (
    <>
      <Navbar title={state.profile?.name} note back />
      <div className="pt-[4.5rem] pb-[2.5rem] z-10 px-4">
        <FlexBox direction="column">
          <FlexItem className="rounded-[2.4rem] overflow-hidden relative max-w-[22.4rem] w-full h-[22.4rem] mx-auto bg-white shadow">
            <Image
              src={product?.image_url ? product?.image_url : noImage.src}
              alt={product?.title! || 'pic'}
              className={`inset-0 block object-cover ${
                foundTagSoldOut && 'grayscale'
              }`}
              fill
            />
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

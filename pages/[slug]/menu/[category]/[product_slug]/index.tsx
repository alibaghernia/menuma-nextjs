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
import { serverBaseUrl } from '@/utils/axios';
import Head from 'next/head';
import _ from 'lodash';
import { Navbar } from '@/components/core/navbar/noSSR';
import noImage from '@/assets/images/no-image.jpg';
import { useSlug } from '@/providers/main/hooks';
import { FlexBox } from '@/components/common/flex_box/flex_box';
import { FlexItem } from '@/components/common/flex_item/flex_item';
import { Container } from '@/components/common/container/container';
import { withCafeeShopProfile } from '@/utils/serverSideUtils';
import { CoffeeShopPageProvider } from '@/providers/coffee_shop/page_provider';
import {
  useCustomRouter,
  useLoadings,
  useMessage,
  usePageLoading,
} from '@/utils/hooks';
import { ProductService } from '@/services/product/product.service';

import { BusinessService } from '@/services/business/business.service';

function ProductPage() {
  usePageLoading();
  const [addL, removeL] = useLoadings();
  const message = useMessage();
  const {
    functions,
    state: mainProviderState,
    checkCartItemsExist,
  } = useContext(ProviderContext);
  const [scrolled, setScrolled] = useState(false);
  const { state } = useContext(CoffeeShopProviderContext);
  const { query: params } = useCustomRouter();
  const slug = useSlug(false);

  const productService = ProductService.init(params.slug as string);
  const businessService = BusinessService.init();
  const businessApisBySlug = businessService.getApisBySlug(
    params.slug as string,
  );
  const [product, setProduct] = useState<APIProduct>();
  function fetchProduct() {
    addL('fetch-product');
    productService
      .getOne(params.product_slug as string)
      .then((data) => {
        setProduct(data);
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
  }, [params.product_slug]);

  useEffect(() => {
    if (
      mainProviderState.restored &&
      product &&
      product.tags?.some((tag: string) => tag == 'sold_out')
    ) {
      checkCartItemsExist([product]);
    }
  }, [mainProviderState.restored, product]);
  const orderItem = useCallback(
    (price: any) => {
      const key = `${product?.id}-${price.id}`;
      functions.cart.addItem({
        id: key,
        image: product?.image_path
          ? `${serverBaseUrl}/storage/${product?.image_path}`
          : noImage.src,
        title: product?.name!,
        count: 1,
        price: price.price,
        type: price.title,
        product: {
          id: product?.id!,
          title: product?.name!,
          descriptions: product?.description!,
          //@ts-ignore
          prices: product?.prices,
          categoryId: product?.category_id,
          image: product?.image_path
            ? `${serverBaseUrl}/storage/${product.image_path}`
            : noImage.src,
        },
      });
    },
    [functions, product],
  );

  const increaseOrderItemCount = useCallback(
    (price: any) => {
      const key = `${product?.id}-${price.id}`;
      functions.cart.increaseCount(key);
    },
    [functions, product?.id],
  );

  const decreasOrderItemCount = useCallback(
    (price: any) => {
      const key = `${product?.id}-${price.id}`;
      const item = functions.cart.getItem(key);
      if (item!.count == 1) {
        console.log('delete');
        functions.cart.removeItem(key);
      } else functions.cart.decreaseCount(key);
    },
    [functions, product?.id],
  );

  const prices = useMemo(
    () =>
      product?.prices?.map((price: any, key: number) => {
        const foundTagSoldOut = !!product.tags?.find(
          (tag: any) => tag === 'sold_out',
        );
        const order = functions.cart.getItem(`${product.id}-${price.id}`);
        return (
          <FlexItem key={key}>
            <FlexBox
              justify="between"
              alignItems="center"
              className="p-[.5rem] px-[1.5rem] pl-[.875rem] rounded-[2rem] bg-more/[.1] md:max-w-md md:w-full md:mx-auto"
            >
              <FlexItem className="text-[1.3rem] text-typography">
                <FlexBox gap={2} alignItems="center">
                  {price.title && (
                    <FlexItem className="text-[1rem]">{price.title}:</FlexItem>
                  )}
                  <FlexItem>
                    {parseInt(price.price).toLocaleString('IR-fa')}
                  </FlexItem>
                </FlexBox>
              </FlexItem>
              {!order ? (
                !foundTagSoldOut && (
                  <FlexItem
                    className="rounded-[1rem] py-[.2rem] px-[1.5rem] bg-more text-typography cursor-pointer active:scale-[.8] transition duration-[.2s]"
                    onClick={() => orderItem(price)}
                  >
                    سفارش
                  </FlexItem>
                )
              ) : (
                <FlexItem>
                  <FlexBox gap={2} alignItems="center">
                    <FlexItem
                      className="relative w-7 h-7 bg-more rounded-lg cursor-pointer active:scale-[.8] transition duration-[.2s] select-none"
                      onClick={_.throttle(
                        () => increaseOrderItemCount(price),
                        500,
                      )}
                    >
                      <Container center>+</Container>
                    </FlexItem>
                    {order.count}
                    <FlexItem
                      className="relative w-7 h-7 flex items-center justify-center bg-more rounded-lg cursor-pointer active:scale-[.8] transition duration-[.2s] select-none"
                      onClick={() => decreasOrderItemCount(price)}
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

  const navbar = useMemo(
    () => <Navbar title={state.profile?.name} note back />,
    [state.profile],
  );

  const foundTagSoldOut = !!product?.tags?.find(
    (tag: any) => tag === 'sold_out',
  );
  return (
    <>
      <Head>
        <title>
          {`${
            state.profile.name +
            ` - ${product?.name || ''}` +
            (slug ? ' - منوما' : '')
          }`}
        </title>
      </Head>
      {navbar}
      <div className="pt-[4.5rem] pb-[2.5rem] z-10 px-4">
        <FlexBox direction="column">
          <FlexItem className="rounded-[2.4rem] overflow-hidden relative max-w-[22.4rem] w-full h-[22.4rem] mx-auto bg-white shadow">
            <Image
              src={
                product?.image_path
                  ? `${serverBaseUrl}/storage/${product?.image_path}`
                  : noImage.src
              }
              alt={product?.name! || 'pic'}
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
                    {product?.name}
                  </div>
                  <hr className="border-black/10 w-full" />
                </FlexBox>
              </FlexItem>
              <FlexItem className="text-[1rem] font-[400] mt-[1.5rem] text-typography md:text-center text-justify">
                {product?.description}
              </FlexItem>
              {!foundTagSoldOut && (
                <FlexItem className="mt-[3rem]">
                  <FlexBox direction="column" gap={2}>
                    {prices}
                  </FlexBox>
                </FlexItem>
              )}
            </FlexBox>
          </FlexItem>
        </FlexBox>
      </div>
    </>
  );
}

export const getServerSideProps = withCafeeShopProfile();

export default CoffeeShopPageProvider(ProductPage);

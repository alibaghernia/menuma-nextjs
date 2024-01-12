import React, { useCallback, useContext, useMemo } from 'react';
import { IProduct } from './types';
import { TagType } from '@/components/common/badge/types';
import Image from 'next/image';
import classNames from 'classnames';
import { LinedAddIcon } from '@/icons/lined_add';
import noImage from '@/assets/images/no-image.jpg';
import { ProviderContext } from '@/providers/main/provider';
import _ from 'lodash';
import { useSlug } from '@/providers/main/hooks';
import { Container } from '../container/container';
import { FlexBox } from '@/components/common/flex_box/flex_box';
import { FlexItem } from '@/components/common/flex_item/flex_item';
import { Badge } from '@/components/common/badge/badge';
import { useCustomRouter } from '@/utils/hooks';
import Link from 'next/link';

export const Product: IProduct = (props) => {
  const foundTagSoldOut = !!props.tags?.find(
    (tag: string) => tag === 'sold_out',
  );
  const { query: params } = useCustomRouter();
  const slug = useSlug();
  const { functions } = useContext(ProviderContext);
  const productSlug = useMemo(
    () => (params ? `/${slug}menu/${props.categoryId}/${props.id}` : '#'),
    [params, props, slug],
  );
  const orderItem = useCallback(
    (price: any) => {
      const key = `${props.id}-${price.id}`;
      functions.cart.addItem({
        id: key,
        image: props.image || noImage.src,
        title: props.title,
        count: 1,
        price: price.price,
        type: price.title,
        product: props,
      });
    },
    [functions, props],
  );

  const increaseOrderItemCount = useCallback(
    (price: any) => {
      const key = `${props.id}-${price.id}`;
      functions.cart.increaseCount(key);
    },
    [functions, props.id],
  );

  const decreasOrderItemCount = useCallback(
    (price: any) => {
      const key = `${props.id}-${price.id}`;
      const item = functions.cart.getItem(key);
      if (item!.count == 1) {
        functions.cart.removeItem(key);
      } else functions.cart.decreaseCount(key);
    },
    [functions, props.id],
  );
  const renderPrices = useCallback(
    () =>
      props.prices.map((price, key) => {
        const itemId = `${props.id}-${price.id}`;
        const order = functions.cart.getItem(itemId);
        return (
          <div
            className={classNames(
              'w-full relative bg-white h-[5rem] mt-[-2rem] rounded-bl-[2rem] rounded-br-[2rem] overflow-hidden border border-white',
            )}
            style={{
              zIndex: ~key,
            }}
            key={price.id}
          >
            <span className="absolute inset-0 bg-typography/[.20] z-0 pointer-events-none"></span>
            <Container className="bottom-0 left-0 right-0 py-[.5rem] px-[1.7rem] z-10">
              <FlexBox alignItems="center" justify="between">
                <FlexItem>
                  <FlexBox alignItems="center" gap={2} className="px-[0.9rem]">
                    {props.prices.length > 1 && (
                      <FlexItem>
                        <div className="text-typography text-[1rem] font-bold">
                          {key + 1}-
                        </div>
                      </FlexItem>
                    )}
                    <FlexItem>
                      <div className="text-typography text-[1rem] font-bold">
                        {price.title}
                      </div>
                    </FlexItem>
                  </FlexBox>
                </FlexItem>
                <FlexItem>
                  <FlexBox
                    alignItems="center"
                    gap={2}
                    className={classNames(
                      `px-[.8rem] py-[.2rem] bg-white/[.3] rounded-[1rem] ${
                        !foundTagSoldOut && 'cursor-pointer'
                      }  transition-all duration-[.3s]`,
                      {
                        'active:scale-[.8]': !order,
                      },
                    )}
                    onClick={() => !foundTagSoldOut && orderItem(price)}
                  >
                    <FlexItem>
                      <div className="text-[1rem] font-[500] text-typography">
                        {`${parseInt(price.price).toLocaleString('IR-fa')} ت`}
                      </div>
                    </FlexItem>
                    <FlexItem>
                      {order ? (
                        <FlexBox alignItems="center" gap={2}>
                          <FlexItem
                            className="relative w-6 h-6 bg-white/[.4] rounded-lg cursor-pointer active:scale-[.8] transition duration-[.2s] select-none"
                            onClick={(e) => {
                              e.stopPropagation();
                              !foundTagSoldOut && decreasOrderItemCount(price);
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
                        !foundTagSoldOut && <LinedAddIcon color="#434343" />
                      )}
                    </FlexItem>
                  </FlexBox>
                </FlexItem>
              </FlexBox>
            </Container>
          </div>
        );
      }),
    [
      orderItem,
      increaseOrderItemCount,
      decreasOrderItemCount,
      functions,
      props,
      foundTagSoldOut,
    ],
  );

  const renderImage = useCallback(
    (mono: boolean) => {
      return (
        <Link
          href={productSlug}
          className={classNames(
            'flex-shrink-0 bg-white !w-[10rem] overflow-hidden rounded-[2.4rem] block border border-black/[.05]',
            {
              'absolute !h-[12rem] right-[0]': !mono,
              'relative h-full': mono,
            },
          )}
        >
          <Image
            fill
            src={props.image!}
            alt={props.title}
            className={`z-0 object-cover relative ${
              foundTagSoldOut && 'grayscale'
            }`}
          />

          {props.single_mode && (
            <>
              <span
                className="z-10 absolute inset-0"
                style={{
                  background:
                    'linear-gradient(180deg, rgba(255, 255, 255, 0.00) 40%, rgba(224, 224, 224, 0.75) 100%)',
                }}
              ></span>
              <div className="text-[1.2rem] text-typography absolute bottom-[.3rem] left-[50%] translate-x-[-50%] font-bold z-20">
                {`${parseInt(props.prices[0].price).toLocaleString('IR-fa')} ت`}
              </div>
            </>
          )}
        </Link>
      );
    },
    [props, productSlug, foundTagSoldOut],
  );
  const renderSingleModePrice = () => {
    return (
      <Link
        href={productSlug}
        className="text-[.8rem] px-[.8rem] py-[.3rem] text-typography bg-typography/[.1] text-center rounded-[1rem] font-[600] cursor-pointer active:scale-[.8] transition-transform duration-[.3s] block w-full"
      >
        {foundTagSoldOut ? 'مشاهده' : 'سفارش'}
      </Link>
    );
  };

  const renderTags = useCallback(() => {
    return props.tags?.map((tag: TagType, idx: number) => (
      <Badge type={tag} key={idx} />
    ));
  }, [props.tags]);
  return (
    <div
      className={classNames(
        'relative',
        { 'w-full': props.fullWidth },
        props.className,
      )}
    >
      <FlexBox
        className={classNames('relative', 'z-0', {
          'w-full': props.fullWidth,
          'pr-[7.25rem]': !props.fullWidth,
          'flex-col ': !props.single_mode,
        })}
      >
        {!props.fullWidth && renderImage(false)}
        <FlexItem
          className={classNames('w-full', { 'z-20': !props.single_mode })}
        >
          <FlexBox
            alignItems="stretch"
            className={classNames(
              'bg-white h-[12.9rem] rounded-[2rem] border border-black/[.05] overflow-hidden',
              {
                'w-[16.3rem] pr-[5.6rem] flex-col  py-[1.1rem] pl-[1.4rem]  items-center  justify-between':
                  !props.fullWidth,
                'w-full p-[1rem] gap-[1.4rem] z-10': props.fullWidth,
              },
            )}
          >
            {props.fullWidth && <FlexItem>{renderImage(true)}</FlexItem>}
            <FlexItem grow>
              <FlexBox direction="column" gap={2} className="h-full">
                <FlexItem>
                  <Link
                    href={productSlug}
                    className="text-[1.2rem] font-[500] text-typography w-full"
                  >
                    {props.title}
                  </Link>
                </FlexItem>
                {Boolean(props.tags?.length) && (
                  <FlexItem>
                    <FlexBox gap={2}>{renderTags()}</FlexBox>
                  </FlexItem>
                )}
                <FlexItem grow>
                  <div
                    className={classNames(
                      'text-[0.8rem] font-[300] text-typography w-full line-clamp-[4]',
                    )}
                  >
                    {props.descriptions}
                  </div>
                </FlexItem>

                <FlexItem>
                  {props.single_mode && renderSingleModePrice()}
                </FlexItem>
              </FlexBox>
            </FlexItem>
          </FlexBox>
        </FlexItem>
        {!props.single_mode && (
          <FlexBox direction="column" className="shrink-0 w-full z-0">
            {renderPrices()}
          </FlexBox>
        )}
      </FlexBox>
    </div>
  );
};

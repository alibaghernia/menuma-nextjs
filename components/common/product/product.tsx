import React from 'react';
import { IProduct } from './types';
import classNames from 'classnames';
import _ from 'lodash';
import { Container } from '../container/container';
import { FlexBox } from '@/components/common/flex_box/flex_box';
import { FlexItem } from '@/components/common/flex_item/flex_item';
import { Badge } from '@/components/common/badge/badge';
import Link from '@/components/common/link/link';
import Price from './components/price';
import dynamic from 'next/dynamic';
const ProductImage = dynamic(() => import('./components/image'));

const Product: IProduct = async (props) => {
  const foundTagSoldOut = !!props.metadata?.find(
    (tag: string) => tag === 'sold_out',
  );
  const renderPrices = () =>
    props.prices.map((price, key) => {
      return (
        <div
          className={classNames(
            'w-full relative bg-white h-[5rem] mt-[-2rem] rounded-bl-[2rem] rounded-br-[2rem] overflow-hidden border border-white',
          )}
          style={{
            zIndex: ~key,
          }}
          key={price.value}
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
                      'active:scale-[.9]': !foundTagSoldOut && props.orderable,
                    },
                  )}
                >
                  <FlexItem>
                    <div className="text-[1rem] font-[500] text-typography">
                      {`${price.value.toLocaleString('IR-fa')} ت`}
                    </div>
                  </FlexItem>
                  {!foundTagSoldOut && props.orderable && (
                    <Price
                      price={price}
                      product={props}
                      sold_out={foundTagSoldOut}
                    />
                  )}
                </FlexBox>
              </FlexItem>
            </FlexBox>
          </Container>
        </div>
      );
    });

  const renderImage = (mono: boolean) => {
    return (
      <Link
        href={props.link}
        className={classNames(
          'flex-shrink-0 flex items-center overflow-hidden rounded-[2.4rem]',
          {
            'relative h-full': mono,
          },
        )}
      >
        <ProductImage
          {...props}
          className={classNames(
            `z-0 object-cover relative bg-white overflow-hidden rounded-[2.4rem] block border border-black/[.05]`,
            {
              grayscale: foundTagSoldOut,
            },
          )}
        />
      </Link>
    );
  };
  const renderSingleModePrice = () => {
    return (
      <Link
        href={props.link}
        className="text-[.8rem] px-[.8rem] py-[.3rem] text-typography bg-typography/[.1] text-center rounded-[1rem] font-[600] cursor-pointer active:scale-[.8] transition-transform duration-[.3s] block w-full"
      >
        {foundTagSoldOut ? 'مشاهده' : 'سفارش'}
      </Link>
    );
  };

  const renderTags = () =>
    props.metadata?.map((tag, idx: number) => <Badge type={tag} key={idx} />);
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
            {props.fullWidth && (
              <FlexItem className="shrink-0">{renderImage(true)}</FlexItem>
            )}
            <FlexItem grow>
              <FlexBox direction="column" gap={2} className="h-full">
                <FlexItem>
                  <Link
                    href={props.link}
                    className="text-[1.2rem] font-[500] text-typography w-full"
                  >
                    {props.title}
                  </Link>
                </FlexItem>
                {Boolean(props.metadata?.length) && (
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
                    {props.description}
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
export default Product;

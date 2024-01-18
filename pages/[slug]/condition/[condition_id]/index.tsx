import React, { useContext, useEffect, useMemo, useState } from 'react';
import { CoffeeShopPageProvider } from '@/providers/coffee_shop/page_provider';
import { useSlug } from '@/providers/main/hooks';
import { withCafeeShopProfile } from '@/utils/serverSideUtils';
import Head from 'next/head';
import { Navbar } from '@/components/core/navbar/navbar';
import { ProviderContext } from '@/providers/main/provider';
import { CoffeeShopProviderContext } from '@/providers/coffee_shop/provider';
import { FlexBox } from '@/components/common/flex_box/flex_box';
import { FlexItem } from '@/components/common/flex_item/flex_item';
import Image from 'next/image';
import noImage from '@/assets/images/no-image.jpg';
import { PlacePinIcon } from '@/icons/place_pin';
import tailwindConfig from '@/tailwind.config';
import resolveConfig from 'tailwindcss/resolveConfig';
import { CalendarIcon } from '@/icons/calendar';
import moment from 'jalali-moment';
import { ClockIcon } from '@/icons/clock';
import { PeopleIcon } from '@/icons/people';
import { Location } from '@/icons/location';
import { Button } from '@/components/common/button';
import { useCustomRouter, useLoadings, useMessage } from '@/utils/hooks';
import Link from 'next/link';
import { serverBaseUrl } from '@/utils/axios';

function ConditionPage() {
  const resolvedTailwindConfig = resolveConfig(tailwindConfig);
  const router = useCustomRouter();
  const [addL, removeL] = useLoadings();
  const message = useMessage();
  const { state, businessService } = useContext(CoffeeShopProviderContext);
  const slug = useSlug(false);
  const { query: params } = useCustomRouter();
  const [condition, setCondition] = useState<ConditionType>();

  function fetchCondition() {
    addL('fetch-condition');
    businessService.conditionsService
      .getCondition(params.condition_id as string)
      .finally(() => {
        removeL('fetch-condition');
      })
      .then((data) => {
        setCondition(data);
      })
      .catch((err) => {
        if (err == 404) {
          message.error('رویداد مورد نظر یافت نشد');
          setTimeout(() => {
            router.back();
          }, 1000);
        } else message.error('مشکلی در دریافت اطلاعات رویداد وجود دارد!');
      });
  }

  useEffect(() => {
    fetchCondition();
  }, []);
  return (
    <>
      <Head>
        <title>
          {`${state.profile.name + ' - رویداد' + (slug ? ' - منوما' : '')}`}
        </title>
      </Head>
      <div className="min-h-screen w-full">
        <Navbar
          fixed={false}
          callPager={false}
          back
          title={state.profile.name}
        />
        <FlexBox direction="column" className="px-[2.07rem] max-w-lg mx-auto">
          <FlexItem>
            <FlexBox alignItems="center" gap={2}>
              <hr className="border-black/10 w-full" />
              <div className="w-fit text-[1.2rem] font-[500] whitespace-nowrap text-typography">
                {condition?.name}
              </div>
              <hr className="border-black/10 w-full" />
            </FlexBox>
          </FlexItem>
          <FlexItem className="mt-[1.64rem]">
            <div className="relative w-[20rem] h-[20rem] rounded-[.862rem] overflow-hidden mx-auto">
              <Image
                fill
                alt={condition?.name || ''}
                src={
                  condition?.banner_path
                    ? `${serverBaseUrl}/storage/${condition.banner_path}`
                    : noImage.src
                }
                className="object-cover"
              />
            </div>
          </FlexItem>
          <FlexItem className="mt-[1.38rem]">
            <FlexBox alignItems="center" className="gap-[.43rem] w-fit mx-auto">
              <FlexItem>
                <PlacePinIcon
                  color={resolvedTailwindConfig.theme?.colors![
                    'typography'
                  ].toString()}
                  width={20}
                  height={20}
                />
              </FlexItem>
              <FlexItem className="text-[1rem] text-typography">
                {state.profile?.name}
              </FlexItem>
            </FlexBox>
          </FlexItem>
          <FlexItem className="mt-[1.38rem]">
            <FlexBox
              justify="center"
              alignItems="center"
              className="gap-[.75rem]"
            ></FlexBox>
          </FlexItem>
          <FlexItem className="mt-[1.21rem]">
            <FlexBox alignItems="center">
              <FlexItem>
                <FlexBox alignItems="center" className="gap-[.38rem]">
                  <FlexItem>
                    <Location
                      color={resolvedTailwindConfig.theme?.colors![
                        'typography'
                      ].toString()}
                      width={16}
                      height={16}
                    />
                  </FlexItem>
                  <FlexItem className="text-[.862rem] text-typography">
                    آدرس:
                  </FlexItem>
                </FlexBox>
              </FlexItem>
              <FlexItem className="text-[.862rem] text-typography">
                {state.profile?.address}
              </FlexItem>
            </FlexBox>
          </FlexItem>
          {condition?.long_description && (
            <FlexItem className="mt-[1.21rem]">
              <FlexBox direction="column" className="gap-[.34rem]">
                <FlexItem className="text-[.862rem] text-typography">
                  توضیحات:
                </FlexItem>
                <FlexItem className="text-[.862rem] text-typography">
                  {condition?.long_description}
                </FlexItem>
              </FlexBox>
            </FlexItem>
          )}
          <FlexItem className="mt-[3rem]">
            <Button className="w-full py-[.5rem] text-center">
              <Link href={`/${slug}`} className="block">
                مشاهده پروفایل کافه
              </Link>
            </Button>
          </FlexItem>
        </FlexBox>
      </div>
    </>
  );
}

export const getServerSideProps = withCafeeShopProfile();

export default CoffeeShopPageProvider(ConditionPage);

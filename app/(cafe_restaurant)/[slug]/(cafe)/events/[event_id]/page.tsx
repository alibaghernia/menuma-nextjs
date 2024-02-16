'use server';
import React, { cache } from 'react';
import { FlexBox } from '@/components/common/flex_box/flex_box';
import { FlexItem } from '@/components/common/flex_item/flex_item';
import Image from 'next/image';
import { PlacePinIcon } from '@/icons/place_pin';
import tailwindConfig from '@/tailwind.config';
import resolveConfig from 'tailwindcss/resolveConfig';
import { CalendarIcon } from '@/icons/calendar';
import moment from 'jalali-moment';
import { ClockIcon } from '@/icons/clock';
import { PeopleIcon } from '@/icons/people';
import { Location } from '@/icons/location';
import { Button } from '@/components/common/button';
import Link from '@/components/common/link/link';
import dynamic from 'next/dynamic';
import { BusinessService } from '@/services/business/business.service';
import { getBusiness } from '@/actions/business';
import { getSlug } from '@/utils/serverSideUtils';
import { Metadata } from 'next';
const Navbar = dynamic(() => import('@/components/core/navbar/navbar'), {
  ssr: false,
});
const fetchEvent = cache((params: any) => {
  const businessService = BusinessService.init(params.slug);
  return businessService.eventsService
    .get(params?.event_id as string)
    .then((data) => data.data);
});

export const generateMetadata = async (
  { params }: any,
  parent: any,
): Promise<Metadata> => {
  const event = await fetchEvent(params);
  const parentLay = await parent;

  return {
    title: [parentLay.title?.absolute, event.title].reverse().join(' - '),
    description: event.short_description,
    openGraph: {
      images: event.banner_url,
    },
  };
};

async function EventPage({ params }: any) {
  const resolvedTailwindConfig = resolveConfig(tailwindConfig);
  const event = await fetchEvent(params);
  const business = await getBusiness(params.slug);
  const slug = getSlug(params.slug, false);
  const date = (() => {
    if (!event) return;
    const jMoment = moment(event?.start_at);
    jMoment.locale('fa');
    return jMoment.format('dddd jD jMMMM');
  })();

  const clock = (() => {
    if (!event) return;
    const from = moment(event?.start_at, 'HH:mm:ss').format('HH:mm');
    const to = moment(event?.end_at, 'HH:mm:ss').format('HH:mm');
    if (event?.end_at) return `${from} تا ${to}`;
    return from;
  })();

  return (
    <>
      <div className="min-h-screen w-full">
        <Navbar fixed={false} callPager={false} back title={business.name} />
        <FlexBox direction="column" className="px-[2.07rem] max-w-lg mx-auto">
          <FlexItem>
            <FlexBox alignItems="center" gap={2}>
              <hr className="border-black/10 w-full" />
              <div className="w-fit text-[1.2rem] font-[500] whitespace-nowrap text-typography">
                {event?.title}
              </div>
              <hr className="border-black/10 w-full" />
            </FlexBox>
          </FlexItem>
          <FlexItem className="mt-[1.64rem]">
            <div className="relative w-[20rem] h-[20rem] rounded-[.862rem] overflow-hidden mx-auto border">
              {event?.banner_url ? (
                <Image
                  fill
                  alt={event?.title || ''}
                  src={event?.banner_url}
                  className="object-cover"
                />
              ) : (
                <div className="text-gray-400 font-bold text-[2rem] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
                  دورهمی
                </div>
              )}
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
                {business.name}
              </FlexItem>
            </FlexBox>
          </FlexItem>
          <FlexItem className="mt-[1.38rem]">
            <FlexBox
              justify="center"
              alignItems="center"
              className="gap-[.75rem]"
            >
              <FlexItem>
                <FlexBox className="gap-[.5rem]" alignItems="center">
                  <FlexItem>
                    <CalendarIcon
                      color={resolvedTailwindConfig.theme?.colors![
                        'typography'
                      ].toString()}
                      width={20}
                      height={20}
                    />
                  </FlexItem>
                  <FlexItem className="text-typography text-[.862rem]">
                    {date}
                  </FlexItem>
                </FlexBox>
              </FlexItem>
              <FlexItem>
                <FlexBox className="gap-[.5rem]" alignItems="center">
                  <FlexItem>
                    <ClockIcon
                      color={resolvedTailwindConfig.theme?.colors![
                        'typography'
                      ].toString()}
                      width={20}
                      height={20}
                    />
                  </FlexItem>
                  <FlexItem className="text-typography text-[.862rem]">
                    {clock}
                  </FlexItem>
                </FlexBox>
              </FlexItem>
              {!!event?.limit && (
                <FlexItem>
                  <FlexBox className="gap-[.5rem]" alignItems="center">
                    <FlexItem>
                      <PeopleIcon
                        color={resolvedTailwindConfig.theme?.colors![
                          'typography'
                        ].toString()}
                        width={20}
                        height={20}
                      />
                    </FlexItem>
                    <FlexItem className="text-typography text-[.862rem]">
                      {event?.limit} نفر
                    </FlexItem>
                  </FlexBox>
                </FlexItem>
              )}
            </FlexBox>
          </FlexItem>
          {!!business.address && (
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
                  {business.address}
                </FlexItem>
              </FlexBox>
            </FlexItem>
          )}
          {event?.long_description && (
            <FlexItem className="mt-[1.21rem]">
              <FlexBox direction="column" className="gap-[.34rem]">
                <FlexItem className="text-[.862rem] text-typography">
                  توضیحات:
                </FlexItem>
                <FlexItem className="text-[.862rem] text-typography">
                  <div
                    dangerouslySetInnerHTML={{
                      __html: event?.long_description,
                    }}
                  />
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

export default EventPage;

import { ProfileHeader } from '@/components/profile/header/header';
import cafeeshopBannelPlaceholder from '@/assets/images/coffeeshop-banner-placeholder.jpg';
import React, { useContext, useEffect, useMemo, useState } from 'react';
import { Section } from '@/components/common/section/section';
import dynamic from 'next/dynamic';
import { GetServerSideProps } from 'next';
import { IProfile } from './types';
import { CoffeeShopProviderContext } from '@/providers/coffee_shop/provider';
import Head from 'next/head';
import { Button } from '@/components/common/button';
import { useSlug } from '@/providers/main/hooks';
import { FlexBox } from '@/components/common/flex_box/flex_box';
import { FlexItem } from '@/components/common/flex_item/flex_item';
import { PhoneIcon } from '@/icons/phone';
import resolveConfig from 'tailwindcss/resolveConfig';
import tailwindConfig from '@/tailwind.config';
import { MailIcon } from '@/icons/mail';
import { serverBaseUrl } from '@/utils/axios';
import { withCafeeShopProfile } from '@/utils/serverSideUtils';
import { CoffeeShopPageProvider } from '@/providers/coffee_shop/page_provider';
import { MetaTags } from '@/components/common/metatags';
import _ from 'lodash';
import { useLoadings, usePageLoading } from '@/utils/hooks';
import Navbar from '@/components/core/navbar/navbar';
import Link from 'next/link';
import 'leaflet/dist/leaflet.css';
import 'react-toastify/dist/ReactToastify.css';
import { Footer } from '@/components/core/footer/footer';
import { Swiper, SwiperSlide } from 'swiper/react';
import { SpecialDiscount } from '@/components/common/special_discount';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import { EventCard } from '@/components/common/event_card';

const WorkingHours = dynamic(
  () => import('@/components/profile/working_hours/working_hours'),
  { ssr: false },
);
const MapComponent = dynamic(() => import('@/components/common/map/map'), {
  ssr: false,
});
const Profile = () => {
  const [addL, removeL] = useLoadings();
  usePageLoading();
  const { state, businessService } = useContext(CoffeeShopProviderContext);
  const profileData: IProfile = state.profile;
  const slug = useSlug();
  const resolvedTailwindConfig = resolveConfig(tailwindConfig);
  const [fetchedEvents, setFetchedEvents] = useState<EventType[]>([]);

  const locationCoordinates: [number, number] = [
    parseFloat(profileData.location_lat || '0'),
    parseFloat(profileData.location_long || '0'),
  ];

  const contactInfo = useMemo(
    () =>
      [
        {
          icon: (
            <PhoneIcon
              color={resolvedTailwindConfig.theme?.colors!['white'].toString()}
            />
          ),
          value: profileData.phone_number,
          link: `tel:${profileData.phone_number}`,
        },
        {
          icon: (
            <MailIcon
              color={resolvedTailwindConfig.theme?.colors!['white'].toString()}
            />
          ),
          value: profileData.email,
          link: `mailto:${profileData.email}`,
        },
      ].filter((item) => item.value),
    [profileData, resolvedTailwindConfig],
  );

  const events = useMemo(() => {
    return fetchedEvents.map((event, idx) => (
      <SwiperSlide
        className="!flex !flex-row !flex-nowrap !items-center !gap-[.5rem] !w-[30rem]"
        key={idx}
      >
        <EventCard {...event} className="mx-auto shadow-none border" />
      </SwiperSlide>
    ));
  }, [fetchedEvents]);

  const fetchEvents = () => {
    addL('fetch-events');
    businessService
      .getEvents()
      .finally(() => {
        removeL('fetch-events');
      })
      .then((data) => {
        setFetchedEvents(data);
      });
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <>
      <Head>
        <title>{`${profileData.name + (slug ? ' - منوما' : '')}`}</title>
        <link
          rel="manifest"
          href={`${serverBaseUrl}/api/cafe-restaurants/${state.profile.slug}/manifest.json`}
        />
      </Head>
      <MetaTags
        metatags={[
          {
            name: 'og:title',
            value: `${profileData.name + (slug ? ' - منوما' : '')}`,
          },
          {
            name: 'og:description',
            value: profileData.description,
          },
          {
            name: 'og:image',
            value: profileData?.logo_path
              ? `${serverBaseUrl}/storage/${profileData?.logo_path}`
              : cafeeshopBannelPlaceholder.src,
          },
        ]}
      />
      <Navbar dark background={false} callPager={false} menuButtonOverlay />
      <FlexBox
        className="min-h-screen"
        direction="column"
        justify="between"
        gap={2}
      >
        <div className="z-0">
          <ProfileHeader />
          <div className="mt-[4.3rem]">
            <Link href={`/${slug}menu`} className="mx-auto">
              <Button
                className="py-[.8rem] px-[2.9rem] mx-auto w-fit shadow-[0_0_20px_5px_rgba(0,0,0,0.01)] font-bold border"
                rounded
                color="#fff"
              >
                مشاهده مـنـو
              </Button>
            </Link>
            <div className="mt-[1rem]">
              <WorkingHours data={profileData.working_hours || []} />
            </div>

            {/* {!!fetchedEvents?.length && (
              <div className="mt-[2.12rem] pb-[1rem]  w-full" id="discounts">
                <Section
                  title="دورهمی ها"
                  contentClassNames="pt-[1rem] relative"
                >
                  <Swiper
                    id="events"
                    slidesPerView={'auto'}
                    spaceBetween={8}
                    grabCursor={true}
                    scrollbar
                    slidesOffsetBefore={20}
                    slidesOffsetAfter={20}
                    breakpoints={{
                      768: {
                        centeredSlides: true
                      }
                    }}
                  >
                    {events}
                  </Swiper>
                </Section>
              </div>
            )} */}
            <Section
              title="موقعیت مکانی"
              className="mt-[1rem]"
              append={
                <Button
                  link={`https://www.google.com/maps/search/?api=1&query=${locationCoordinates[0]},${locationCoordinates[1]}`}
                  className="text-[.8rem] px-[.8rem] py-[.3rem] text-white bg-[#EEB33F]"
                  linkTarget="_blank"
                  rounded="1rem"
                  color="secondary"
                >
                  مسیریابی
                </Button>
              }
            >
              <FlexBox direction="column" gap={2} className="mt-2 px-[2.5rem]">
                <FlexItem className="text-typography text-[.9rem] text-justify py-2 rounded-[2rem]">
                  {profileData.address}
                </FlexItem>
                <FlexItem className="mt-2">
                  <div className="rounded-[1rem] overflow-hidden h-[12.7rem] relative z-0">
                    <MapComponent
                      location={{
                        coordinates: locationCoordinates,
                      }}
                    />
                  </div>
                </FlexItem>
              </FlexBox>
            </Section>
            {!!contactInfo.length && (
              <Section
                title="تماس با ما"
                className="py-[1.6rem]"
                contentClassNames="px-[1.7rem]"
              >
                <FlexBox direction="column" className="px-[1rem]" gap={2}>
                  {contactInfo.map((contact, key) => (
                    <FlexItem
                      className="text-typography text-[.9rem] text-justify rounded-[2rem] border"
                      key={key}
                    >
                      <FlexBox alignItems="center" gap={0}>
                        <FlexItem className="bg-typography rounded-tr-[1rem] rounded-br-[1rem]  py-2 px-2">
                          {contact.icon}
                        </FlexItem>
                        <FlexItem
                          className="text-typography font-bold bg-white/[.4] py-2 px-4 rounded-tl-[1rem] rounded-bl-[1rem] text-[1rem] text-center"
                          grow
                        >
                          <Link target="_blank" href={contact.link || '#'}>
                            {contact.value}
                          </Link>
                        </FlexItem>
                      </FlexBox>
                    </FlexItem>
                  ))}
                </FlexBox>
              </Section>
            )}
          </div>
        </div>
        <Footer />
      </FlexBox>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = withCafeeShopProfile();

export default CoffeeShopPageProvider(Profile);

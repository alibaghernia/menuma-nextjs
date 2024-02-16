'use server';
import { ProfileHeader } from '@/components/profile/header/header';
import React, { cache } from 'react';
import { Section } from '@/components/common/section/section';
import { Button } from '@/components/common/button';
import { FlexBox } from '@/components/common/flex_box/flex_box';
import { FlexItem } from '@/components/common/flex_item/flex_item';
import { getSlug } from '@/utils/serverSideUtils';
import _ from 'lodash';
import Link from '@/components/common/link/link';
import 'leaflet/dist/leaflet.css';
import 'react-toastify/dist/ReactToastify.css';
import { Footer } from '@/components/core/footer/footer';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import Contacts from './components/contacts';
import { getBusiness } from '@/actions/business';
import WorkingHours from '@/components/profile/working_hours/working_hours';
import dynamic from 'next/dynamic';
const Navbar = dynamic(() => import('@/components/core/navbar/navbar'), {
  ssr: false,
});

const Map = dynamic(() => import('@/components/common/map/map'), {
  ssr: false,
});
async function Profile({ params }: any) {
  const profileData = await getBusiness(params.slug);
  const slug = getSlug(params.slug, false);
  return (
    <>
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
            {profileData.has_menu && (
              <Link
                href={`/${[slug, 'menu'].filter(Boolean).join('/')}`}
                className="mx-auto w-fit block"
              >
                <Button
                  className="py-[.8rem] px-[2.9rem] mx-auto w-fit shadow-[0_0_20px_5px_rgba(0,0,0,0.01)] font-bold border"
                  rounded
                  color="#fff"
                >
                  مشاهده مـنـو
                </Button>
              </Link>
            )}
            <div className="mt-[1rem]">
              <WorkingHours data={profileData.working_hours || []} />
            </div>
            <Section
              title="موقعیت مکانی"
              className="mt-[1rem]"
              append={
                <Button
                  link={`https://www.google.com/maps/search/?api=1&query=${profileData.location_lat},${profileData.location_long}`}
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
                    <Map business={profileData} />
                  </div>
                </FlexItem>
              </FlexBox>
            </Section>
            <Contacts business={profileData} />
          </div>
        </div>
        <Footer />
      </FlexBox>
    </>
  );
}

export default Profile;

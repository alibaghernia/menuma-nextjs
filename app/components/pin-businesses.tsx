'use client';
import Link from '@/components/common/link/link';
import { Section } from '@/components/common/section/section';
import { Business } from '@/services/business/business';
import Image from 'next/image';
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

const PinBusinesses = ({ pinBusinesses }: { pinBusinesses: Business[] }) => {
  const businessesSlides = pinBusinesses.map((slide, idx) => {
    return (
      <SwiperSlide
        className="!flex !flex-row !flex-nowrap !items-center !gap-[.5rem] !w-fit !rounded-full !overflow-hidden"
        key={idx}
      >
        <Link href={`/${slide.slug}`} className=" w-[6.25rem] h-[6.25rem]">
          {slide.logo_url && (
            <Image src={slide.logo_url} fill alt={slide.name} className="z-0" />
          )}
          <div className="absolute inset-0 bg-black/[.6] flex items-center justify-center z-10 text-white text-[.75rem] font-bold">
            {slide.name}
          </div>
        </Link>
      </SwiperSlide>
    );
  });
  return (
    Boolean(pinBusinesses?.length) && (
      <div className="mt-[2.12rem] w-screen md:max-w-[65rem]">
        <Section
          title="کافه های پیشنهادی"
          contentClassNames="pt-[1rem] overflow-hidden"
        >
          <Swiper
            slidesPerView={'auto'}
            spaceBetween={8}
            grabCursor={true}
            scrollbar
            slidesOffsetBefore={20}
            slidesOffsetAfter={20}
          >
            {businessesSlides}
          </Swiper>
        </Section>
      </div>
    )
  );
};

export default PinBusinesses;

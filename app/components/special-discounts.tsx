'use client';
import { Section } from '@/components/common/section/section';
import { SpecialDiscount } from '@/components/common/special_discount';
import { DiscountEntity } from '@/services/main/main';
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

const SpecialDiscounts = ({
  specialDiscounts,
}: {
  specialDiscounts: DiscountEntity[];
}) => {
  const discountsSlides = specialDiscounts.map((discount, idx) => (
    <SwiperSlide
      className="!flex !flex-row !flex-nowrap !items-center !gap-[.5rem] !w-[20rem] "
      key={idx}
    >
      <SpecialDiscount
        key={idx}
        business_logo={discount.business?.logo_url}
        business_slug={discount.business?.slug}
        business_title={discount.business?.name}
        {...discount}
      />
    </SwiperSlide>
  ));

  return (
    Boolean(specialDiscounts?.length) && (
      <div className="mt-[2.12rem] w-screen md:max-w-[65rem]">
        <Section title="تخفیف های ویژه" contentClassNames="pt-[1rem] relative">
          <Swiper
            id="discounts"
            slidesPerView={'auto'}
            spaceBetween={8}
            grabCursor={true}
            scrollbar
            slidesOffsetBefore={20}
            slidesOffsetAfter={20}
          >
            {discountsSlides}
          </Swiper>
        </Section>
      </div>
    )
  );
};

export default SpecialDiscounts;

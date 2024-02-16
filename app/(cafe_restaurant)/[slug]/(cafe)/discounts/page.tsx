'use server';
import { FlexBox } from '@/components/common/flex_box/flex_box';
import { FlexItem } from '@/components/common/flex_item/flex_item';
import { Section } from '@/components/common/section/section';
import Navbar from '@/components/core/navbar/navbar';
import { CoffeeShopProviderContext } from '@/providers/coffee_shop/provider';
import { ProviderContext } from '@/providers/main/provider';
import { useLoadings } from '@/utils/hooks';
import Head from 'next/head';
import Image from 'next/image';
import React, { cache, useContext, useEffect, useMemo, useState } from 'react';
import noImage from '@/assets/images/coffe-pattern.jpg';
import Link from '@/components/common/link/link';
import { Footer } from '@/components/core/footer/footer';
import { SpecialDiscount } from '@/components/common/special_discount';
import { BusinessService } from '@/services/business/business.service';
import { getBusiness } from '@/actions/business';
const fetchDiscounts = cache((params: any) => {
  const businessService = BusinessService.init(params.slug);
  return businessService
    .getDiscounts({
      type: 'CONDITIONAL',
    })
    .then((data) => data.data.items);
});
async function DiscountsPage({ params }: any) {
  const business = await getBusiness(params.slug);
  const fetchedDiscounts = await fetchDiscounts(params);

  const discounts = fetchedDiscounts.map((discount, idx) => (
    <FlexItem key={idx}>
      <SpecialDiscount
        {...discount}
        business_logo={business.logo_url}
        business_slug={business.slug}
        business_title={business.name}
        className="md:w-[25rem]"
        in_scope
      />
    </FlexItem>
  ));
  return (
    <>
      <Navbar
        fixed={false}
        title={business.name}
        back
        callPager={false}
        background={false}
      />
      <FlexBox justify="between" direction="column" className="min-h-screen">
        <FlexItem>
          <FlexBox direction="column">
            <FlexItem>
              <div className="relative w-[7rem] h-[7rem] rounded-full overflow-hidden mx-auto border">
                <Link href={`/${business.slug}`}>
                  <Image
                    alt={business.name}
                    fill
                    src={business.logo_url ? business.logo_url : noImage.src}
                  />
                </Link>
              </div>
            </FlexItem>
            <FlexItem className="mt-[2rem]">
              <Section
                title="تخفیف های ویژه"
                contentClassNames="px-[1.2rem] pt-2"
                centerTitle
              >
                <FlexBox direction="column" gap={2} className="md:items-center">
                  {discounts}
                </FlexBox>
              </Section>
            </FlexItem>
          </FlexBox>
        </FlexItem>
        <FlexItem>
          <Footer />
        </FlexItem>
      </FlexBox>
    </>
  );
}

export default DiscountsPage;

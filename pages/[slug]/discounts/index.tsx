import { EventCard } from '@/components/common/event_card';
import { FlexBox } from '@/components/common/flex_box/flex_box';
import { FlexItem } from '@/components/common/flex_item/flex_item';
import { Section } from '@/components/common/section/section';
import Navbar from '@/components/core/navbar/navbar';
import { CoffeeShopPageProvider } from '@/providers/coffee_shop/page_provider';
import { CoffeeShopProviderContext } from '@/providers/coffee_shop/provider';
import { ProviderContext } from '@/providers/main/provider';
import { serverBaseUrl } from '@/utils/axios';
import { useLoadings } from '@/utils/hooks';
import { withCafeeShopProfile } from '@/utils/serverSideUtils';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import React, { useContext, useEffect, useMemo, useState } from 'react';
import noImage from '@/assets/images/no-image.jpg';
import Link from 'next/link';
import { Footer } from '@/components/core/footer/footer';
import { SpecialDiscount } from '@/components/common/special_discount';

function DiscountsPage() {
  const [addL, removeL] = useLoadings();
  const { state, businessService } = useContext(CoffeeShopProviderContext);
  const mainProvider = useContext(ProviderContext);
  const [fetchedDiscounts, setFetchedDiscounts] = useState<
    ConditionalDiscount[]
  >([]);

  const fetchDiscounts = () => {
    addL('fetch-discounts');
    businessService
      .getDiscounts()
      .finally(() => {
        removeL('fetch-discounts');
      })
      .then((data) => {
        setFetchedDiscounts(data);
      });
  };
  useEffect(() => {
    fetchDiscounts();
  }, []);
  const title = useMemo(() => {
    const titleAr = ['منوما', state.profile.name, 'تخفیف ها'];
    if (mainProvider.state.isNotMenuma) {
      titleAr.shift();
    }
    return titleAr.join(' - ');
  }, []);

  const discounts = useMemo(() => {
    return fetchedDiscounts.map((event, idx) => (
      <FlexItem key={idx}>
        <SpecialDiscount
          {...event}
          business_logo={event.cafe_restaurant?.logo_path}
          business_slug={event.cafe_restaurant?.slug}
          business_title={event.cafe_restaurant?.name}
          className="md:w-[25rem]"
        />
      </FlexItem>
    ));
  }, [fetchedDiscounts]);
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <Navbar
        fixed={false}
        title={state.profile.name}
        back
        callPager={false}
        background={false}
      />
      <FlexBox justify="between" direction="column" className="min-h-screen">
        <FlexItem>
          <FlexBox direction="column">
            <FlexItem>
              <div className="relative w-[7rem] h-[7rem] rounded-full overflow-hidden mx-auto">
                <Link href={`/${state.profile.slug}`}>
                  <Image
                    alt={state.profile.name}
                    fill
                    src={
                      state.profile.logo_path
                        ? `${serverBaseUrl}/storage/${state.profile.logo_path}`
                        : noImage.src
                    }
                  />
                </Link>
              </div>
            </FlexItem>
            <FlexItem className="mt-[2rem]">
              <Section title="تخفیف های ویژه" contentClassNames="px-[1.2rem]">
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

export const getServerSideProps: GetServerSideProps = withCafeeShopProfile();

export default CoffeeShopPageProvider(DiscountsPage);

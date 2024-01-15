import { Button } from '@/components/common/button';
import { Container } from '@/components/common/container/container';
import { FlexBox } from '@/components/common/flex_box/flex_box';
import { FlexItem } from '@/components/common/flex_item/flex_item';
import { Logo } from '@/components/common/logo';
import { Section } from '@/components/common/section/section';
import { Location } from '@/icons/location';
import { SearchIcon } from '@/icons/search';
import Head from 'next/head';
import Image from 'next/image';
import noImage from '@/assets/images/no-image.jpg';
import { Fragment, useContext, useEffect, useMemo, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import provider, { ProviderContext } from '@/providers/main/provider';
import { axios, serverBaseUrl } from '@/utils/axios';
import { CoffeeShopPageProvider } from '@/providers/coffee_shop/page_provider';
import { SearchBusinessBox } from '@/components/common/search_business_box/search_business_box';
import { useRouter } from 'next/router';
import { useCustomRouter, useLoadings } from '@/utils/hooks';
import { LOADING_KEYS } from '@/providers/general/contants';
import Link from 'next/link';

function Home() {
  const [addL, removeL] = useLoadings();
  const router = useCustomRouter();
  const [searchField, setSearchField] = useState('');
  const [pinBusinesses, setPinBusinesses] = useState<
    {
      slug: string;
      logo: string;
      title: string;
    }[]
  >([]);

  const fetchPinBusinesses = () => {
    addL('pin-businesses');
    axios
      .get(`/api/cafe-restaurants?pin=1`)
      .finally(() => removeL('pin-businesses'))
      .then(({ data }) => {
        setPinBusinesses(
          data?.map((business: any) => ({
            title: business.name,
            slug: business.slug,
            logo: business.logo_path
              ? `${serverBaseUrl}/storage/${business.logo_path}`
              : noImage.src,
          })),
        );
      });
  };

  const businessesSlides = useMemo(() => {
    return pinBusinesses.map((slide, idx) => {
      return (
        <SwiperSlide
          className="!flex !flex-row !flex-nowrap !items-center !gap-[.5rem] !w-fit !rounded-full !overflow-hidden"
          key={idx}
        >
          <Link href={`/${slide.slug}`} className=" w-[6.25rem] h-[6.25rem]">
            <Image src={slide.logo} fill alt={slide.title} className="z-0" />
            <div className="absolute inset-0 bg-black/[.6] flex items-center justify-center z-10 text-white text-[.75rem] font-bold">
              {slide.title}
            </div>
          </Link>
        </SwiperSlide>
      );
    });
  }, [pinBusinesses]);

  useEffect(() => {
    fetchPinBusinesses();
  }, []);

  const handleSearchBusiness = (searchPhrase: string) => {
    if (!searchPhrase) return;
    addL(LOADING_KEYS.pageLoading);
    router.push(`/search?search=${searchPhrase}`);
  };
  const findNearestBusinessHandler = () => {

    if (navigator.geolocation) {
      addL('get-location');
      const lat = 31.8974;
      const long = 54.3569;
      addL(LOADING_KEYS.pageLoading);
      router.push(`/search?near=1&lat=${lat}&long=${long}`);
      // navigator.geolocation.getCurrentPosition(
      //   (position) => {
      //     removeL('get-location');
      //     const lat = position.coords.latitude;
      //     const long = position.coords.longitude;
      //     const lat = 31;
      //     const long = 54;
      //     addL(LOADING_KEYS.pageLoading);
      //     router.push(`/search?near=1&lat=${lat}&long=${long}`);
      //   },
      //   (error) => {
      //     removeL('get-location');
      //     console.log({
      //       error,
      //     });
      //     alert(JSON.stringify(error.message));
      //   },
      // );
    }
  };

  return (
    <>
      <div className="mx-auto md:w-fit mt-[2.38rem] flex flex-col items-center">
        <Logo />
        <div className="text-typography/[.8] text-[.875rem] font-medium">
          کافه ای که میخوای را پیدا کن
        </div>
        <div className="mt-[2.12rem] w-full px-[1.9rem]">
          <SearchBusinessBox
            value={searchField}
            onChange={setSearchField}
            onSearch={handleSearchBusiness}
          />
        </div>
        <div className="mt-[2.12rem]">
          <Button
            color="secondary"
            className="py-[.5rem] px-[.8rem] flex items-center"
            onClick={findNearestBusinessHandler}
          >
            <Location />
            پیدا کردن نزدیکترین کافه
          </Button>
        </div>
        <div className="mt-[2.12rem] w-full max-w-[65rem]">
          <Section title="کافه های پیشنهادی" contentClassNames="pt-[1rem]">
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
      </div>
    </>
  );
}

export default CoffeeShopPageProvider(Home);

import { Button } from '@/components/common/button';
import { FlexBox } from '@/components/common/flex_box/flex_box';
import { FlexItem } from '@/components/common/flex_item/flex_item';
import { Logo } from '@/components/common/logo';
import { Section } from '@/components/common/section/section';
import { Location } from '@/icons/location';
import Image from 'next/image';
import noImage from '@/assets/images/no-image.jpg';
import { useEffect, useMemo, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import { serverBaseUrl } from '@/utils/axios';
import { CoffeeShopPageProvider } from '@/providers/coffee_shop/page_provider';
import { SearchBusinessBox } from '@/components/common/search_business_box/search_business_box';
import { useCustomRouter, useLoadings } from '@/utils/hooks';
import { LOADING_KEYS } from '@/providers/general/contants';
import Link from 'next/link';
import { EventCard } from '@/components/common/event_card';
import { MainService } from '@/services/main/main.service';
import { Footer } from '@/components/core/footer/footer';
import { SpecialDiscount } from '@/components/common/special_discount';
import { IConfirmModalProps } from '@/components/common/confirm_modal/types';
import ConfirmModal from '@/components/common/confirm_modal/confirm_modal';
import moment from 'moment';

function Home() {
  const [addL, removeL] = useLoadings();
  const router = useCustomRouter();
  const [searchField, setSearchField] = useState('');
  const [fetchedEvents, setFetchedEvents] = useState<EventType[]>([]);
  const [confirmModal, setConfirmModal] = useState<IConfirmModalProps>();
  const [pinBusinesses, setPinBusinesses] = useState<
    {
      slug: string;
      logo: string;
      title: string;
    }[]
  >([]);
  const [conditinalDiscounts, setConditinalDiscounts] = useState<
    ConditionalDiscount[]
  >([]);
  const mainService = MainService.init();

  const fetchPinBusinesses = () => {
    addL('pin-businesses');
    mainService
      .searchBusiness({
        pin: true,
      })
      .finally(() => removeL('pin-businesses'))
      .then((data) => {
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
  const fetchEvents = () => {
    addL('fetch-events');
    mainService
      .getEvents({
        is_pinned: true,
        from: moment().format('YYYY-MM-DD'),
      })
      .finally(() => {
        removeL('fetch-events');
      })
      .then((data) => {
        setFetchedEvents(data);
      });
  };
  function fetchHasDiscountBusinesses() {
    addL('fetch-has-discount-businesses');
    mainService
      .getDiscounts({
        is_pinned: true,
      })
      .finally(() => {
        removeL('fetch-has-discount-businesses');
      })
      .then((data) => {
        setConditinalDiscounts(data);
      });
  }

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

  const discountsSlides = useMemo(
    () =>
      conditinalDiscounts.map((discount, idx) => (
        <SwiperSlide
          className="!flex !flex-row !flex-nowrap !items-center !gap-[.5rem] !w-[20rem] "
          key={idx}
        >
          <SpecialDiscount
            key={idx}
            cafe_restaurant_id={discount.cafe_restaurant_id}
            title={discount.title}
            description={discount.description}
            id={discount.id}
            created_at={discount.created_at}
            updated_at={discount.updated_at}
            business_logo={discount.cafe_restaurant?.logo_path}
            business_slug={discount.cafe_restaurant?.slug}
            business_title={discount.cafe_restaurant?.name}
          />
        </SwiperSlide>
      )),
    [conditinalDiscounts],
  );

  useEffect(() => {
    fetchPinBusinesses();
    fetchEvents();
    fetchHasDiscountBusinesses();
  }, []);

  const handleSearchBusiness = (searchPhrase: string) => {
    if (!searchPhrase) return;
    addL(LOADING_KEYS.pageLoading);
    router.push(`/search?search=${searchPhrase}`);
  };
  const findNearestBusinessHandler = () => {
    function showErrorModal(title: string, error: string) {
      setConfirmModal({
        open: true,
        title,
        dangerConfirm: false,
        primaryConfirm: true,
        dismissButton: false,
        content: (
          <div className="text-[1rem] text-typography text-center">{error}</div>
        ),
        onClose() {
          setConfirmModal(undefined);
        },
        onConfirm() {
          setConfirmModal(undefined);
        },
      });
    }
    if (navigator.geolocation) {
      addL('get-location');
      navigator.geolocation.getCurrentPosition(
        (position) => {
          removeL('get-location');
          const lat = position.coords.latitude;
          const long = position.coords.longitude;
          addL(LOADING_KEYS.pageLoading);
          router.push(`/search?near=1&lat=${lat}&long=${long}`);
        },
        (error) => {
          removeL('get-location');
          console.log({
            error,
          });
          if (error.code == 1) {
            showErrorModal(
              'خطای دسترسی',
              'دسترسی به خواندن موقعیت مکانی داده نشده است.',
            );
          } else if (error.code == 2) {
            showErrorModal(
              'خطا',
              'امکان دریافت اطلاعات موقعیت مکانی از سرویس دهنده وجود ندارد.',
            );
          } else {
            showErrorModal(
              'خطا',
              'خطایی در دریافت اطلاعات موقعیت مکانی رخ داد.',
            );
          }
        },
      );
    }
  };

  const events = useMemo(() => {
    return fetchedEvents.map((event, idx) => (
      <FlexItem key={idx}>
        <EventCard {...event} className="mx-auto" />
      </FlexItem>
    ));
  }, [fetchedEvents]);

  return (
    <>
      <FlexBox direction="column" justify="between" className="min-h-screen">
        <div className="mx-auto md:w-fit pt-[2.38rem] flex flex-col items-center">
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
          {Boolean(pinBusinesses?.length) && (
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
          )}
          {Boolean(conditinalDiscounts?.length) && (
            <div className="mt-[2.12rem] w-full max-w-[65rem]">
              <Section
                title="تخفیف های ویژه"
                contentClassNames="pt-[1rem] relative"
              >
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
          )}
          {Boolean(fetchedEvents?.length) && (
            <div className="my-[2.12rem] w-full max-w-[65rem]">
              <Section title="دورهمی ها" contentClassNames="pt-[.5rem] px-5">
                <FlexBox direction="column" alignItems="stretch" gap={2}>
                  {events}
                </FlexBox>
              </Section>
            </div>
          )}
        </div>
        <Footer />
      </FlexBox>
      {confirmModal && <ConfirmModal {...confirmModal} />}
    </>
  );
}

export default CoffeeShopPageProvider(Home);

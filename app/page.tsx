'use server';
import { FlexBox } from '@/components/common/flex_box/flex_box';
import { FlexItem } from '@/components/common/flex_item/flex_item';
import { Logo } from '@/components/common/logo';
import { Section } from '@/components/common/section/section';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import { CoffeeShopPageProvider } from '@/providers/coffee_shop/page_provider';
import { SearchBusinessBox } from '@/components/common/search_business_box/search_business_box';
import { EventCard } from '@/components/common/event_card';
import { MainService } from '@/services/main/main.service';
import { Footer } from '@/components/core/footer/footer';
import { SpecialDiscount } from '@/components/common/special_discount';
import moment from 'moment';
import Link from '@/components/common/link/link';
import FindNearestBusinesses from './components/find-nearest-businesses';
import { SwiperSlide, Swiper } from './components/client-components';
import PinBusinesses from './components/pin-businesses';
import Image from 'next/image';
import SpecialDiscounts from './components/special-discounts';
import Events from './components/events';
import SearchBox from './components/search-box';
import { Flex } from 'antd/lib';

const fetchPinBusinesses = () => {
  const mainService = MainService.init();
  return mainService
    .searchBusiness({
      pin: true,
    })
    .then((data) => data.data.businesses);
};
const fetchEvents = () => {
  const mainService = MainService.init();
  return mainService
    .getEvents({
      pin: true,
      from: moment().toISOString(),
    })
    .then((data) => data.data.items);
};
function fetchHasDiscountBusinesses() {
  const mainService = MainService.init();
  return mainService
    .getDiscounts({
      type: 'CONDITIONAL',
      pin: true,
    })
    .then((data) => data.data.items);
}

async function Home() {
  const pinBusinessesPromise = fetchPinBusinesses();
  const conditinalDiscountsPromise = fetchHasDiscountBusinesses();
  const eventsPromise = fetchEvents();

  const [pinBusinesses, conditinalDiscounts, events] = await Promise.all([
    pinBusinessesPromise,
    conditinalDiscountsPromise,
    eventsPromise,
  ]);

  return (
    <>
      <Flex vertical justify="space-between" className="min-h-screen">
        <div className="mx-auto md:w-fit pt-[2.38rem] flex flex-col items-center">
          <Logo />
          <div className="text-typography/[.8] text-[.875rem] font-medium">
            کافه ای که میخوای را پیدا کن
          </div>
          <div className="mt-[2.12rem] w-screen md:w-full px-[1.9rem]">
            <SearchBox />
          </div>
          <div className="mt-[2.12rem]">
            <FindNearestBusinesses />
          </div>
          <PinBusinesses pinBusinesses={pinBusinesses} />
          <SpecialDiscounts specialDiscounts={conditinalDiscounts} />
          <Events events={events} />
        </div>
        <Footer />
      </Flex>
    </>
  );
}

export default CoffeeShopPageProvider(Home);

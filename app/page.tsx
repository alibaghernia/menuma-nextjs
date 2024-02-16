'use server';
import { Logo } from '@/components/common/logo';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import { CoffeeShopPageProvider } from '@/providers/coffee_shop/page_provider';
import { MainService } from '@/services/main/main.service';
import { Footer } from '@/components/core/footer/footer';
import moment from 'moment';
import FindNearestBusinesses from './components/find-nearest-businesses';
import PinBusinesses from './components/pin-businesses';
import SpecialDiscounts from './components/special-discounts';
import Events from './components/events';
import SearchBox from './components/search-box';
import { Flex } from 'antd/lib';
import { cache } from 'react';

const fetchPinBusinesses = cache(() => {
  const mainService = MainService.init();
  return mainService
    .searchBusiness({
      pin: true,
    })
    .then((data) => data.data.businesses);
});
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

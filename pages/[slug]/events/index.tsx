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
import moment from 'moment';

function EventsPage() {
  const [addL, removeL] = useLoadings();
  const { state, businessService } = useContext(CoffeeShopProviderContext);
  const mainProvider = useContext(ProviderContext);
  const [fetchedEvents, setFetchedEvents] = useState<EventType[]>([]);
  const [pastEvents, setPastEvents] = useState<EventType[]>([]);

  const fetchEvents = () => {
    addL('fetch-events');
    businessService
      .getEvents({
        from: moment().format('YYYY-MM-DD'),
      })
      .finally(() => {
        removeL('fetch-events');
      })
      .then((data) => {
        setFetchedEvents(data);
      });
  };
  const fetchPastEvents = () => {
    addL('fetch-past-events');
    businessService
      .getEvents({
        to: moment().format('YYYY-MM-DD'),
      })
      .finally(() => {
        removeL('fetch-past-events');
      })
      .then((data) => {
        setPastEvents(data);
      });
  };
  useEffect(() => {
    fetchEvents();
    fetchPastEvents();
  }, []);
  const title = useMemo(() => {
    const titleAr = ['منوما', state.profile.name, 'دورهمی ها'];
    if (mainProvider.state.isNotMenuma) {
      titleAr.shift();
    }
    return titleAr.join(' - ');
  }, []);

  const events = useMemo(() => {
    return fetchedEvents.map((event, idx) => (
      <FlexItem key={idx}>
        <EventCard {...event} className="w-full md:w-[30rem]" />
      </FlexItem>
    ));
  }, [fetchedEvents]);
  const renderPastEvents = useMemo(() => {
    return pastEvents.map((event, idx) => (
      <FlexItem key={idx}>
        <EventCard {...event} className="w-full md:w-[30rem]" />
      </FlexItem>
    ));
  }, [fetchedEvents]);
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
              <div className="relative w-[7rem] h-[7rem] rounded-full overflow-hidden mx-auto border">
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
            <FlexItem className="mt-[1rem]">
              <Section
                title="دورهمی ها آینده"
                contentClassNames="px-[1.2rem]"
                centerTitle
              >
                {!!events.length ? (
                  <FlexBox
                    direction="column"
                    gap={2}
                    className="md:items-center"
                  >
                    {events}
                  </FlexBox>
                ) : (
                  <div className="text-center text-typography font-semibold">
                    دورهمی ای ثبت نشده است.
                  </div>
                )}
              </Section>
            </FlexItem>
            {!!renderPastEvents.length && (
              <FlexItem className="mt-[2rem]">
                <Section
                  title="دورهمی ها گذشته"
                  contentClassNames="px-[1.2rem]"
                  centerTitle
                >
                  <FlexBox
                    direction="column"
                    gap={2}
                    className="md:items-center"
                  >
                    {renderPastEvents}
                  </FlexBox>
                </Section>
              </FlexItem>
            )}
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

export default CoffeeShopPageProvider(EventsPage);

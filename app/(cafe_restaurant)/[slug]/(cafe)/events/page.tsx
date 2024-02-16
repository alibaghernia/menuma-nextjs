'use server';
import { EventCard } from '@/components/common/event_card';
import { FlexBox } from '@/components/common/flex_box/flex_box';
import { FlexItem } from '@/components/common/flex_item/flex_item';
import { Section } from '@/components/common/section/section';
import Navbar from '@/components/core/navbar/navbar';
import Image from 'next/image';
import React, { cache } from 'react';
import noImage from '@/assets/images/coffe-pattern.jpg';
import Link from '@/components/common/link/link';
import { Footer } from '@/components/core/footer/footer';
import moment from 'moment';
import { BusinessService } from '@/services/business/business.service';
import { getBusiness } from '@/actions/business';
import { getSlug } from '@/utils/serverSideUtils';

const fetchEvents = cache((params: any) => {
  const businessService = BusinessService.init(params.slug);
  return businessService.eventsService
    .getItems({
      from: moment().toISOString(),
    })
    .then((data) => data.data.items);
});
const fetchPastEvents = cache((params: any) => {
  const businessService = BusinessService.init(params.slug);
  return businessService.eventsService
    .getItems({
      to: moment().toISOString(),
    })
    .then((data) => data.data.items);
});

async function EventsPage({ params }: any) {
  const slug = getSlug(params.slug, false);
  const business = await getBusiness(params.slug);
  const [fetchedEvents, pastEvents] = await Promise.all([
    fetchEvents(params),
    fetchPastEvents(params),
  ]);

  const events = fetchedEvents.map((event, idx) => (
    <FlexItem key={idx}>
      <EventCard
        {...event}
        className="w-full md:w-[30rem]"
        slug={slug}
        in_scope
      />
    </FlexItem>
  ));
  const renderPastEvents = pastEvents.map((event, idx) => (
    <FlexItem key={idx}>
      <EventCard
        {...event}
        className="w-full md:w-[30rem]"
        slug={slug}
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
            <FlexItem className="mt-[1rem]">
              <Section
                title="دورهمی ها آینده"
                contentClassNames="px-[1.2rem] pt-2"
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
                  contentClassNames="px-[1.2rem] pt-2"
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

export default EventsPage;

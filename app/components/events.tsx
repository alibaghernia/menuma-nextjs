import { EventCard } from '@/components/common/event_card';
import { FlexBox } from '@/components/common/flex_box/flex_box';
import { FlexItem } from '@/components/common/flex_item/flex_item';
import { Section } from '@/components/common/section/section';
import { EventEntity } from '@/services/main/main';
import React from 'react';

const Events = ({ events, slug }: { events: EventEntity[]; slug?: string }) => {
  const eventItems = events.map((event, idx) => (
    <FlexItem key={idx}>
      <EventCard {...event} className="mx-auto" slug={slug} />
    </FlexItem>
  ));

  return (
    Boolean(events?.length) && (
      <div className="my-[2.12rem] w-screen md:max-w-[65rem]">
        <Section title="دورهمی ها" contentClassNames="pt-[.5rem] px-5">
          <FlexBox direction="column" alignItems="stretch" gap={2}>
            {eventItems}
          </FlexBox>
        </Section>
      </div>
    )
  );
};

export default Events;

import { getBusiness } from '@/actions/business';
import { FlexBox } from '@/components/common/flex_box/flex_box';
import { FlexItem } from '@/components/common/flex_item/flex_item';
import Link from '@/components/common/link/link';
import { Section } from '@/components/common/section/section';
import { MailIcon } from '@/icons/mail';
import { PhoneIcon } from '@/icons/phone';
import { CoffeeShopProviderContext } from '@/providers/coffee_shop/provider';
import tailwindConfig from '@/tailwind.config';
import React, { useContext, useMemo } from 'react';
import resolveConfig from 'tailwindcss/resolveConfig';

const Contacts = async ({ business }: any) => {
  const resolvedTailwindConfig = resolveConfig(tailwindConfig);

  const contactInfo = useMemo(
    () =>
      [
        {
          icon: (
            <PhoneIcon
              color={resolvedTailwindConfig.theme?.colors!['white'].toString()}
            />
          ),
          value: business.phone_number,
          link: `tel:${business.phone_number}`,
        },
        {
          icon: (
            <MailIcon
              color={resolvedTailwindConfig.theme?.colors!['white'].toString()}
            />
          ),
          value: business.email,
          link: `mailto:${business.email}`,
        },
      ].filter((item) => item.value),
    [business, resolvedTailwindConfig],
  );
  return (
    !!contactInfo.length && (
      <Section
        title="تماس با ما"
        className="py-[1.6rem]"
        contentClassNames="px-[1.7rem]"
      >
        <FlexBox direction="column" className="px-[1rem]" gap={2}>
          {contactInfo.map((contact, key) => (
            <FlexItem
              className="text-typography text-[.9rem] text-justify rounded-[2rem] border"
              key={key}
            >
              <FlexBox alignItems="center" gap={0}>
                <FlexItem className="bg-typography rounded-tr-[1rem] rounded-br-[1rem]  py-2 px-2">
                  {contact.icon}
                </FlexItem>
                <FlexItem
                  className="text-typography font-bold bg-white/[.4] py-2 px-4 rounded-tl-[1rem] rounded-bl-[1rem] text-[1rem] text-center"
                  grow
                >
                  <Link target="_blank" href={contact.link || '#'}>
                    {contact.value}
                  </Link>
                </FlexItem>
              </FlexBox>
            </FlexItem>
          ))}
        </FlexBox>
      </Section>
    )
  );
};

export default Contacts;

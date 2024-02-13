import React, { useContext, useMemo, useState } from 'react';
import coffeeshopImage from '@/assets/images/coffeeshop.jpg';
import coffeeshopLogo from '@/assets/images/coffeeshopLogo.png';
import { IProfileHeader } from '../header/types';
import Image from 'next/image';
import { Container } from '@/components/common/container/container';
import { FlexBox } from '@/components/common/flex_box/flex_box';
import { FlexItem } from '@/components/common/flex_item/flex_item';
import { CoffeeShopProviderContext } from '@/providers/coffee_shop/provider';
import { serverBaseUrl } from '@/utils/axios';
import { InstagramIcon } from '@/icons/instagram';
import { TelegramIcon } from '@/icons/telegram';
import { XIcon } from '@/icons/x';
import { WhatsappIcon } from '@/icons/whatsapp';
import Link from '@/components/common/link/link';

export const ProfileHeader: IProfileHeader = (props) => {
  const {
    state: { profile: profileData },
  } = useContext(CoffeeShopProviderContext);

  const socials = useMemo(() => {
    const elements = profileData.socials
      ?.map((social) => {
        switch (social.type) {
          case 'instagram': {
            return { icon: <InstagramIcon />, url: social.link };
          }
          case 'telegram': {
            return { icon: <TelegramIcon />, url: social.link };
          }
          case 'twitter_x': {
            return { icon: <XIcon width={20} height={20} />, url: social.link };
          }
          case 'whatsapp': {
            return { icon: <WhatsappIcon />, url: social.link };
          }
        }
      })
      .filter(Boolean)
      .map((social: any, key) => (
        <FlexItem key={key}>
          <Link href={social.url}>{social.icon}</Link>
        </FlexItem>
      ));
    return <div className="flex gap-2">{elements}</div>;
  }, [profileData]);

  return (
    <Container position="relative">
      <FlexBox
        direction="column"
        className="pt-[5.1rem] pb-[5.6rem] relative rounded-bl-[2.6rem] rounded-br-[2.6rem] overflow-hidden z-10"
      >
        <FlexItem>
          <Image
            fill
            priority
            src={
              profileData?.banner_url
                ? profileData?.banner_url
                : coffeeshopImage.src
            }
            alt={profileData.name}
            className="absolute inset-0 -z-20 object-cover"
          />
          <Container className="inset-0 -z-10 bg-black/[.6]" />
        </FlexItem>
        <FlexItem className="text-[1.8rem] mx-auto font-bold text-white">
          {profileData?.name}
        </FlexItem>
        <FlexItem className="text-[1rem] mx-auto font-light text-white text-center">
          {profileData?.description}
        </FlexItem>
        <FlexItem className="mx-auto mt-[1.4rem]">
          <FlexBox gap={2} alignItems="center">
            {socials}
          </FlexBox>
        </FlexItem>
      </FlexBox>
      <Container className="left-[50%] bottom-[-4.25rem] rounded-full z-20 w-[8.5rem] h-[8.5rem] translate-x-[-50%] border-[0.7rem] border-background bg-white">
        <div className="relative h-full w-full rounded-full border overflow-hidden">
          <Image
            fill
            src={
              profileData?.logo_url ? profileData?.logo_url : coffeeshopLogo.src
            }
            alt={profileData.name}
            className="object-cover"
          />
        </div>
      </Container>
    </Container>
  );
};

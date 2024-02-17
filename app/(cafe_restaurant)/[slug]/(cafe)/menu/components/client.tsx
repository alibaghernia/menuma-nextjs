'use client';
import { ProviderContext } from '@/providers/main/provider';
import React, { useContext, useEffect } from 'react';

const Client = ({ menuData }: any) => {
  const { checkCartItemsExist, state: mainProviderState } =
    useContext(ProviderContext);

  useEffect(() => {
    if (mainProviderState.restored && menuData) {
      checkCartItemsExist(
        menuData
          ?.map(
            (cat: any) =>
              cat.products?.filter(
                (item: any) =>
                  item.metadata?.some((tag: string) => tag == 'sold_out'),
              ),
          )
          .flat() || [],
      );
    }
  }, [mainProviderState.restored, menuData]);
  return <div></div>;
};

export default Client;
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
export { Swiper, SwiperSlide } from 'swiper/react';

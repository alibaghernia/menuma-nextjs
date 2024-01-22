import { Button } from '@/components/common/button';
import { FlexBox } from '@/components/common/flex_box/flex_box';
import { FlexItem } from '@/components/common/flex_item/flex_item';
import { Logo } from '@/components/common/logo';
import { Section } from '@/components/common/section/section';
import { Footer } from '@/components/core/footer/footer';
import { useLoadings, useMessage, usePageLoading } from '@/utils/hooks';
import Head from 'next/head';
import Link from 'next/link';
import React, { FC, useEffect, useMemo, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import menuImage from '@/assets/images/services/menu.png';
import pagerImage from '@/assets/images/services/pager.png';
import classNames from 'classnames';
import { twMerge } from 'tailwind-merge';
import Image from 'next/image';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import { MainService } from '@/services/main/main.service';
import { serverBaseUrl } from '@/utils/axios';

type Service = Catalog;

function CatalogPage() {
  usePageLoading();
  const [addL, removeL] = useLoadings();
  const message = useMessage();
  const [services, setServices] = useState<Service[]>([]);
  const mainService = MainService.init();

  function fetchServices() {
    addL('fetch-services');
    mainService
      .getCatalogs()
      .finally(() => {
        removeL('fetch-services');
      })
      .then((data) => {
        setServices(data);
      })
      .catch(() => {
        message.error('مشکلی در دریافت اطلاعات وجود دارد.');
      });
  }

  useEffect(() => {
    fetchServices();
  }, []);

  const servicesSlides = useMemo(() => {
    return services.map((service, idx) => (
      <SwiperSlide key={idx} className="!w-fit">
        <ServiceCard {...service} />
      </SwiperSlide>
    ));
  }, [services]);

  return (
    <>
      <Head>
        <title>کاتالوگ - منوما</title>
      </Head>
      <FlexBox
        justify="between"
        direction="column"
        className="min-h-screen pt-[4.34rem]"
      >
        <FlexItem>
          <FlexBox direction="column">
            <FlexItem>
              <FlexBox
                direction="column"
                alignItems="center"
                className="gap-[1.03rem]"
              >
                <FlexItem>
                  <Logo />
                </FlexItem>
                <FlexItem className="text-typography text-[.862rem]">
                  پلتفرم مدیریت، مقایسه و تعامل آنلاین با کافه ها و رستوران ها
                </FlexItem>
              </FlexBox>
            </FlexItem>
            <FlexItem className="mt-[2.7rem]">
              <Section
                title="خدمات منوما"
                contentClassNames="pt-[1.3rem]"
                className="text-typography text-[1rem]]"
                centerTitle
              >
                <Swiper
                  slidesPerView={'auto'}
                  slidesOffsetBefore={24}
                  slidesOffsetAfter={24}
                  spaceBetween={16}
                >
                  {servicesSlides}
                </Swiper>
              </Section>
            </FlexItem>
            <FlexItem className="mt-[2.7rem]">
              <Section
                title="همین حالا به منوما بپیوندید!"
                contentClassNames="px-[2.07rem] pt-[1.03rem]"
                className="text-typography text-[1rem]]"
                centerTitle
              >
                <Button className="py-[.8rem] px-[2rem] text-[1.2rem] w-full md:w-fit md:mx-auto rounded-[1.03rem]">
                  <Link href="/register_form" className="w-full">
                    درخواست منوی رایگان
                  </Link>
                </Button>
              </Section>
            </FlexItem>
            <FlexItem className="my-[2.7rem]">
              <Section
                title="مشاوره"
                contentClassNames="text-center"
                className="text-typography text-[1rem]]"
                centerTitle
              >
                <FlexBox gap={2} direction="column" alignItems="center">
                  <FlexItem className="text-typography text-[.862rem]">
                    جهت دریافت مشاوره با شماره زیر تماس بگیرید:
                  </FlexItem>
                  <FlexItem>
                    <Link
                      href="tel:09999924319"
                      target="_blank"
                      className="font-bold"
                    >
                      09999924319
                    </Link>
                  </FlexItem>
                </FlexBox>
              </Section>
            </FlexItem>
          </FlexBox>
        </FlexItem>
        <FlexItem>
          <Footer />
        </FlexItem>
      </FlexBox>
    </>
  );
}

export default CatalogPage;

const ServiceCard: FC<Service> = (service) => {
  const labels = useMemo(() => {
    return service.label
      ?.split(',')
      .filter(Boolean)
      .map((label, idx) => (
        <FlexItem
          key={idx}
          className="py-[.34rem] px-[1.64rem] font-bold rounded-[.689rem] bg-green-600/[.1] text-green-700 text-[.689rem]"
        >
          {label.trim()}
        </FlexItem>
      ));
  }, []);

  return (
    <FlexBox
      className={twMerge(
        classNames(
          ' w-[14rem] h-[23rem] bg-white rounded-[1.37rem] p-[1.38rem] border border-gray-300 !justify-between',
        ),
      )}
      alignItems="center"
      direction="column"
      gap={2}
    >
      <FlexItem grow>
        <FlexBox
          direction="column"
          alignItems="center"
          className={twMerge(classNames('gap-[.95rem] h-full'))}
        >
          <FlexItem className="relative w-[7rem] h-[7rem] rounded-[.625rem] overflow-hidden">
            {service.image && (
              <Image
                fill
                alt={service.title}
                src={`${serverBaseUrl}/storage/${service.image}`}
              />
            )}
          </FlexItem>
          <FlexItem className="text-[1rem] text-typography text-center font-semibold">
            {service.title}
          </FlexItem>
          <FlexItem
            className="text-[.689rem] text-typography text-center font-light"
            grow
          >
            {service.short_description}
          </FlexItem>
          <FlexItem>
            <FlexBox gap={2} justify="center">
              {labels}
            </FlexBox>
          </FlexItem>
        </FlexBox>
      </FlexItem>
      <FlexItem>
        <Button type="ghost" color="primary">
          <Link href={`/catalog/${service.id}`} className="w-full">
            اطلاعات بیشتر
          </Link>
        </Button>
      </FlexItem>
    </FlexBox>
  );
};

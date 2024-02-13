'use client';
import { Button } from '@/components/common/button';
import { FlexBox } from '@/components/common/flex_box/flex_box';
import { FlexItem } from '@/components/common/flex_item/flex_item';
import { useCustomRouter, useLoadings, useMessage } from '@/utils/hooks';
import React, { FC, useEffect, useMemo, useState } from 'react';
import classNames from 'classnames';
import { twMerge } from 'tailwind-merge';
import Image from 'next/image';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import { MainService } from '@/services/main/main.service';
import { Footer } from '@/components/core/footer/footer';
import { Logo } from '@/components/common/logo';
import Head from 'next/head';
import { ArrowBackIcon } from '@/icons/arrow-back';
import tailwindConfig from '@/tailwind.config';
import resolveConfig from 'tailwindcss/resolveConfig';
import { useRouter } from 'next/router';
import { Section } from '@/components/common/section/section';
import Link from '@/components/common/link/link';
import { Catalog } from '@/services/main/main';
import { useParams } from 'next/navigation';

type Service = Catalog;

const ServicePage: FC = () => {
  const resolvedTailwindConfig = resolveConfig(tailwindConfig);
  const router = useCustomRouter();
  const params = useParams();
  const [addL, removeL] = useLoadings();
  const message = useMessage();
  const [service, setService] = useState<Service>();
  const mainService = MainService.init();

  function fetchService() {
    addL('fetch-service');
    mainService
      .getCatalog(params?.uuid as string)
      .finally(() => {
        removeL('fetch-service');
      })
      .then((data) => {
        setService(data.data);
      })
      .catch(() => {
        message.error('مشکلی در دریافت اطلاعات وجود دارد.');
      });
  }

  useEffect(() => {
    if (params?.uuid) fetchService();
  }, [params]);
  const labels = useMemo(() => {
    return service?.labels.filter(Boolean).map((label, idx) => (
      <FlexItem
        key={idx}
        className="py-[.34rem] px-[1.64rem] font-bold rounded-[.689rem] bg-green-600/[.1] text-green-700 text-[.800rem]"
      >
        {label.label?.trim()}
      </FlexItem>
    ));
  }, [service?.labels]);

  return (
    <>
      <Head>
        <title>{service?.title} - منوما</title>
      </Head>
      <FlexBox
        className="pt-[2.5rem] px-[2rem] min-h-screen"
        direction="column"
        justify="between"
      >
        <FlexItem>
          <FlexBox direction="column">
            <FlexItem className="mx-auto">
              <Logo />
            </FlexItem>
            <FlexItem className="mt-[2rem]">
              <FlexBox
                className={twMerge(
                  classNames(
                    'max-w-lg mx-auto bg-white rounded-[1.37rem] p-[1.38rem] border border-gray-300  !justify-between',
                  ),
                )}
                direction="column"
                gap={2}
              >
                <FlexItem>
                  <FlexBox
                    direction="column"
                    className={twMerge(classNames('gap-[.95rem] h-full'))}
                  >
                    <FlexItem>
                      <FlexBox justify="end">
                        <FlexItem>
                          <FlexBox
                            onClick={() => router.back()}
                            alignItems="center"
                            className="rounded-lg bg-typography/[.05] px-[.5rem] pr-[1rem] py-1 cursor-pointer"
                          >
                            <FlexItem className="text-typography">
                              بازگشت
                            </FlexItem>
                            <FlexItem>
                              <ArrowBackIcon
                                color={resolvedTailwindConfig.theme?.colors![
                                  'typography'
                                ].toString()}
                              />
                            </FlexItem>
                          </FlexBox>
                        </FlexItem>
                      </FlexBox>
                    </FlexItem>
                    <FlexItem className="relative w-[10rem] h-[10rem] rounded-[.625rem] overflow-hidden mx-auto">
                      {service?.image && (
                        <Image
                          fill
                          alt={service.title}
                          src={service.image_url}
                        />
                      )}
                    </FlexItem>
                    <FlexItem className="text-[1rem] text-typography text-center font-semibold">
                      {service?.title}
                    </FlexItem>
                    <FlexItem
                      className="text-[.862rem] text-typography text-center font-light"
                      grow
                      dangerouslySetInnerHTML={{
                        __html: service?.long_description || '',
                      }}
                    />
                    <FlexItem>
                      <FlexBox gap={2} justify="center" className="flex-wrap">
                        {labels}
                      </FlexBox>
                    </FlexItem>
                  </FlexBox>
                </FlexItem>
              </FlexBox>
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
};

export default ServicePage;

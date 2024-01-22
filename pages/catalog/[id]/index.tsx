import { Button } from '@/components/common/button';
import { FlexBox } from '@/components/common/flex_box/flex_box';
import { FlexItem } from '@/components/common/flex_item/flex_item';
import {
  useCustomParams,
  useLoadings,
  useMessage,
  usePageLoading,
} from '@/utils/hooks';
import React, { FC, useEffect, useMemo, useState } from 'react';
import classNames from 'classnames';
import { twMerge } from 'tailwind-merge';
import Image from 'next/image';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import { serverBaseUrl } from '@/utils/axios';
import { MainService } from '@/services/main/main.service';
import { Footer } from '@/components/core/footer/footer';
import { Logo } from '@/components/common/logo';
import Head from 'next/head';
import { ArrowBackIcon } from '@/icons/arrow-back';
import tailwindConfig from '@/tailwind.config';
import resolveConfig from 'tailwindcss/resolveConfig';
import { useRouter } from 'next/router';

type Service = Catalog;

const ServicePage: FC = () => {
  const resolvedTailwindConfig = resolveConfig(tailwindConfig);
  const router = useRouter();
  usePageLoading();
  const params = useCustomParams();
  const [addL, removeL] = useLoadings();
  const message = useMessage();
  const [service, setService] = useState<Service>();
  const mainService = MainService.init();

  function fetchService() {
    addL('fetch-service');
    mainService
      .getCatalog(params.id as string)
      .finally(() => {
        removeL('fetch-service');
      })
      .then((data) => {
        setService(data);
      })
      .catch(() => {
        message.error('مشکلی در دریافت اطلاعات وجود دارد.');
      });
  }

  useEffect(() => {
    if (params.id) fetchService();
  }, [params]);
  const labels = useMemo(() => {
    return service?.label
      ?.split(',')
      .filter(Boolean)
      .map((label, idx) => (
        <FlexItem
          key={idx}
          className="py-[.34rem] px-[1.64rem] font-bold rounded-[.689rem] bg-green-600/[.1] text-green-700 text-[.800rem]"
        >
          {label?.trim()}
        </FlexItem>
      ));
  }, [service?.label]);

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
                            alignItems="center"
                            className="rounded bg-typography/[.1] pr-[.5rem] py-1 cursor-pointer"
                          >
                            <FlexItem
                              className="text-typography"
                              onClick={() => router.back()}
                            >
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
                          src={`${serverBaseUrl}/storage/${service.image}`}
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

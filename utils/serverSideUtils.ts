import { IProfile } from '@/app/(cafe_restaurant)/[slug]/(cafe)/types';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { QueryClient } from 'react-query';
import { axios } from './axios';
import _ from 'lodash';
import { BusinessService } from '@/services/business/business.service';

export const getSlugFromReq = (
  { req, params }: GetServerSidePropsContext,
  traillingSlash: boolean = true,
) => {
  const isNotMenuma = req.headers.isNotMenuma == '1';
  const slug = isNotMenuma ? `` : params?.slug;
  return traillingSlash && slug ? `${slug}/` : slug;
};

export const withCafeeShopProfile = (
  serverSidePropsFunc?: GetServerSideProps,
) => {
  return async (context: GetServerSidePropsContext) => {
    const businessService = BusinessService.init();
    function profileFetcher() {
      return businessService.get(context.params?.slug as string);
    }
    const profile = await profileFetcher();

    let getServerSidePropsRes;
    if (serverSidePropsFunc) {
      getServerSidePropsRes = serverSidePropsFunc(context);
      if (getServerSidePropsRes instanceof Promise) {
        getServerSidePropsRes = await getServerSidePropsRes;
      }
    }

    return _.merge(
      {
        props: {
          profile: profile.data,
        },
      },
      getServerSidePropsRes,
    );
  };
};

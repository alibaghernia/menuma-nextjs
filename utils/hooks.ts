import { LOADING_KEYS } from '@/providers/general/contants';
import { GeneralContext } from '@/providers/general/provider';
import { TransitionalOptions } from 'axios';
import { Url } from 'next/dist/shared/lib/router/router';
import Error from 'next/error';
import { useRouter } from 'next/router';
import { nextTick } from 'process';
import { useContext, useEffect, useMemo } from 'react';
import { TransitionOptions } from './page_hooks_types';
import { Grid } from 'antd/lib';
import tailwindConfig from '@/tailwind.config';
import resolveConfig from 'tailwindcss/resolveConfig';

export const useLoadings = () => {
  const { addLoading, removeLoading } = useContext(GeneralContext);
  return [addLoading, removeLoading];
};
export const useMessage = () => {
  const { messageApi } = useContext(GeneralContext);
  return messageApi;
};
export const useNotification = () => {
  const { notificationApi } = useContext(GeneralContext);
  return notificationApi;
};

export const usePageLoading = () => {
  const router = useRouter();
  const { removeLoading, addLoading } = useContext(GeneralContext);
  useEffect(() => {
    nextTick?.(() => {
      removeLoading(LOADING_KEYS.pageLoading);
    });
  }, [router]);
};

export const useCustomRouter = () => {
  const router = useRouter();
  const { removeLoading, addLoading } = useContext(GeneralContext);
  useEffect(() => {
    nextTick?.(() => {
      removeLoading(LOADING_KEYS.pageLoading);
    });
  }, []);
  return {
    ...router,
    push(...props: [Url, Url?, TransitionOptions?]) {
      addLoading(LOADING_KEYS.pageLoading);

      return router.push(...props);
    },
    replace(...props: [Url, Url?, TransitionOptions?]) {
      addLoading(LOADING_KEYS.pageLoading);

      return router.replace(...props);
    },
  };
};

export const useCustomParams = () => {
  const { query: params } = useRouter();

  return params;
};

export const useCurrentBreakpoints = () => {
  const breakpoints = Grid.useBreakpoint();

  const currentBreakpoints = useMemo(
    () =>
      Object.entries(breakpoints)
        .filter(([, v]) => !!v)
        .map(([k]) => k),
    [breakpoints],
  );

  return {
    breakpoints: currentBreakpoints,
    isXs: currentBreakpoints.includes('xs'),
    isSm: currentBreakpoints.includes('sm'),
    isMd: currentBreakpoints.includes('md'),
    isLg: currentBreakpoints.includes('lg'),
    isXlg: currentBreakpoints.includes('xlg'),
    last: currentBreakpoints.slice(-1).toString(),
  };
};

export const useTailwindColor = (color: string) => {
  const resolvedTailwindConfig = resolveConfig(tailwindConfig);

  return resolvedTailwindConfig.theme?.colors![color].toString();
};

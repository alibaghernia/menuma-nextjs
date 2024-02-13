import { LOADING_KEYS } from '@/providers/general/contants';
import { GeneralContext } from '@/providers/general/provider';
import { useRouter } from 'next/navigation';
import { nextTick } from 'process';
import { useContext, useEffect, useMemo } from 'react';
import { Grid } from 'antd/lib';
import tailwindConfig from '@/tailwind.config';
import resolveConfig from 'tailwindcss/resolveConfig';
import { useRouteChangeContext } from '@/providers/routeChange/provider';
import { NavigateOptions } from 'next/dist/shared/lib/app-router-context.shared-runtime';

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

export const useCustomRouter = () => {
  const { onRouteChangeStart } = useRouteChangeContext();
  const router = useRouter();

  const push = (...params: [string, NavigateOptions?]) => {
    const { pathname, search, hash } = window.location;
    const hrefCurrent = `${pathname}${search}${hash}`;
    const hrefTarget = params[0] as string;
    console.log({
      hrefTarget,
      hrefCurrent,
    });
    if (hrefTarget !== hrefCurrent) {
      onRouteChangeStart();
    }
    router.push(...params);
  };
  const replace = (...params: [string, NavigateOptions?]) => {
    const { pathname, search, hash } = window.location;
    const hrefCurrent = `${pathname}${search}${hash}`;
    const hrefTarget = params[0] as string;
    if (hrefTarget !== hrefCurrent) {
      onRouteChangeStart();
    }
    router.replace(...params);
  };

  return {
    ...router,
    push,
    replace,
  };
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

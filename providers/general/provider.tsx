'use client';
import React, {
  createContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from 'react';
import { IGeneralContext, IGeneralProvider } from './types';
import { Flex, Spin, notification } from 'antd/lib';
import Title from 'antd/lib/typography/Title';
import { LOADING_KEYS } from './contants';
import dynamic from 'next/dynamic';
import { message } from 'antd/lib';
import { useRouter } from 'next/navigation';
import Loading from '@/components/common/loading/loading';
import useRouteChange from '../routeChange/hooks';
//@ts-ignore
export const GeneralContext = createContext<IGeneralContext>({});

export const GeneralProvider: IGeneralProvider = ({ children, ...props }) => {
  const [messageApi, contextHolder] = message.useMessage();
  const [notificationApi, notificationContextHolder] =
    notification.useNotification();
  const [loadings, setLoadings] = useState<string[]>([
    LOADING_KEYS.pageLoading,
  ]);

  const addLoading = (loading_id: string) => {
    setLoadings((loadings) => [...loadings, loading_id]);
  };
  const removeLoading = (loading_id: string) => {
    setLoadings((loadings) => loadings.filter((item) => item != loading_id));
  };
  useRouteChange({
    onRouteChangeStart: () => {
      setLoadings((loadings) =>
        Array.from(new Set([...loadings, LOADING_KEYS.pageLoading])),
      );
    },
    onRouteChangeComplete: () => {
      setLoadings((loadings) =>
        loadings.filter((loading) => loading != LOADING_KEYS.pageLoading),
      );
    },
  });

  return (
    <>
      {contextHolder}
      {notificationContextHolder}
      <GeneralContext.Provider
        value={{
          ...props,
          loadings,
          addLoading,
          removeLoading,
          messageApi,
          notificationApi,
        }}
      >
        {children}
      </GeneralContext.Provider>
      {!!loadings.length && <Loading />}
    </>
  );
};

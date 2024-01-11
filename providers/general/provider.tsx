import React, { createContext, useMemo, useReducer, useState } from 'react';
import { IGeneralContext, IGeneralProvider } from './types';
import { Flex, Spin, notification } from 'antd/lib';
import Title from 'antd/lib/typography/Title';
import { LOADING_KEYS } from './contants';
import dynamic from 'next/dynamic';
import { message } from 'antd/lib';
const Loading = dynamic(() => import('@/components/common/loading/loading'), {
  ssr: false,
});
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

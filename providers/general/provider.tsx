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
import { useRouter } from 'next/router';
const Loading = dynamic(() => import('@/components/common/loading/loading'), {
  ssr: false,
});
//@ts-ignore
export const GeneralContext = createContext<IGeneralContext>({});

export const GeneralProvider: IGeneralProvider = ({ children, ...props }) => {
  const [messageApi, contextHolder] = message.useMessage();
  const [notificationApi, notificationContextHolder] =
    notification.useNotification();
  const router = useRouter();
  const [loadings, setLoadings] = useState<string[]>([
    LOADING_KEYS.pageLoading,
  ]);

  const addLoading = (loading_id: string) => {
    setLoadings((loadings) => [...loadings, loading_id]);
  };
  const removeLoading = (loading_id: string) => {
    setLoadings((loadings) => loadings.filter((item) => item != loading_id));
  };

  useEffect(() => {
    const handleHashChangeStart = () => {
      addLoading(LOADING_KEYS.pageLoading);
    };
    const handleHashChangeComplete = () => {
      removeLoading(LOADING_KEYS.pageLoading);
    };
    router.events.on('hashChangeStart', handleHashChangeStart);
    router.events.on('hashChangeComplete', handleHashChangeComplete);
    router.events.on('routeChangeStart', handleHashChangeStart);
    router.events.on('routeChangeComplete', handleHashChangeComplete);
    return () => {
      router.events.off('hashChangeStart', handleHashChangeStart);
      router.events.off('hashChangeComplete', handleHashChangeComplete);
      router.events.off('routeChangeStart', handleHashChangeStart);
      router.events.off('routeChangeComplete', handleHashChangeComplete);
    };
  }, []);

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

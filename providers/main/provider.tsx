import React, {
  createContext,
  useCallback,
  useEffect,
  useReducer,
  useState,
} from 'react';
import { IProvider, IProviderState } from './types';
import reducer from './reducer';
import { INITIAL_STATE, REDUCER_KEYS } from './constants';
import _ from 'lodash';
import Functions from './functions';
import { useRouter } from 'next/router';
import { IConfirmModalProps } from '@/components/common/confirm_modal/types';
import { FlexBox } from '@/components/common/flex_box/flex_box';
import { FlexItem } from '@/components/common/flex_item/flex_item';
import dynamic from 'next/dynamic';
const ConfirmModal = dynamic(
  () => import('@/components/common/confirm_modal/confirm_modal'),
);
export const ProviderContext = createContext<{
  state: IProviderState;
  dispatch: (action: any) => void;
  functions: ReturnType<typeof Functions>;
  checkCartItemsExist: (products: APIProduct[]) => void;
  // @ts-ignore
}>({});

const localStoragekey = 'provider-storage-new-v3.0';

const Provider: IProvider = ({ children }) => {
  const { query: params } = useRouter();
  const [deletedCartItemsAlertModal, setDeletedCartItemsAlertModal] = useState<{
    names?: string[];
    ids: string[];
  }>({ ids: [], names: [] });
  const getLocalStorageKey = useCallback(() => {
    const slug = params.slug || 'menuma';
    return `${slug}-${localStoragekey}`;
  }, [params?.slug]);

  const storeReducerState = useCallback(
    (state: IProviderState) => {
      localStorage.setItem(getLocalStorageKey(), JSON.stringify(state));
    },
    [getLocalStorageKey],
  );

  const [state, dispatch] = useReducer(
    (state: IProviderState, action: any) => reducer(_.cloneDeep(state), action),
    INITIAL_STATE,
  );
  const functions = Functions(state, dispatch);

  const checkAppDomain = useCallback(() => {
    if (typeof window != 'undefined') {
      const location = window.location;
      const domain = location.host;
      const menumaDomain = process.env.NEXT_PUBLIC_MENUMA_DOMAIN;
      if (!menumaDomain) {
        console.log('Please check the menuma domain env');
        process.exit(1);
      }
      if (
        domain != menumaDomain &&
        !state.isNotMenuma &&
        !domain.startsWith('localhost') &&
        !domain.startsWith('192.168.') &&
        !domain.startsWith('test.')
      ) {
        dispatch({
          type: REDUCER_KEYS.UPDATE,
          data: {
            key: 'isNotMenuma',
            value: true,
          },
        });
      }
    }
  }, [state.isNotMenuma]);
  const getReducerState = useCallback(() => {
    const data = localStorage.getItem(getLocalStorageKey());
    if (!data) {
      dispatch({
        type: REDUCER_KEYS.SET_RESTORED_DATA,
      });
      return INITIAL_STATE;
    }

    // parse to json
    const parsedData = JSON.parse(data);

    dispatch({
      type: REDUCER_KEYS.RESTORE_DATA,
      data: parsedData,
    });
  }, [getLocalStorageKey]);
  useEffect(() => {
    if (!state.restored) return;
    storeReducerState(state);
  }, [state, storeReducerState]);

  useEffect(() => {
    getReducerState();
    checkAppDomain();
  }, [getReducerState, checkAppDomain]);

  function checkCartItemsExist(products: APIProduct[]) {
    const cartItems = state.cart;
    const deleteItems = cartItems.filter((item) =>
      products.some((product) => product.id == item.product.id),
    );
    setDeletedCartItemsAlertModal({
      names: Array.from(new Set(deleteItems.map((item) => item.product.title))),
      ids: deleteItems.map((item) => item.id),
    });
  }

  function handleDeleteNonExistsItems(items: any) {
    items.forEach((item: any) => {
      functions.cart.removeItem(item);
    });
    setDeletedCartItemsAlertModal({ ids: [] });
  }

  return (
    <>
      <ProviderContext.Provider
        value={{
          state,
          dispatch,
          functions,
          checkCartItemsExist,
        }}
      >
        {children}
      </ProviderContext.Provider>
      {!!deletedCartItemsAlertModal?.ids.length && (
        <ConfirmModal
          open
          dangerConfirm={false}
          dismissButton={false}
          onClose={() =>
            handleDeleteNonExistsItems(deletedCartItemsAlertModal.ids)
          }
          onConfirm={() =>
            handleDeleteNonExistsItems(deletedCartItemsAlertModal.ids)
          }
          confirmText="باشه"
        >
          <FlexBox direction="column" gap={2}>
            <FlexItem className="text-[.875rem] text-center">
              به دلیل اتمام موجودی آیتم های زیر از دفترچه سفارش حذف شدند
            </FlexItem>
            <FlexItem>
              <FlexBox direction="column" gap={2}>
                {deletedCartItemsAlertModal.names?.map((item, idx) => (
                  <div
                    key={idx}
                    className=" text-typography border rounded px-4 py-[.2rem] block w-full text-center"
                  >
                    {item}
                  </div>
                ))}
              </FlexBox>
            </FlexItem>
          </FlexBox>
        </ConfirmModal>
      )}
    </>
  );
};

export default Provider;

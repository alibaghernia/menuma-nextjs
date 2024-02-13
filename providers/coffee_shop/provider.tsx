'use client';
import React, {
  createContext,
  useEffect,
  useReducer,
  useRef,
  useState,
} from 'react';
import { IProvider, IProviderState } from './types';
import reducer from './reducer';
import { INITIAL_STATE } from './constants';
import _ from 'lodash';
import Functions from './functions';
import { useParams, usePathname, useSearchParams } from 'next/navigation';
import { toast } from 'react-toastify';
import moment from 'moment';
import { IConfirmModalProps } from '@/components/common/confirm_modal/types';
import { FlexBox } from '@/components/common/flex_box/flex_box';
import { FlexItem } from '@/components/common/flex_item/flex_item';
import { ConfirmModal } from '@/components/common/confirm_modal/confirm_modal';
import { BusinessService } from '@/services/business/business.service';
import { useCustomRouter, useLoadings, useMessage } from '@/utils/hooks';
import { Business } from '@/services/business/business';
import { TableEntity } from '@/services/business/tables/tables';

export const TABLE_NUMBER_METADATA_STORAGE_KEY = '-table-number-key-';

export const CoffeeShopProviderContext = createContext<{
  state: IProviderState;
  dispatch: (action: any) => void;
  functions: ReturnType<typeof Functions>;
  enableCancelGarsonCallInterval: () => void;
  disbleCancelGarsonCallInterval: () => void;
  handleCallGarson: () => void;
  cancelGarsonCallButton: boolean;
  businessService: BusinessService;
  // @ts-ignore
}>({});

const CoffeShopProvider: IProvider = ({ children, profile }) => {
  const getInitialState = () => {
    if (profile) {
      return _.merge(INITIAL_STATE, { profile });
    }
    return INITIAL_STATE as { profile: Business };
  };
  const [addL, removeL] = useLoadings();
  const message = useMessage();
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useCustomRouter();
  const path = usePathname();
  const [state, dispatch] = useReducer(
    (state: IProviderState, action: any) => reducer(_.cloneDeep(state), action),
    getInitialState(),
  );
  const businessService = BusinessService.init(params?.slug as string);
  const functions = Functions(state, dispatch);

  // garson call
  const [cancelGarsonCallButton, setCancelGarsonCallButton] = useState(false);
  let cancelGarsonCallButtonInterval = useRef<NodeJS.Timeout>();
  const [tableID, setTableID] = useState<string>('');
  const [callGarsonModal, setCallGarsonModal] = useState<IConfirmModalProps>();
  const tableIDStorageKey = `${
    state.profile.uuid
  }${TABLE_NUMBER_METADATA_STORAGE_KEY}${moment().format('YYYY/MM/DD HH')}`;
  const [table, setTable] = useState<TableEntity>();
  useEffect(() => {
    const tab_id = searchParams?.get('tab_id');
    if (tab_id) {
      setTableID(tab_id);
      localStorage.setItem(tableIDStorageKey, tab_id);
      router.replace(path!, undefined);
    }
  }, [searchParams, setTableID]);

  useEffect(() => {
    if (window) {
      const pagerRequest = localStorage.getItem('pager-request');
      if (pagerRequest) {
        const time = moment(pagerRequest);
        const sec = moment().diff(time, 'seconds');
        if (sec < 60) {
          enableCancelGarsonCallInterval(false, sec * 1000);
        }
      }
    }
  }, []);

  const enableCancelGarsonCallInterval = (isNew = false, duration = 60000) => {
    setCancelGarsonCallButton(true);
    if (window && isNew) {
      localStorage.setItem('pager-request', moment().toISOString());
    }
    cancelGarsonCallButtonInterval.current = setInterval(() => {
      localStorage.removeItem('pager-request');
      setCancelGarsonCallButton(false);
    }, duration);
  };

  const disbleCancelGarsonCallInterval = () => {
    clearInterval(cancelGarsonCallButtonInterval.current);
    localStorage.removeItem('pager-request');
    setCancelGarsonCallButton(false);
  };

  const handleCallGarson = async () => {
    const pagerAPI = businessService.pager();
    const handle = (uuid: string) => {
      addL('call-garson');
      if (!cancelGarsonCallButton) {
        pagerAPI
          .requestPager(uuid)
          .then((data) => {
            localStorage.setItem('pager-request-uuid', data.data.request_uuid);
            enableCancelGarsonCallInterval(true);
            setCallGarsonModal(undefined);
          })
          .finally(() => {
            removeL('call-garson');
          });
      } else {
        pagerAPI
          .cancelRequestPager(uuid)
          .then(() => {
            disbleCancelGarsonCallInterval();
            setCallGarsonModal(undefined);
          })
          .finally(() => {
            removeL('call-garson');
          });
      }
    };
    const storageTableID = localStorage.getItem(tableIDStorageKey);
    if (storageTableID) {
      setTableID(storageTableID);
      const showModal = (table: TableEntity) => {
        setCallGarsonModal({
          open: true,
          title: cancelGarsonCallButton
            ? 'لغو درخواست گارسون'
            : 'تایید درخواست گارسون',
          content: (
            <FlexBox direction="column">
              <FlexItem className="text-center">آیا مطمئن هستید؟</FlexItem>
              <FlexItem className="text-center">میز: {table.code}</FlexItem>
            </FlexBox>
          ),
          dangerConfirm: cancelGarsonCallButton,
          onClose() {
            setCallGarsonModal(undefined);
          },
          onConfirm() {
            if (cancelGarsonCallButton) {
              const request_uuid = localStorage.getItem('pager-request-uuid');
              if (request_uuid) handle(request_uuid);
            } else handle(table.uuid);
          },
        });
      };
      if (table) showModal(table);
      else {
        addL('get-table');
        businessService.tableService
          .get(storageTableID)
          .then(({ data: table }) => {
            showModal(table);
            setTable(table);
          })
          .catch(() => {
            toast.error('خطا در دریافت اطلاعات میز');
          })
          .finally(() => {
            removeL('get-table');
          });
      }
    } else {
      setCallGarsonModal({
        open: true,
        title: 'درخواست گارسون',
        content: (
          <div className="text-center">
            برای استفاده از این قابلیت لطفا ابتدا QRCode روی میز را اسکن کنید
          </div>
        ),
        dangerConfirm: false,
        confirmText: 'باشه',
        dismissButton: false,
        onClose() {
          setCallGarsonModal(undefined);
        },
        onConfirm() {
          setCallGarsonModal(undefined);
        },
      });
    }
  };

  return (
    <>
      <CoffeeShopProviderContext.Provider
        value={{
          state,
          dispatch,
          functions,
          enableCancelGarsonCallInterval,
          disbleCancelGarsonCallInterval,
          handleCallGarson,
          cancelGarsonCallButton,
          businessService,
        }}
      >
        {children}
      </CoffeeShopProviderContext.Provider>
      {callGarsonModal && <ConfirmModal {...callGarsonModal} />}
    </>
  );
};

export default CoffeShopProvider;

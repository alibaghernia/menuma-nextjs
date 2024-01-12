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
import { useSearchParams } from 'next/navigation';
import { toast } from 'react-toastify';
import { useSlug } from '../main/hooks';
import moment from 'moment';
import { IConfirmModalProps } from '@/components/common/confirm_modal/types';
import { FlexBox } from '@/components/common/flex_box/flex_box';
import { FlexItem } from '@/components/common/flex_item/flex_item';
import { ConfirmModal } from '@/components/common/confirm_modal/confirm_modal';
import { useRouter } from 'next/router';
import { BusinessService } from '@/services/business/business.service';
import { useLoadings, useMessage } from '@/utils/hooks';

export const TABLE_NUMBER_METADATA_STORAGE_KEY = '-table-number-key-';

export const CoffeeShopProviderContext = createContext<{
  state: IProviderState;
  dispatch: (action: any) => void;
  functions: ReturnType<typeof Functions>;
  enableCancelGarsonCallInterval: () => void;
  disbleCancelGarsonCallInterval: () => void;
  handleCallGarson: () => void;
  cancelGarsonCallButton: boolean;
  // @ts-ignore
}>({});

const CoffeShopProvider: IProvider = ({ children, profile }) => {
  const getInitialState = () => {
    if (profile) {
      return _.merge(INITIAL_STATE, { profile });
    }
    return INITIAL_STATE;
  };
  const [addL, removeL] = useLoadings();
  const message = useMessage();
  const { query: params } = useRouter();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [state, dispatch] = useReducer(
    (state: IProviderState, action: any) => reducer(_.cloneDeep(state), action),
    getInitialState(),
  );
  const businessService = BusinessService.init();
  const functions = Functions(state, dispatch);

  // garson call
  const [cancelGarsonCallButton, setCancelGarsonCallButton] = useState(false);
  let cancelGarsonCallButtonInterval = useRef<NodeJS.Timeout>();
  const [tableID, setTableID] = useState<string>('');
  const [callGarsonModal, setCallGarsonModal] = useState<IConfirmModalProps>();
  const tableIDStorageKey = `${
    state.profile.id
  }${TABLE_NUMBER_METADATA_STORAGE_KEY}${moment().format('YYYY/MM/DD HH')}`;
  const [table, setTable] = useState<TableType>();
  useEffect(() => {
    const tab_id = searchParams.get('tab_id');
    if (tab_id) {
      setTableID(tab_id);
      localStorage.setItem(tableIDStorageKey, tab_id);
      const path = router.asPath.substring(0, router.asPath.indexOf('?'));
      router.replace(path, undefined);
    }
  }, [searchParams, setTableID]);

  function profileFetcher() {
    addL('fetch-business');
    businessService
      .get(params.slug as string)
      .then()
      .finally(() => removeL('fetch-business'))
      .then((data) => {
        functions.setProfile(data);
      })
      .catch(() => {
        message.error('خطا در دریافت اطلاعات کافه');
      });
  }

  useEffect(() => {
    if (params.slug) profileFetcher();
  }, []);

  const enableCancelGarsonCallInterval = () => {
    setCancelGarsonCallButton(true);
    cancelGarsonCallButtonInterval.current = setInterval(() => {
      setCancelGarsonCallButton(false);
    }, 60000);
  };

  const disbleCancelGarsonCallInterval = () => {
    clearInterval(cancelGarsonCallButtonInterval.current);
    setCancelGarsonCallButton(false);
  };

  const handleCallGarson = async () => {
    const handle = (tableID: string) => {
      addL('call-garson');
      if (!cancelGarsonCallButton) {
        functions.services
          .callGarson(tableID)
          .then(() => {
            enableCancelGarsonCallInterval();
            setCallGarsonModal(undefined);
          })
          .finally(() => {
            removeL('call-garson');
          });
      } else {
        functions.services
          .cancelCallGarson(tableID)
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
      const showModal = (table: TableType) => {
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
            handle(storageTableID);
          },
        });
      };
      if (table) showModal(table);
      else {
        addL('get-table');
        functions.services
          .geTable(storageTableID)
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
        }}
      >
        {children}
      </CoffeeShopProviderContext.Provider>
      {callGarsonModal && <ConfirmModal {...callGarsonModal} />}
    </>
  );
};

export default CoffeShopProvider;

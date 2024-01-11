import React, {
  createContext,
  useContext,
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
import { axios } from '@/utils/axios';
import { useParams, useSearchParams } from 'next/navigation';
import { useQuery } from 'react-query';
import { IProfile } from '@/pages/[slug]/types';
import { ProviderContext } from '../main/provider';
import { toast } from 'react-toastify';
import { useSlug } from '../main/hooks';
import moment from 'moment';
import { IConfirmModalProps } from '@/components/common/confirm_modal/types';
import { FlexBox } from '@/components/common/flex_box/flex_box';
import { FlexItem } from '@/components/common/flex_item/flex_item';
import classNames from 'classnames';
import { ConfirmModal } from '@/components/common/confirm_modal/confirm_modal';
import { useRouter } from 'next/router';

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

  const { setLoading, state: mainState } = useContext(ProviderContext);
  const { query: params } = useRouter();
  const searchParams = useSearchParams();
  const router = useRouter();
  const slug = useSlug(false);
  const [state, dispatch] = useReducer(
    (state: IProviderState, action: any) => reducer(_.cloneDeep(state), action),
    getInitialState(),
  );
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

  function profileFetcher(): Promise<IProfile> {
    return axios
      .get<IProfile>(`/api/cafe-restaurants/${params.slug}`)
      .then(({ data }) => data);
  }

  const fetchProfileKey = `fetch-profile-${slug}`;

  const { isSuccess, data, refetch, isFetched, isError } = useQuery({
    queryKey: fetchProfileKey,
    queryFn: profileFetcher,
    enabled: false,
    retry: 2,
    cacheTime: 5 * 60 * 1000,
  });

  useEffect(() => {
    if (isSuccess) {
      functions.setProfile(data);
    }
  }, [isSuccess, data]);

  useEffect(() => {
    // if (!state.profile || params?.slug != state.profile.slug && !profile) {
    //     setLoading(true)
    //     refetch()
    // }
  }, [refetch, params, state, setLoading, profile]);

  useEffect(() => {
    if (isSuccess) setLoading(false);
  }, [setLoading, isFetched, isSuccess]);

  useEffect(() => {
    if (isError) {
      toast.error('خطا در ارتباط با سرور');
    }
  }, [isError]);

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
      setLoading(true);
      if (!cancelGarsonCallButton) {
        functions.services
          .callGarson(tableID)
          .then(() => {
            enableCancelGarsonCallInterval();
            setCallGarsonModal(undefined);
          })
          .finally(() => {
            setLoading(false);
          });
      } else {
        functions.services
          .cancelCallGarson(tableID)
          .then(() => {
            disbleCancelGarsonCallInterval();
            setCallGarsonModal(undefined);
          })
          .finally(() => {
            setLoading(false);
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
        setLoading(true);
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
            setLoading(false);
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

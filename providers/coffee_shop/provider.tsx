import React, { createContext, useContext, useEffect, useReducer, useRef, useState } from 'react'
import { IProvider, IProviderState } from './types';
import reducer from './reducer';
import { INITIAL_STATE } from './constants';
import _ from 'lodash'
import Functions from './functions';
import { axios } from '@/utils/axios';
import { useParams, useSearchParams } from 'next/navigation';
import { useQuery } from 'react-query';
import { IProfile } from '@/pages/[slug]/types';
import { ProviderContext } from '../main/provider';
import { toast } from 'react-toastify';
import { useSlug } from '../main/hooks';
import moment from 'moment'
import { IConfirmModalProps } from '@/components/common/confirm_modal/types';
import { FlexBox } from '@/components/common/flex_box/flex_box';
import { FlexItem } from '@/components/common/flex_item/flex_item';
import classNames from 'classnames';
import { useRouter } from 'next/router';
import { useLoadings } from '@/utils/hooks';
import dynamic from 'next/dynamic';

export const TABLE_NUMBER_METADATA_STORAGE_KEY = '-table-number-key-'
const ConfirmModal = dynamic(() => import('@/components/common/confirm_modal/confirm_modal'), {
    ssr: false
})
export const CoffeeShopProviderContext = createContext<{
    state: IProviderState,
    dispatch: (action: any) => void,
    functions: ReturnType<typeof Functions>
    enableCancelGarsonCallInterval: () => void,
    disbleCancelGarsonCallInterval: () => void,
    handleCallGarson: () => void,
    cancelGarsonCallButton: boolean,
    // @ts-ignore
}>({})


const CoffeShopProvider: IProvider = ({ children, profile }) => {
    const [addL, removeL] = useLoadings()
    const getInitialState = (): any => {
        if (profile) {
            return _.merge(INITIAL_STATE, { profile })
        }
        return INITIAL_STATE
    }

    const { state: mainState, } = useContext(ProviderContext)
    const params = useParams()
    const searchParams = useSearchParams()
    const router = useRouter()
    const slug = useSlug(false)
    const [state, dispatch] = useReducer((state: IProviderState, action: any) => reducer(_.cloneDeep(state), action), getInitialState())
    const functions = Functions(state, dispatch);

    // garson call
    const [cancelGarsonCallButton, setCancelGarsonCallButton] = useState(false)
    let cancelGarsonCallButtonInterval = useRef<NodeJS.Timeout>()
    const [tableID, setTableID] = useState<string>("")
    const [callGarsonModal, setCallGarsonModal] = useState<IConfirmModalProps>()
    const tableIDStorageKey = `${state.profile?.uuid}${TABLE_NUMBER_METADATA_STORAGE_KEY}${moment().format('YYYY/MM/DD HH')}`
    const pagerRequestStorageKey = `${state.profile?.uuid}-pager_request`
    const [table, setTable] = useState<TableType>()
    useEffect(() => {
        const tab_id = searchParams.get('tab_id')
        if (tab_id) {
            setTableID(tab_id)
            localStorage.setItem(tableIDStorageKey, tab_id)
            const path = router.asPath.substring(0, router.asPath.indexOf('?'))
            router.replace(path, undefined)
        }
    }, [searchParams, setTableID])

    function profileFetcher(): Promise<IProfile> {
        return axios.get<IProfile>(`/api/cafe-restaurants/${params.slug}`).then(({ data }) => data)
    }

    const fetchProfileKey = `fetch-profile-${slug}`

    const {
        isSuccess,
        data,
        refetch,
        isFetched,
        isError } = useQuery({
            queryKey: fetchProfileKey,
            queryFn: profileFetcher,
            enabled: false,
            retry: 2,
            cacheTime: 5 * 60 * 1000
        })

    useEffect(() => {
        if (isSuccess) {
            functions.setProfile(data)
        }
    }, [isSuccess, data])

    useEffect(() => {
        if (isError) {
            toast.error("خطا در ارتباط با سرور")
        }
    }, [isError])


    const enableCancelGarsonCallInterval = (sec: number = 60000) => {
        setCancelGarsonCallButton(true)
        cancelGarsonCallButtonInterval.current = setInterval(() => {
            setCancelGarsonCallButton(false)
        }, sec)
    }

    const disbleCancelGarsonCallInterval = () => {
        clearInterval(cancelGarsonCallButtonInterval.current)
        setCancelGarsonCallButton(false)
    }
    const getPagerRequestStoredInfo = () => {
        let callGarsonObj = localStorage.getItem(pagerRequestStorageKey)
        if (!callGarsonObj) return
        const parsedCallGarsonObj: { request_uuid: string, request_time: number } = JSON.parse(callGarsonObj as string);
        return parsedCallGarsonObj
    }
    const handleCallGarson = async () => {
        const handle = (tableID: string) => {
            addL('call-garson')
            if (!cancelGarsonCallButton) {
                functions.services.callGarson(tableID)
                    .then(({ data }) => {
                        localStorage.setItem(pagerRequestStorageKey, JSON.stringify({
                            request_uuid: data?.request_uuid,
                            request_time: moment().unix()
                        }))
                        enableCancelGarsonCallInterval()
                        setCallGarsonModal(undefined);
                    })
                    .finally(() => {
                        removeL('call-garson')
                    })
            } else {
                const request_info = getPagerRequestStoredInfo()
                if (!request_info) return
                functions.services.cancelCallGarson(request_info.request_uuid)
                    .then(() => {
                        disbleCancelGarsonCallInterval()
                        setCallGarsonModal(undefined);
                        localStorage.removeItem(pagerRequestStorageKey)
                    })
                    .finally(() => {
                        removeL('call-garson')
                    })
            }
        }
        const storageTableID = localStorage.getItem(tableIDStorageKey)
        if (storageTableID) {
            setTableID(storageTableID)
            const showModal = (table: TableType) => {
                setCallGarsonModal({
                    open: true,
                    title: cancelGarsonCallButton ? 'لغو درخواست گارسون' : 'تایید درخواست گارسون',
                    content: (
                        <FlexBox direction='column'>
                            <FlexItem className="text-center">
                                آیا مطمئن هستید؟
                            </FlexItem>
                            <FlexItem className="text-center">
                                میز: {table.code}
                            </FlexItem>
                        </FlexBox>
                    ),
                    dangerConfirm: cancelGarsonCallButton,
                    onClose() {
                        setCallGarsonModal(undefined);
                    },
                    onConfirm() {
                        handle(table.uuid)
                    },
                })
            }
            if (table) showModal(table)
            else {
                addL('call-garson')
                functions.services.geTable(storageTableID)
                    .then(({ data: table }) => {
                        showModal(table!)
                        setTable(table)
                    })
                    .catch(() => {
                        toast.error('خطا در دریافت اطلاعات میز')
                    })
                    .finally(() => {
                        removeL('call-garson')
                    })
            }
        }
        else {
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
            })
        }




    }

    const checkCallGarsonStatus = () => {
        const request_info = getPagerRequestStoredInfo()
        if (!request_info) return
        const request_time = request_info.request_time
        const diffSec = moment().unix() - request_time;
        if (diffSec < 60)
            enableCancelGarsonCallInterval(diffSec * 1000)
    }

    useEffect(() => {
        checkCallGarsonStatus()
    }, [])

    return (
        <>
            <CoffeeShopProviderContext.Provider value={{
                state,
                dispatch,
                functions,
                enableCancelGarsonCallInterval,
                disbleCancelGarsonCallInterval,
                handleCallGarson,
                cancelGarsonCallButton,
            }}>
                {children}
            </CoffeeShopProviderContext.Provider>
            {callGarsonModal && (
                <ConfirmModal
                    {...callGarsonModal}
                />
            )}
        </>
    )
}


export default CoffeShopProvider;
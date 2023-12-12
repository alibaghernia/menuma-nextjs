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
import { ConfirmModal } from '@/components/common/confirm_modal/confirm_modal';
import { useRouter } from 'next/router';

export const TABLE_NUMBER_METADATA_STORAGE_KEY = '-table-number-key-'

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

    const getInitialState = () => {
        if (profile) {
            return _.merge(INITIAL_STATE, { profile })
        }
        return INITIAL_STATE
    }
    const [cancelGarsonCallButton, setCancelGarsonCallButton] = useState(false)
    let cancelGarsonCallButtonInterval = useRef<NodeJS.Timeout>()
    const [tableNumber, setTableNumber] = useState(1)
    const [callGarsonModal, setCallGarsonModal] = useState<IConfirmModalProps>()

    const { setLoading, state: mainState, } = useContext(ProviderContext)
    const params = useParams()
    const searchParams = useSearchParams()
    const router = useRouter()
    const slug = useSlug(false)
    const [state, dispatch] = useReducer((state: IProviderState, action: any) => reducer(_.cloneDeep(state), action), getInitialState())
    const functions = Functions(state, dispatch);

    useEffect(() => {
        const tableNumberStorageKey = `${state.profile.id}${TABLE_NUMBER_METADATA_STORAGE_KEY}${moment().format('YYYY/MM/DD HH')}`
        const tab_num = searchParams.get('tab_num')
        if (tab_num) {
            setTableNumber(+tab_num)
            localStorage.setItem(tableNumberStorageKey, tab_num)
            router.push((mainState.isNotMenuma ? `/${state.profile.slug}` : '') + router.asPath.substring(0, router.asPath.indexOf('?')), undefined, { shallow: true })
        }
    }, [searchParams, setTableNumber])

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
        // if (!state.profile || params?.slug != state.profile.slug && !profile) {
        //     setLoading(true)
        //     refetch()
        // }
    }, [refetch, params, state, setLoading, profile])

    useEffect(() => {
        if (isSuccess)
            setLoading(false)
    }, [setLoading, isFetched, isSuccess])

    useEffect(() => {
        if (isError) {
            toast.error("خطا در ارتباط با سرور")
        }
    }, [isError])


    const enableCancelGarsonCallInterval = () => {
        setCancelGarsonCallButton(true)
        cancelGarsonCallButtonInterval.current = setInterval(() => {
            setCancelGarsonCallButton(false)
        }, 1000)
    }

    const disbleCancelGarsonCallInterval = () => {
        clearInterval(cancelGarsonCallButtonInterval.current)
        setCancelGarsonCallButton(false)
    }

    const handleCallGarson = () => {

        const handle = (tableNumber: number) => {
            setLoading(true)
            if (!cancelGarsonCallButton) {
                functions.services.callGarson(0)
                    .then(() => {
                        enableCancelGarsonCallInterval()
                    })
                    .finally(() => {
                        setLoading(false)
                    })
            } else {
                functions.services.cancelCallGarson(0)
                    .then(() => {
                        disbleCancelGarsonCallInterval()
                    })
                    .finally(() => {
                        setLoading(false)
                    })
            }
        }

        const tableNumberStorageKey = `${state.profile.id}${TABLE_NUMBER_METADATA_STORAGE_KEY}${moment().format('YYYY/MM/DD HH')}`
        const storageTableNumber = localStorage.getItem(tableNumberStorageKey)
        if (storageTableNumber) {
            setCallGarsonModal({
                open: true,
                title: 'تایید درخواست گارسون',
                content: (
                    <div className="text-center">
                        آیا مطمئن هستید؟
                    </div>
                ),
                dangerConfirm: false,
                onClose() {
                    setCallGarsonModal(undefined);
                },
                onConfirm() {
                    handle(+storageTableNumber)
                },
            })
        }
        else {
            setCallGarsonModal({
                open: true,
                title: 'تایید درخواست گارسون',
                content: (
                    <FlexBox direction='column'>
                        <FlexItem className='text-center'>
                            در صورت اطمینان لطفا شماره میز را  در فیلد زیر وارد نمایید وارد نمایید
                        </FlexItem>
                        <FlexItem className='mt-2'>
                            <input
                                type="number"
                                value={tableNumber}
                                onChange={({ target: { value } }) => { setTableNumber(Number(value)) }}
                                className={
                                    classNames(
                                        'outline-none bg-transparent placeholder:text-[.8rem] w-full text-typography  border rounded-full px-4 py-2 text-center',
                                    )
                                }
                                placeholder='شماره میز...'
                            />
                        </FlexItem>
                    </FlexBox>
                ),
                dangerConfirm: false,
                onClose() {
                    setCallGarsonModal(undefined);
                },
                onConfirm() {
                    handle(tableNumber)
                },
            })
        }




    }

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
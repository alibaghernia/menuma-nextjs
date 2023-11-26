import React, { createContext, useContext, useEffect, useReducer, useState } from 'react'
import { IProvider, IProviderState } from './types';
import reducer from './reducer';
import { INITIAL_STATE } from './constants';
import _ from 'lodash'
import Functions from './functions';
import { axios } from '@/utils/axios';
import { useParams } from 'next/navigation';
import { useQuery } from 'react-query';
import { IProfile } from '@/pages/[slug]/types';
import { ProviderContext } from '../main/provider';
import { toast } from 'react-toastify';

export const CoffeeShopProviderContext = createContext<{
    state: IProviderState,
    dispatch: (action: any) => void,
    functions: ReturnType<typeof Functions>
    // @ts-ignore
}>({})


const CoffeShopProvider: IProvider = ({ children }) => {
    const { setLoading, state: mainState, } = useContext(ProviderContext)
    const params = useParams()
    const [state, dispatch] = useReducer((state: IProviderState, action: any) => reducer(_.cloneDeep(state), action), INITIAL_STATE)
    const functions = Functions(state, dispatch);

    function profileFetcher(): Promise<IProfile> {
        return axios.get<IProfile>(`/api/cafe-restaurants/${params.slug}`).then(({ data }) => data)
    }

    const { isLoading, isSuccess, data, refetch, isFetching, isRefetching, status, isFetched, isError } = useQuery({ queryKey: `fetch-profile-${mainState.isNotMenuma ? `` : `${params?.slug}/`}`, queryFn: profileFetcher, enabled: false, retry: 2, cacheTime: 5 * 60 * 1000 })

    useEffect(() => {
        if (isSuccess) {
            functions.setProfile(data)
        }
    }, [isSuccess, data])

    useEffect(() => {
        if (!state.profile || params?.slug != state.profile.slug)
            refetch()
    }, [refetch, params, state, setLoading])

    useEffect(() => {
        setLoading(!isSuccess)
    }, [setLoading, isFetched, isSuccess])

    useEffect(() => {
        if (isError) {
            toast.error("خطا در ارتباط با سرور")
        }
    }, [isError])




    return (
        <>
            <CoffeeShopProviderContext.Provider value={{
                state,
                dispatch,
                functions
            }}>
                {children}
            </CoffeeShopProviderContext.Provider>
        </>
    )
}


export default CoffeShopProvider;
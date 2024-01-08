import React, { createContext, useCallback, useEffect, useMemo, useReducer, useState } from 'react'
import { IProvider, IProviderState } from './types';
import reducer from './reducer';
import { INITIAL_STATE, REDUCER_KEYS } from './constants';
import _ from 'lodash'
import functions from './functions';
import { useParams } from 'next/navigation';
import dynamic from 'next/dynamic';

const Loading = dynamic(() => import('@/components/common/loading/loading'), { ssr: false })

export const ProviderContext = createContext<{
    state: IProviderState,
    dispatch: (action: any) => void,
    functions: ReturnType<typeof functions>
    loading: boolean,
    setLoading: (state: boolean) => void
    // @ts-ignore
}>({})

const localStoragekey = "provider-storage-new-v3.0"

const Provider: IProvider = ({ children }) => {
    const [loading, setLoading] = useState(true)
    const params = useParams()
    // const setLoading = (loading: boolean) => {
    //     if (loading) {
    //         _setLoading(loadings => {
    //             const _loadings = [...loadings, 'loading']

    //             console.log({
    //                 _loadings
    //             });
    //             return _loadings
    //         })
    //     } else {
    //         _setLoading(loadings => {
    //             loadings.shift()
    //             console.log({
    //                 loadings
    //             });
    //             return loadings
    //         })
    //     }
    // }
    const getLocalStorageKey = useCallback(() => {
        const slug = params.slug || "menuma"
        return `${slug}-${localStoragekey}`
    }, [params?.slug])

    const storeReducerState = useCallback((state: IProviderState) => {
        localStorage.setItem(getLocalStorageKey(), JSON.stringify(state))
    }, [getLocalStorageKey])

    const [state, dispatch] = useReducer((state: IProviderState, action: any) => reducer(_.cloneDeep(state), action), INITIAL_STATE)

    const checkAppDomain = useCallback(() => {
        if (typeof window != "undefined") {
            const location = window.location
            const domain = location.host
            const menumaDomain = process.env.NEXT_PUBLIC_MENUMA_DOMAIN
            if (!menumaDomain) {
                console.log("Please check the menuma domain env");
                process.exit(1)
            }
            if (domain != menumaDomain && !state.isNotMenuma && !domain.startsWith("localhost") && !domain.startsWith("192.168.") && !domain.startsWith("test.")) {
                dispatch({
                    type: REDUCER_KEYS.UPDATE,
                    data: {
                        key: 'isNotMenuma',
                        value: true
                    }
                })
            }
        }
    }, [state.isNotMenuma])
    const getReducerState = useCallback(() => {
        const data = localStorage.getItem(getLocalStorageKey())
        if (!data) {
            dispatch({
                type: REDUCER_KEYS.SET_RESTORED_DATA,
            })
            return INITIAL_STATE
        }

        // parse to json
        const parsedData = JSON.parse(data)

        dispatch({
            type: REDUCER_KEYS.RESTORE_DATA,
            data: parsedData
        })
    }, [getLocalStorageKey])
    useEffect(() => {
        if (!state.restored) return
        storeReducerState(state)
    }, [state, storeReducerState])

    useEffect(() => {
        getReducerState()
        checkAppDomain()
    }, [getReducerState, checkAppDomain])

    const loadingMem = useMemo(() => loading && <Loading />, [loading])

    return (
        <>
            <ProviderContext.Provider value={{
                state,
                dispatch,
                functions: functions(state, dispatch),
                loading: loading,
                setLoading
            }}>
                {children}
            </ProviderContext.Provider>
            {loadingMem}
        </>
    )
}

export default Provider;
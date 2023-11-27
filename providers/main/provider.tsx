import React, { createContext, useEffect, useReducer, useState } from 'react'
import { IProvider, IProviderState } from './types';
import reducer from './reducer';
import { INITIAL_STATE, REDUCER_KEYS } from './constants';
import _ from 'lodash'
import functions from './functions';
import coffeeLoadingGIF from '@/assets/images/coffee_animation.gif'
import Image from 'next/image';
import { useRouter } from 'next/router';

export const ProviderContext = createContext<{
    state: IProviderState,
    dispatch: (action: any) => void,
    functions: ReturnType<typeof functions>
    loading: boolean,
    setLoading: (state: boolean) => void
    // @ts-ignore
}>({})

const localStoragekey = "menuma-provider-storage-new-v2.8"

const Provider: IProvider = ({ children }) => {
    const [loading, setLoading] = useState(true)

    function storeReducerState(state: IProviderState): void {
        localStorage.setItem(localStoragekey, JSON.stringify(state))
    }
    function checkAppDomain() {
        if (typeof window != "undefined") {
            const location = window.location
            const domain = location.host
            const menumaDomain = process.env.NEXT_PUBLIC_MENUMA_DOMAIN
            if (!menumaDomain) {
                console.log("Please check the menuma domain env");
                process.exit(1)
            }
            if (domain != menumaDomain && !state.isNotMenuma && !domain.startsWith("localhost")) {
                dispatch({
                    type: REDUCER_KEYS.UPDATE,
                    data: {
                        key: 'isNotMenuma',
                        value: true
                    }
                })
            }
        }
    }

    const [state, dispatch] = useReducer((state: IProviderState, action: any) => reducer(_.cloneDeep(state), action), INITIAL_STATE)

    function getReducerState() {
        const data = localStorage.getItem(localStoragekey)
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
    }
    useEffect(() => {
        if (!state.restored) return
        storeReducerState(state)
    }, [state])

    useEffect(() => {
        getReducerState()
        checkAppDomain()
    }, [])

    return (
        <>
            <ProviderContext.Provider value={{
                state,
                dispatch,
                functions: functions(state, dispatch),
                loading,
                setLoading
            }}>
                {children}
            </ProviderContext.Provider>
            {
                loading && (
                    <div className="fixed inset-0 bg-white z-50 ">
                        <Image width={coffeeLoadingGIF.width} height={coffeeLoadingGIF.height} alt='Loading' src={coffeeLoadingGIF.src} className='mx-auto absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]' />
                    </div>
                )
            }
        </>
    )
}

export default Provider;
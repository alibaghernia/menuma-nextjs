import React, { createContext, useEffect, useReducer, useState } from 'react'
import { IProvider, IProviderState } from './types';
import reducer from './reducer';
import { INITIAL_STATE, REDUCER_KEYS } from './constants';
import _ from 'lodash'
import functions from './functions';
import cofeeLoadingGIF from '@/assets/images/cofee_animation.gif'
import Image from 'next/image';

export const ProviderContext = createContext<{
    state: IProviderState,
    dispatch: (action: any) => void,
    functions: ReturnType<typeof functions>
    loading: boolean,
    setLoading: (state: boolean) => void
    // @ts-ignore
}>({})

const localStoragekey = "menuma-provider-storage"

const Provider: IProvider = ({ children }) => {
    const [loading, setLoading] = useState(true)

    function storeReducerState(state: IProviderState): void {
        localStorage.setItem(localStoragekey, JSON.stringify(state))
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
                        <Image width={cofeeLoadingGIF.width} height={cofeeLoadingGIF.height} alt='Loading' src={cofeeLoadingGIF.src} className='mx-auto absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]' />
                    </div>
                )
            }
        </>
    )
}


export default Provider;
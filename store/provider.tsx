import React, { createContext, useEffect, useReducer } from 'react'
import { IProvider, IProviderState } from './types';
import reducer from './reducer';
import { INITIAL_STATE, REDUCER_KEYS } from './constants';
import _ from 'lodash'
import functions from './functions';

export const ProviderContext = createContext<{
    state: IProviderState,
    dispatch: (action: any) => void,
    functions: ReturnType<typeof functions>
    // @ts-ignore
}>({})

const localStoragekey = "menuma-provider-storage"

const Provider: IProvider = ({ children }) => {

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
        <ProviderContext.Provider value={{
            state,
            dispatch,
            functions: functions(state, dispatch)
        }}>
            {children}
        </ProviderContext.Provider>
    )
}


export default Provider;
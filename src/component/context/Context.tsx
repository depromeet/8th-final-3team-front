import React, { createContext, Dispatch, useContext, useReducer } from 'react';

type State = {
    latitude: number;
    longitude: number;
};

type Action = { type: 'SET_LATITUDE'; latitude: number } | { type: 'SET_LONGITUDE'; longitude: number };

type ContextDispatch = Dispatch<Action>;

const Context = createContext<State>({ latitude: 0, longitude: 0 });
const DispatchContext = createContext<ContextDispatch>(() => null);

function reducer(state: State, action: Action): State {
    switch (action.type) {
        case 'SET_LATITUDE':
            return {
                ...state,
                latitude: action.latitude,
            };
        case 'SET_LONGITUDE':
            return {
                ...state,
                longitude: action.longitude,
            };
        default:
            throw new Error('Unhandled action');
    }
}

export function ContextProvider({ children }: { children: React.ReactNode }) {
    const [state, dispatch] = useReducer(reducer, {
        latitude: 0,
        longitude: 0,
    });

    return (
        <Context.Provider value={state}>
            <DispatchContext.Provider value={dispatch}>{children}</DispatchContext.Provider>
        </Context.Provider>
    );
}

export function useContextState(): State {
    return useContext(Context);
}

export function useContextDispatch(): ContextDispatch {
    return useContext(DispatchContext);
}

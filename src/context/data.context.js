import React, { createContext, useReducer, useEffect, useCallback, useState } from 'react'
import DataReducer from "./data.reducer";
import { mock } from "../components/mock-data";
import { mapChildren } from "../utils";
import * as actions from "./actions";

const init = {
    structure: null,
    active_options: [],
    location: []
}

export const Context = createContext();

export const ContextProvider = ({ children }) => {

    const [data, dispatch] = useReducer(DataReducer, init);  

    const setData = useCallback((structure) => {
        const section = structure.find((item) => item.type === "section");
        const section_data = mapChildren(section, structure)

        dispatch({
            type: actions.SET_STRUCTURE,
            payload: section_data
        });
    }, []);

    useEffect(() => {
        const response = mock.data.structure;
        setData(response);
    }, [setData]);


    return (
        <Context.Provider value={{
            data
        }}
        >
            {children}
        </Context.Provider>
    );
}
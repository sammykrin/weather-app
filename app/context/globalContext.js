"use client";

import axios from "axios";
import React, { createContext, useContext, useState, useEffect } from "react";

const GlobalContext = createContext();
const GlobalContextUpdate = createContext();

export const GlobalContextProvider = ({ children }) =>{
    const [ forecast, setForcecast ] = useState({});

    const fecthForcast = async () =>{
        try {
            const res = await axios.get("api/weather")

            setForcecast(res.data);
        } catch (error) {
            console.log("Error fetching forecast data: error.message");
        }
    };


    useEffect(() =>{
        fecthForcast();
    }, []);

    return(
        <GlobalContext.Provider value={{
            forecast,
        }}>
            <GlobalContextUpdate.Provider>
                {children}
            </GlobalContextUpdate.Provider>
        </GlobalContext.Provider>
    );
};

export const useGlobalContext = () => useContext(GlobalContext);
export const useGlobalContextUpdate = () => useContext(GlobalContextUpdate);

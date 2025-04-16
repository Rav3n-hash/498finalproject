"use client";
import { useState, createContext } from "react";

export const MyContext = createContext();
export function Provider({ children }) {
    const [userRole, setUserRole] = useState(-1);
    function upDateRole(data) {
        setUserRole(data);
    }

    const value1={userRole, upDateRole};

    return(
        <MyContext.Provider value={value1}>
            {children}
        </MyContext.Provider>
    );
}
"use client";
import { useState, useEffect, createContext } from "react";

export const MyContext = createContext();
export function Provider({ children }) {


//**************************VARIABLES****************************************** */
    const [userRole, setUserRole] = useState(-1);
    const [isLoggedIn, setIsLoggedIn] = useState(false);



//****************************USE EFFECT***************************************** */
    useEffect(() => {
        const logVal = sessionStorage.getItem("logged");
        if (logVal === "1") {
          setIsLoggedIn(true);
        }
      }, []);

//****************************FUNCTIONS***************************************** */
    function upDateRole(data) {
        setUserRole(data);
    }

    function updateLoggedIn(data){
        setIsLoggedIn(data);
    }

    function updateLogout(){
            sessionStorage.clear(); 
            setIsLoggedIn(false);
                sessionStorage.clear(); 
                setIsLoggedIn(false);
                setfName("");
                setlName("");
   }

   const contextValue = {
    userRole,
    isLoggedIn,
    updateLoggedIn,
    upDateRole, 
    updateLogout
  };
//*************************RETURN**************************************** */
    return(
        <MyContext.Provider value={contextValue}>
            {children}
        </MyContext.Provider>
    );
}
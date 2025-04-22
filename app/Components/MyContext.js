"use client";
import { useState, useEffect, createContext } from "react";
import { useRouter } from "next/navigation";
import { LoginUser, GetUsers, DeleteUser, UpdateUser, AddUser, GetUser, } from "../Service/UserRoutes";
import { GetItemsByUserId } from "../Service/ItemRoutes";
export const MyContext = createContext();
export function Provider({ children }) {


//**************************VARIABLES****************************************** */
    const [userRole, setUserRole] = useState(-1);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [fName, setfName]= useState("");
    const [lName, setlName]= useState("");
    const [email, setEmail]= useState("");
    const [pic, setPic]=useState("");
    const [companyname, setCompanyName]= useState("");
    const [userItems, setUserItems]=useState([]);
    const router = useRouter();


//****************************USE EFFECT***************************************** */
useEffect(() => {
    const logVal = sessionStorage.getItem("logged");
    if (logVal === "1") {
      setIsLoggedIn(true);
      setfName(sessionStorage.getItem("fName") || "");
      setlName(sessionStorage.getItem("lName") || "");
      setEmail(sessionStorage.getItem("email") || "");
      setPic(sessionStorage.getItem("pic") || "");
      setCompanyName(sessionStorage.getItem("companyname") || "");
    }
  }, []);
  

//****************************USER FUNCTIONS***************************************** */
    function upDateRole(data) {
        setUserRole(data);
    }

    function updateLoggedIn(data){
        setIsLoggedIn(data);
    }

    function updateLogout() {
        sessionStorage.clear();
        setIsLoggedIn(false);
        setfName("");
        setlName("");
        setEmail("");
        setPic("");
        setCompanyName("");
      }
      
   async function loginUser(email, password, setError) {
    try {
      const user = await LoginUser(email, password);
      if (user) {
        setIsLoggedIn(true);
        sessionStorage.setItem("userid", user.userid);
        sessionStorage.setItem("fName", user.firstname);
        sessionStorage.setItem("lName", user.lastname);
        sessionStorage.setItem("email", user.email);
        sessionStorage.setItem("pic", user.pic || "");
        sessionStorage.setItem("companyname", user.companyname || "");
        sessionStorage.setItem("logged", "1");


        setIsLoggedIn(true);
        setfName(user.firstname);
        setlName(user.lastname);
        setEmail(user.email);
        setPic(user.pic || "");
        setCompanyName(user.companyname || "");
        router.push("/");

      }
    } catch (err) {
      setError("Invalid email or password.");
    }
  }

  //*************************ITEM FUNCTIONS***************************************** */
  async function getUserItems(setError) {
    try {
      const userId = sessionStorage.getItem("userid");
      if (!userId) {
        setError && setError("User ID not found.");
        return;
      }
  
      const items = await GetItemsByUserId(userId);
      setUserItems(items);
    } catch (err) {
      console.error(err);
      setError && setError("Cannot get user's items from the database.");
    }
  }
  
  const contextValue = {
    userRole,isLoggedIn,fName,lName,email,pic,companyname,userItems,
    updateLoggedIn,upDateRole,updateLogout,loginUser,getUserItems,
  };
  
//*************************RETURN**************************************** */
    return(
        <MyContext.Provider value={contextValue}>
            {children}
        </MyContext.Provider>
    );
}
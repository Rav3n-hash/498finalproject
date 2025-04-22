"use client";
//Mycontext is for global
import { useState, useEffect, createContext } from "react";
import { useRouter } from "next/navigation";
import { LoginUser, GetUsers, DeleteUser, UpdateUser, AddUser, GetUser, } from "../Service/UserRoutes";
import { UpdateItem, DeleteItem } from "../Service/ItemRoutes";
import { GetItemsByUserId } from "../Service/ItemRoutes";
import { GetOrders, GetOrdersForSeller, DeleteOrder } from "../Service/OrderRoutes";
export const MyContext = createContext();
export function Provider({ children }) {


    //**************************VARIABLES****************************************** */
    //user variables
    const [userRole, setUserRole] = useState(-1);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [fName, setfName] = useState("");
    const [lName, setlName] = useState("");
    const [email, setEmail] = useState("");
    const [pic, setPic] = useState("");
    const [companyname, setCompanyName] = useState("");
    //item variables
    const [userItems, setUserItems] = useState([]);
    const [editItem, setEditItem] = useState(null);
    //order variables
    const [orderList, setOrderList] = useState([]);
    const [userOrders, setUserOrders] = useState([]);


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
    function updateLoggedIn(data) {
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

    //*************************ITEM FUNCTIONS******************************************* */
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
    async function updateItemInDB({ id, title, description, price, stock, image }) {
        try {
            const updatedItem = { id, title, description, price, stock, image };

            await UpdateItem(updatedItem);
            await getUserItems();         // refresh user's item list
            setEditItem(null);            // close the modal
        } catch (err) {
            console.error("Error saving item:", err);
        }
    }
    function handleEditItem(item) {
        setEditItem(item);
    }
    async function deleteItem(id) {
        try {
            await DeleteItem(id);
            const userId = sessionStorage.getItem("userid");
            const updated = await GetItemsByUserId(userId);

            setUserItems(updated);
        } catch (error) {
            console.error("Delete failed:", error);
        }
    }

    //**************************ORDER FUNCTIONS***************************************** */

    async function getOrders() {
      try {
        const userId = sessionStorage.getItem("userid");
        if (!userId) return;
    
        console.log("Fetching orders for user:", userId);
        const userOrders = await GetOrdersForSeller(userId);
    
        console.log("User's Orders:", userOrders);
        setUserOrders(userOrders);
      } catch (error) {
        console.error("Failed to get orders:", error);
      }
    }
    async function deleteOrder(id){
        try{
            await DeleteOrder(id);
            const userId= sessionStorage.getItem("userid");
            const updated = await GetOrdersForSeller(userId);

            setOrderList(updated);
        }catch(error){
            console.error("Delete failed:", error);
        }
    }







    const contextValue = {
        userRole, isLoggedIn, fName, lName, email, pic, companyname, userItems, editItem, setEditItem, deleteItem, orderList,getOrders,setOrderList,
        updateLoggedIn, upDateRole, updateLogout, loginUser, getUserItems, updateItemInDB, handleEditItem, getOrders,userOrders, deleteOrder,
    };

    //*************************RETURN**************************************** */
    return (
        <MyContext.Provider value={contextValue}>
            {children}
        </MyContext.Provider>
    );
}
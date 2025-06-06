"use client";
//Mycontext is for global
import { useState, useEffect, createContext } from "react";
import { useRouter } from "next/navigation";
import { LoginUser, GetUsers, DeleteUser, UpdateUser, AddUser, GetUser, } from "../Service/UserRoutes";
import { UpdateItem, DeleteItem } from "../Service/ItemRoutes";
import { GetItemsByUserId, GetItemsByCategory, GetItems, AddItem} from "../Service/ItemRoutes";
import { GetOrders, GetOrdersForSeller, DeleteOrder, AddOrder } from "../Service/OrderRoutes";
import GetCategories from "../Service/CategoryRoutes";
export const MyContext = createContext();
export function Provider({ children }) {


    //**************************VARIABLES****************************************** */
    const router = useRouter();
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
    //cart variables
    const [cart, setCart] = useState([]);



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
            setUserRole(parseInt(sessionStorage.getItem("role")) || -1);
            const rawCart = sessionStorage.getItem("cart");
            console.log("Raw cart from sessionStorage:", rawCart);
            setCart(JSON.parse(rawCart || "[]"));

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
        setUserRole(-1);
        

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
                sessionStorage.setItem("role", user.role);


                setIsLoggedIn(true);
                setfName(user.firstname);
                setlName(user.lastname);
                setEmail(user.email);
                setPic(user.pic || "");
                setCompanyName(user.companyname || "");
                setUserRole(user.role);
                //router.push("/");


            }
        } catch (err) {
            setError("Invalid email or password.");
        }
    }

    async function getAllUsers() {
        try {
            const users = await GetUsers();
            return users;
        } catch (err) {
            console.error("Failed to fetch users:", err);
            return [];
        }
    }

    async function addNewUser(user) {
        try {
            const newUser = await AddUser(user);  // pass user in
            return newUser;
        } catch (err) {
            console.error("Failed to add user:", err);
        }
    }

    async function deleteUser(id) {
        try {
            await DeleteUser(id);
        } catch (error) {
            console.error("Delete failed:", error);
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

    async function adminDelItem(id) {
        try {
            await DeleteItem(id);
        } catch (error) {
            console.error("Delete failed:", error);
        }
    }
    async function getItemsByCategory(catId) {
        try {
          const items = await GetItemsByCategory(catId);
          return items;
        } catch (err) {
          console.error("Failed to fetch items by category:", err);
          return [];
        }
      }
    async function getAllItems(){
        try {
            const items = await GetItems();
            return items;
          } catch (err) {
            console.error("Failed to fetch all items:", err);
            return [];
          } 
    }

    async function addNewItem(item) {
        try {
            const newItem = await AddItem(item);
            return newItem;
        } catch (err) {
            console.error("Failed to add user:", err);
        }
    }

    async function getAllCategories() {
        try {
            const items = await GetCategories(); 
            return items;
          } catch (err) {
            console.error("Failed to fetch all categories:", err);
            return [];
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
    async function deleteOrder(id) {
        try {
            await DeleteOrder(id);
            const userId = sessionStorage.getItem("userid");
            const updated = await GetOrdersForSeller(userId);

            setOrderList(updated);
        } catch (error) {
            console.error("Delete failed:", error);
        }
    }

    async function getAllOrders() {
        try {
            const orders = await GetOrders();
            return orders;
          } catch (err) {
            console.error("Failed to fetch all Orders:", err);
            return [];
          } 
    }
    async function getOrdersPendingOrSold() {
        //for users to view the orders that are pending or that they have sold
    }
    //***************************CART FUNCTIONS********************************************** */
    function updateCart(item) {
        try {
            let currentCart = JSON.parse(sessionStorage.getItem("cart")) || [];
            currentCart.push(item);
            sessionStorage.setItem("cart", JSON.stringify(currentCart));
            setCart(currentCart);
            alert("Added to cart: " + item.title);
        } catch (err) {
            console.error("Cart update failed:", err);
        }
    }
    function clearCart() {
        setCart([]);
        sessionStorage.removeItem("cart");
    }
    function removeItem(indexToRemove) {
        try {
            let currentCart = JSON.parse(sessionStorage.getItem("cart")) || [];
            const updatedCart = currentCart.filter((_, index) => index !== indexToRemove);
            sessionStorage.setItem("cart", JSON.stringify(updatedCart));
            setCart(updatedCart);
        } catch (err) {
            console.error("Failed to remove item from cart:", err);
        }
    }

    async function placeOrder() {
        try {
            const cart = JSON.parse(sessionStorage.getItem("cart") || "[]");
            const userId = parseInt(sessionStorage.getItem("userid"));

            if (!userId || cart.length === 0) {
                alert("Cannot place order: No items or user not logged in.");
                return;
            }

            if (cart.length > 3) {
                alert("Only up to 3 items can be ordered at once.");
                return;
            }

            const total = cart.reduce((sum, item) => sum + parseFloat(item.price), 0).toFixed(2);

            const payload = {
                userid: userId,
                item1: cart[0]?.id || null,
                item2: cart[1]?.id || null,
                item3: cart[2]?.id || null,
                price: total,
                orderdate: new Date().toISOString(),
            };

            await AddOrder(payload, userId);
            alert("Order placed!");
            sessionStorage.removeItem("cart");
            setCart([]); // <- make sure you have setCart in context

        } catch (error) {
            console.error("Place order failed:", error);
            alert("Something went wrong.");
        }
    }




    const contextValue = {
        userRole, isLoggedIn, fName, lName, email, pic, companyname, userItems, editItem, setEditItem, deleteItem, orderList, getOrders, setOrderList,
        updateLoggedIn, upDateRole, updateLogout, loginUser, getUserItems, updateItemInDB, handleEditItem, getOrders, userOrders, deleteOrder,
        getAllOrders, getOrdersPendingOrSold, updateCart, clearCart, setCart, removeItem, placeOrder, cart, getItemsByCategory,getAllItems, getAllUsers, addNewUser,
        addNewItem, getAllCategories, deleteUser, adminDelItem
    };

    //*************************RETURN**************************************** */
    return (
        <MyContext.Provider value={contextValue}>
            {children}
        </MyContext.Provider>
    );
}
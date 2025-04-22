"use server";
import { defaultConfig } from "next/dist/server/config-shared.js";
import pool from "./PoolConnection.js";

async function GetOrders() {
    try {
      const result = await pool.query("SELECT * FROM orders");
      return result.rows;
    } catch (error) {
      console.error("Error fetching orders:", error);
      throw error;
    }
  }

  async function DeleteOrder(orderId) {
    try {
      await pool.query("DELETE FROM orders WHERE orderid = $1", [orderId]);
    } catch (error) {
      console.error("Error deleting order:", error);
      throw error;
    }
  }

  async function AddOrder(order, userId) { //add new order and link it to logged in user
    try {
      const { item1, item2, item3, price, orderdate } = order;
  
      const qry = `
        INSERT INTO orders (userid, item1, item2, item3, price, orderdate)
        VALUES ($1, $2, $3, $4, $5, $6)
      `;
      const values = [userId, item1, item2, item3, price, orderdate];
  
      await pool.query(qry, values);
    } catch (error) {
      console.error("Error adding order:", error);
      throw error;
    }
  }

  async function GetOrdersForSeller(sellerId) { //this should be used to display relevant orders a seller needs to fulfill
    try {
      const qry = `
        SELECT * FROM orders
        WHERE item1 IN (SELECT itemid FROM items WHERE userid = $1)
           OR item2 IN (SELECT itemid FROM items WHERE userid = $1)
           OR item3 IN (SELECT itemid FROM items WHERE userid = $1)
      `;
      const result = await pool.query(qry, [sellerId]);
      return result.rows;
    } catch (error) {
      console.error("Error fetching seller's orders:", error);
      throw error;
    }
  }

export {GetOrders, DeleteOrder, AddOrder, GetOrdersForSeller}
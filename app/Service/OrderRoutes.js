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

  async function GetOrdersForSeller(userId) {
    try {
      const result = await pool.query(
        `SELECT 
        o.orderid, o.userid, o.price, o.orderdate,

        i1.itemid AS item1_id, i1.title AS item1_title, i1.description AS item1_description, i1.image AS item1_image, i1.quantityAvailable AS item1_stock,
        i2.itemid AS item2_id, i2.title AS item2_title, i2.description AS item2_description, i2.image AS item2_image, i2.quantityAvailable AS item2_stock,
        i3.itemid AS item3_id, i3.title AS item3_title, i3.description AS item3_description, i3.image AS item3_image, i3.quantityAvailable AS item3_stock

      FROM orders o
      LEFT JOIN items i1 ON o.item1 = i1.itemid
      LEFT JOIN items i2 ON o.item2 = i2.itemid
      LEFT JOIN items i3 ON o.item3 = i3.itemid
      WHERE o.userid = $1`,
        [userId]
      );
      return result.rows;
    } catch (error) {
      console.error("Error fetching orders by user ID:", error);
      return [];
    }
  }
  
  

export {GetOrders, DeleteOrder, AddOrder, GetOrdersForSeller}
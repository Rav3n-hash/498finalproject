"use server";
import pool from "./PoolConnection.js";

export async function GetItems() {
    try {
        const result = await pool.query(`
      SELECT 
  i.itemid AS id,
  i.title,
  i.description,
  i.price,                      
  i.quantityAvailable AS stock,
  i.image,
  c.category,
  CONCAT(u.firstname, '_', u.lastname) AS seller,
    u.companyName AS companyname
FROM items i
JOIN users u ON i.userID = u.userID
JOIN categories c ON i.catID = c.catID

    `);

        return result.rows.map(item => ({
            ...item,
            price: parseFloat(item.price)
        }));

    } catch (error) {
        console.error("Error fetching items from DB:", error);
        return [];
    }
}

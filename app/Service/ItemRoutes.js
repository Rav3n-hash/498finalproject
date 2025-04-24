"use server";
import pool from "./PoolConnection.js";

//Get all items
 async function GetItems() {
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

//Get items by userID
 async function GetItemsByUserId(userId) {
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
        WHERE i.userID = $1
      `, [userId]);
  
      return result.rows.map(item => ({
        ...item,
        price: parseFloat(item.price)
      }));
  
    } catch (error) {
      console.error("Error fetching items for user:", error);
      return [];
    }
  }

// update item by ID
async function UpdateItem(item) {
    try {
      const { id, title, description, price, stock, image } = item;
  
      const qry = `
        UPDATE items 
        SET 
          title = $1,
          description = $2,
          price = $3,
          quantityAvailable = $4,
          image = $5
        WHERE itemid = $6
      `;
  
      const values = [title, description, price, stock, image, id];
  
      const result = await pool.query(qry, values);
      console.log("Update result:", result.rowCount);
    } catch (error) {
      console.error("UpdateItem error:", error);
    }
  }
  
//delete item method

async function DeleteItem(id) {
    try {
      const qry = "DELETE FROM items WHERE itemid = $1";
      const result = await pool.query(qry, [id]);
      console.log("Deleted item with ID:", id);
      return result;
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  }
  
  //get items by category
  async function GetItemsByCategory(catId) {
    try {
      const result = catId === -1
        ? await pool.query(`
          SELECT 
            i.itemid AS id,
            i.title,
            i.description,
            i.price,
            i.quantityAvailable AS stock,
            i.image,
            c.catid,
            c.category,
            CONCAT(u.firstname, '_', u.lastname) AS seller,
            u.companyName AS companyname
          FROM items i
          JOIN users u ON i.userID = u.userID
          JOIN categories c ON i.catID = c.catID
        `)
        : await pool.query(`
          SELECT 
            i.itemid AS id,
            i.title,
            i.description,
            i.price,
            i.quantityAvailable AS stock,
            i.image,
            c.catid,
            c.category,
            CONCAT(u.firstname, '_', u.lastname) AS seller,
            u.companyName AS companyname
          FROM items i
          JOIN users u ON i.userID = u.userID
          JOIN categories c ON i.catID = c.catID
          WHERE i.catID = $1
        `, [catId]);
  
      return result.rows.map(item => ({
        ...item,
        price: parseFloat(item.price)
      }));
  
    } catch (error) {
      console.error("Error fetching items by category:", error);
      return [];
    }
  }
  
  export {GetItems, GetItemsByUserId, UpdateItem, DeleteItem, GetItemsByCategory}
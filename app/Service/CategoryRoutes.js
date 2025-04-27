"use server";
import pool from "./PoolConnection.js";

async function GetCategories()
{
  var result;
  try {
    result = await pool.query("SELECT * from categories");

  } catch (error) {
    console.error("Query error:", error);
  }
  let list = [];
  result.rows.map((tmp, index) => {
    var cat = { "catid": tmp.catid, "category": tmp.category };
    list.push(cat);
  })
  console.log(list);
  return list;

};
export default GetCategories;
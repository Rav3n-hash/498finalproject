// "use server";

// import pool from "./PoolConnection.js";

// //get books method
// async function GetBooks() {
//   var result;
//   try {
//     result = await pool.query("SELECT * from books");

//   } catch (error) {
//     console.error("Query error:", error);
//   }
//   let list = [];
//   result.rows.map((tmp, index) => {
//     var book = { "id": tmp.id, "title": tmp.title, "author": tmp.author, "price": tmp.price, "category_id": tmp.category_id };
//     list.push(book);
//   })
//   console.log(list);
//   return list;
// };

// //delete book method

// async function DeleteBook(id, setBooks, setLength) {
//   var result;
//   var qry = "Delete from books where id=" + id;
//   result = await pool.query(qry);

// }

// //update book method
// async function UpdateBook(book) {
//   var result;

//   try {
//     // var book=req.body;
//     var title = book.title;
//     var author = book.author;
//     var price = book.price;
//     var catid = book.category_id;
//     var id = book.id
//     var qry = "Update books set Author='" + author + "', title='" + title + "',price=" + price + ",category_id=" + catid + "where id=" + id;

//     console.log(qry);
//     result = await pool.query(qry);
//     console.log(result);

//   } catch (error) {
//     console.error("Query error:", error);
//   }
// };

// //add book method
// async function BookAdd(book) {
//   try {
//     var title = book.title;
//     var author = book.author;
//     var price = book.price;
//     var catid = book.category_id;

//     var qry = "Insert into books (title, author, price, category_id) VALUES ("
//       + "'" + title + "'," + "'" + author + "'," + price + "," + catid + ")";

//     console.log(qry);
//     const result = await pool.query(qry);
//     console.log(result);

//   } catch (error) {
//     console.error("Query error:", error);
//   }
// };

// // bookRouter.get("/getbook", async (req, res) => {
// //     try {
// //       var id1=req.query.id;
// //       console.log(id1);
// //       const result = await pool.query("select * from books where id="+id1);
// //       console.log(result);
// //       res.json({rows:result.rows});

// //     } catch (error) {
// //       console.error("Query error:", error);
// //       res.status(500).json({ error: "Database query failed" });     
// //     }
// //   });





// export { GetBooks, DeleteBook, UpdateBook, BookAdd };
"use server";
//these methods may not be correct for now!!!! just started with the template and need to test all user routes
import pool from "./PoolConnection.js";

//get all users method
async function GetUsers() {
  var result;
  try {
    result = await pool.query("SELECT * from users");

  } catch (error) {
    console.error("Query error:", error);
  }
  let list = [];
  result.rows.map((tmp, index) => {
    var user = { "userid": tmp.userid, "firstname": tmp.firstname, "lastname": tmp.lastname, "email": tmp.email, "pic": tmp.pic, "companyname": tmp.companyname };
    list.push(user);
  })
  console.log(list);
  return list;
};

// //delete user method

async function DeleteUser(userid) {
  var result;
  var qry = "Delete from users where userid=" + userid;
  result = await pool.query(qry);

}

// //update user method
async function UpdateUser(user) {
  var result;

  try {
    var firstname = user.firstname;
    var lastname = user.lastname;
    var email = user.email;
    var pic = user.pic;
    var companyname = user.companyname
    var qry = "Update users set firstname='" + firstname + "', lastname='" + lastname + "', email='" + email + "', pic ='" + pic + "' , companyname='" +companyname +"' where userid=" + userid;

    console.log(qry);
    result = await pool.query(qry);
    console.log(result);

  } catch (error) {
    console.error("Query error:", error);
  }
};

// //add user method
async function AddUser(user) {
  try {
    var firstname = user.firstname;
    var lastname = user.lastname;
    var email = user.email;
    var password = user.password;
    var pic = user.pic;
    var companyname = user.companyname

    var qry = "Insert into users (firstname, lastname, email, password, pic, companyname) VALUES ("
      + "'" + firstname + "'," + "'" + lastname + "'," + "'" + email + "'," + "'" + password + "'," + "'" + pic + "'," + "'" + companyname + "')";

    console.log(qry);
    const result = await pool.query(qry);
    console.log(result);

  } catch (error) {
    console.error("Query error:", error);
  }
};

//get user by id
async function GetUser(userid) {
    try {
      var id1=user.userid;
      const result = await pool.query("select * from users where userid="+id1);
      console.log(result);

    } catch (error) {
      console.error("Query error:", error);
    }
  };





export { GetUsers, DeleteUser, UpdateUser, AddUser, GetUser };
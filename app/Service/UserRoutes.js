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
    var user = { 
      "userid": tmp.userid, 
      "firstname": tmp.firstname, 
      "lastname": tmp.lastname, 
      "email": tmp.email, 
      "pic": tmp.pic, 
      "companyname": tmp.companyname, 
      "companydesc": tmp.companydesc  
    };
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
    var companydesc = user.companydesc;

    var qry = "Insert into users (firstname, lastname, email, password, pic, companyname, companydesc) VALUES ("
      + "'" + firstname + "'," + "'" + lastname + "'," + "'" + email + "'," + "'" + password + "'," + "'" + pic + "'," + "'" + companyname + "'," + "'" + companydesc + "')";

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


//login user
async function LoginUser(email, password) {
    try {
      var qry = `
        SELECT * FROM users 
        WHERE email = $1 AND password = $2
      `;
      const values = [email, password];
  
      const result = await pool.query(qry, values);
  
      if (result.rows.length === 0) {
        console.log("No user found");
        return null;
      }
  
      const user = result.rows[0];
      return user;
  
    } catch (error) {
      console.error("Login error:", error.message);
      throw error;
    }
  }


export { GetUsers, DeleteUser, UpdateUser, AddUser, GetUser, LoginUser };
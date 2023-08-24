const fs = require("fs");
const { pool } = require("../configdb/db");

//check if table exist before create one
const tableExists = async (tableName) => {
  try {
    const conn = await pool.getConnection();
    const [rows, fields] = await conn.execute(
      `SHOW TABLES LIKE '${tableName}'`
    );
    conn.release();
    return rows.length > 0;
  } catch (err) {
    console.error("Error checking if table exists:", err);
    return false;
  }
};

//create table user
const createTableUser = async () => {
  try {
    const connection = await pool.getConnection();
    await connection.beginTransaction();
    let checkUsertableExists = await tableExists("user");
    const user_table = checkUsertableExists
      ? null
      : await connection.query(`CREATE TABLE user (
      id INT NOT NULL AUTO_INCREMENT,
      admin VARCHAR(255) DEFAULT "no" ,
      firstName VARCHAR(255) NOT NULL,
      lastName VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      password VARCHAR(255) NOT NULL,
      telephone VARCHAR(255) NOT NULL,
      address VARCHAR(255) NOT NULL,
      token VARCHAR(1000) DEFAULT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      PRIMARY KEY (id),
      UNIQUE(email)
    ) AUTO_INCREMENT=100`);
  } catch (err) {
    console.error(err.message);
  }
};

const registerUser = async ({
  email,
  password,
  firstName,
  lastName,
  telephone,
  address,
  admin,
}) => {
  try {
    const connection = await pool.getConnection();
    await connection.beginTransaction();
    const register_query = `INSERT INTO user (email, password, firstName, lastName, telephone, address, admin) VALUES (?, ?, ?, ?, ?, ?, ?)`;
    const new_registered_user = await pool.query(register_query, [
      email,
      password,
      firstName,
      lastName,
      telephone,
      address,
      admin,
    ]);
    return new_registered_user[0].insertId;
  } catch (err) {
    if (err.code == "ER_DUP_ENTRY") err.message = "email already exist";
    throw err.message;
  }
};

const getUsers = async () => {
  try {
    const query = "SELECT * FROM user ORDER BY created_at DESC";
    const connection = await pool.getConnection();
    const [users] = await connection.query(query);
    await connection.release();

    return users;
  } catch (err) {
    throw err.message;
  }
};

const getUser = async (id) => {
  let connection = await pool.getConnection();
  (await connection).beginTransaction();
  let get_user = await connection.query(`SELECT * FROM user WHERE id = ${id}`);
  await connection.release();
  return get_user[0];
};

const getUserByEmail = async (email) => {
  let connection = await pool.getConnection();
  (await connection).beginTransaction();
  let get_user_by_email = await connection.query(
    `SELECT * FROM user WHERE email = '${email}'`
  );
  await connection.release();

  return get_user_by_email[0];
};

const updateUserToken = async (id, token) => {
  try {
    let connection = await pool.getConnection();
    (await connection).beginTransaction();
    const query = `UPDATE user SET token = ? WHERE id = ?`;
    await pool.query(query, [token, id]);
    await connection.release();
  } catch (err) {
    throw err.message;
  }
};

const countPackage = async () => {
  try {
    let connection = await pool.getConnection();
    (await connection).beginTransaction();
    const query = "SELECT COUNT(*) as count FROM user";
    let [no_of_package] = await connection.query(query);
    await connection.release();
    return no_of_package[0].count;
  } catch (err) {
    throw err.message;
  }
};

const deleteUser = async (id) => {
  try {
    let connection = await pool.getConnection();
    (await connection).beginTransaction();
    const query = "DELETE FROM user WHERE id = ?";
    await pool.query(query, [id]);
    await connection.release();
  } catch (err) {
    throw err.message;
  }
};

module.exports = {
  createTableUser,
  registerUser,
  getUsers,
  getUser,
  getUserByEmail,
  updateUserToken,
  countPackage,
  deleteUser,
};

const fs = require("fs");
const { pool } = require("../configdb/db");
const { tableExists } = require("../utils/checkTableExist");

//create table user
const createTableAutomobile = async () => {
  try {
    const connection = await pool.getConnection();
    await connection.beginTransaction();
    let checkUsertableExists = await tableExists("automobile");
    const user_table = checkUsertableExists
      ? null
      : await connection.query(`CREATE TABLE automobile (
      id INT NOT NULL AUTO_INCREMENT,
      name VARCHAR(255) NOT NULL,
      type VARCHAR(255) NOT NULL,
      model VARCHAR(255),
      manufacturer VARCHAR(255) NOT NULL,
      year_of_manufacture VARCHAR(255),
      files LONGTEXT NOT NULL,
      category VARCHAR(255) NOT NULL,
      material VARCHAR(255) NOT NULL,
      conditions VARCHAR(255) NOT NULL,
      price VARCHAR(255) NOT NULL,
      description TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      PRIMARY KEY (id)
    ) AUTO_INCREMENT=1000`);
  } catch (err) {
    console.error(err.message);
  }
};

const sendAutomobileDetails = async (data) => {
  const {
    name,
    files,
    model,
    type,
    manufacturer,
    year_of_manufacture,
    category,
    material,
    conditions,
    price,
    description,
  } = data;

  try {
    const connection = await pool.getConnection();
    await connection.beginTransaction();
    const automobile_query = `INSERT INTO automobile (name, type, manufacturer, model, year_of_manufacture, files, category, material, conditions, price, description) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    const new_automobile_user = await pool.query(automobile_query, [
      name,
      type,
      manufacturer,
      model,
      year_of_manufacture,
      files,
      category,
      material,
      conditions,
      price,
      description,
    ]);
    return new_automobile_user[0].insertId;
  } catch (err) {
    throw err.message;
  }
};

const getAllAutomobile = async () => {
  const query = "SELECT * FROM automobile ORDER BY created_at DESC";
  const connection = await pool.getConnection();
  const users = await connection.query(query);
  await connection.release();
  return users[0];
};

const automobileDetailById = async (id) => {
  let connection = await pool.getConnection();
  (await connection).beginTransaction();
  let get_package = await connection.query(
    `SELECT * FROM automobile WHERE id = '${id}'`
  );
  await connection.release();
  return get_package[0];
};

const deleteAutomobile = async (id) => {
  try {
    console.log(id);
    let connection = await pool.getConnection();
    (await connection).beginTransaction();
    const query = "DELETE FROM automobile WHERE id = ?";
    await pool.query(query, [id]);
    await connection.release();
  } catch (err) {
    throw err.message;
  }
};

const countAutomobile = async () => {
  try {
    let connection = await pool.getConnection();
    (await connection).beginTransaction();
    const query = "SELECT COUNT(*) as count FROM automobile";

    let [no_of_package] = await connection.query(query);
    await connection.release();
    return no_of_package[0].count;
  } catch (err) {
    throw err.message;
  }
};

module.exports = {
  createTableAutomobile,
  sendAutomobileDetails,
  getAllAutomobile,
  automobileDetailById,
  deleteAutomobile,
  countAutomobile,
};

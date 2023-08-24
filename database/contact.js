const { pool } = require("../configdb/db");
const { tableExists } = require("../utils/checkTableExist");

//create table user
const createTableContact = async () => {
  try {
    const connection = await pool.getConnection();
    await connection.beginTransaction();
    let checkUsertableExists = await tableExists("contact");
    const user_table = checkUsertableExists
      ? null
      : await connection.query(`CREATE TABLE contact (
      id INT NOT NULL AUTO_INCREMENT,
      fullName VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      telephone VARCHAR(255) NOT NULL,
      message TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      PRIMARY KEY (id)
    ) AUTO_INCREMENT=1000`);
  } catch (err) {
    console.error(err.message);
  }
};

const newContactMessage = async (data) => {
  const { fullName, email, telephone, message } = data;
  try {
    const connection = await pool.getConnection();
    await connection.beginTransaction();
    const contact_query = `INSERT INTO contact (fullName, email, telephone, message ) VALUES (?, ?, ?, ?)`;
    const new_contact_user = await pool.query(contact_query, [
      fullName,
      email,
      telephone,
      message,
    ]);
    return new_contact_user[0].insertId;
  } catch (err) {
    console.error(err);
    throw err.message;
  }
};

const getAllContactMessage = async () => {
  const query = "SELECT * FROM contact ORDER BY created_at DESC";
  const connection = await pool.getConnection();
  const [message] = await connection.query(query);
  await connection.release();
  return message;
};

const contactMessageById = async (id) => {
  let connection = await pool.getConnection();
  (await connection).beginTransaction();
  let get_package = await connection.query(`SELECT * FROM contact id = ${id}`);
  await connection.release();
  return get_package;
};

const countContactMessage = async () => {
  try {
    let connection = await pool.getConnection();
    (await connection).beginTransaction();
    const query = "SELECT COUNT(*) as count FROM contact";
    let [no_of_package] = await connection.query(query);
    await connection.release();
    return no_of_package[0].count;
  } catch (err) {
    throw err.message;
  }
};

const deleteContactMessage = async (id) => {
  let connection = await pool.getConnection();
  (await connection).beginTransaction();
  try {
    const query = "DELETE FROM contact WHERE id = ?";
    await pool.query(query, [id]);
    await connection.commit();
  } catch (err) {
    throw err.message;
  } finally {
    await connection.release();
  }
};

module.exports = {
  createTableContact,
  countContactMessage,
  contactMessageById,
  getAllContactMessage,
  newContactMessage,
  deleteContactMessage,
};

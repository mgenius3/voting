const { pool } = require('../configdb/db');

//check if table exist before create one
const tableExists = async (tableName) => {
  try {
    const conn = await pool.getConnection();
    const [rows] = await conn.execute(`SHOW TABLES LIKE '${tableName}'`);
    conn.release();
    return rows.length > 0;
  } catch (err) {
    console.error('Error checking if table exists:', err);
    return false;
  }
};

module.exports = { tableExists };

const { pool } = require("../configdb/db");
const { tableExists } = require("../utils/checkTableExist");

//create table user
const createTableBlog = async () => {
  try {
    const connection = await pool.getConnection();
    await connection.beginTransaction();
    let checkUsertableExists = await tableExists("blog");
    const user_table = checkUsertableExists
      ? null
      : await connection.query(`CREATE TABLE blog (
      id INT NOT NULL AUTO_INCREMENT,
      name TEXT NOT NULL,
      introduction TEXT NOT NULL,
      sub_heading TEXT,
      description TEXT,
      conclusion TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      PRIMARY KEY (id)
    ) AUTO_INCREMENT=1000`);
  } catch (err) {
    console.error(err.message);
  }
};

const newBlog = async (data) => {
  const { name, introduction, sub_heading, description, conclusion } = data;

  console.log(name, introduction, sub_heading, description, conclusion);
  try {
    const connection = await pool.getConnection();
    await connection.beginTransaction();
    const blog_query = `INSERT INTO blog (name, introduction, sub_heading, description, conclusion) VALUES (?, ?, ?, ?, ?)`;
    const new_blog_user = await pool.query(blog_query, [
      name,
      introduction,
      sub_heading,
      description,
      conclusion,
    ]);
    return new_blog_user[0].insertId;
  } catch (err) {
    console.error(err);
    throw err.message;
  }
};

const getAllBlog = async () => {
  const query = "SELECT * FROM blog ORDER BY created_at DESC";
  const connection = await pool.getConnection();
  const [users] = await connection.query(query);
  await connection.release();
  return users;
};

const blogDetailById = async (id) => {
  let connection = await pool.getConnection();
  (await connection).beginTransaction();
  let get_blog = await connection.query(`SELECT * FROM blog WHERE id = ${id}`);
  await connection.release();
  return get_blog[0];
};

const countblog = async () => {
  try {
    let connection = await pool.getConnection();
    (await connection).beginTransaction();
    const query = "SELECT COUNT(*) as count FROM blog";
    let [no_of_blog] = await connection.query(query);
    await connection.release();
    return no_of_blog[0].count;
  } catch (err) {
    throw err.message;
  }
};

const deleteblog = async (id) => {
  let connection = await pool.getConnection();
  (await connection).beginTransaction();
  try {
    const query = "DELETE FROM blog WHERE id = ?";
    await pool.query(query, [id]);
    await connection.commit();
  } catch (err) {
    throw err.message;
  } finally {
    await connection.release();
  }
};

module.exports = {
  createTableBlog,
  blogDetailById,
  deleteblog,
  getAllBlog,
  countblog,
  newBlog,
};

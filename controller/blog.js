const { packageValidation } = require("../validation/blog");

const {
  newBlog,
  getAllBlog,
  deleteblog,
  countblog,
  blogDetailById,
} = require("../database/blog");

const newBlogPackage = async (req, res) => {
  try {
    await packageValidation(req.body);
    await newBlog(req.body);

    res.status(201).json({ msg: "successfully added new blog" });
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
};

const blogToRead = async (req, res) => {
  try {
    const { id } = req.params;
    let blog = await blogDetailById(id);
    res.status(200).json({ msg: blog });
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
};

const getAllBlogs = async (req, res) => {
  try {
    const allPackages = await getAllBlog();
    res.status(200).json({ msg: allPackages });
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
};

const deleteABlog = async (req, res) => {
  try {
    const { id } = req.params;
    await deleteblog(id);
    res.status(200).json({ msg: "deleted successfully" });
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
};

module.exports = {
  newBlogPackage,
  blogToRead,
  getAllBlogs,
  deleteABlog,
};

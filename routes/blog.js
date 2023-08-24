const adminVerifyToken = require("../middleware/admin");
const router = require("express").Router();

const {
  getAllBlogs,
  blogToRead,
  newBlogPackage,
  deleteABlog,
} = require("../controller/blog");

router.get("/", getAllBlogs);
router.get("/:id", blogToRead);

//admin
router.use(adminVerifyToken);
router.post("/", newBlogPackage);
router.delete("/:id", deleteABlog);

module.exports = router;

const verifyToken = require("../middleware/admin");
const router = require("express").Router();

const { newBlogPackage, deleteABlog } = require("../controller/blog");

const {
  deleteUserPackage: deleteMarketUserPackage,
} = require("../controller/automobile");

const { allUsers, delUser } = require("../controller/auth");

const {
  getAllContactMessageSent,
  deleteAContactMessage,
} = require("../controller/contact");

router.use(verifyToken);

router.get("/user", allUsers);
router.delete("/user/delete/:id", delUser);

router.get("/all_contact_message", getAllContactMessageSent);
router.delete("/contact_message/:id", deleteAContactMessage);

module.exports = router;
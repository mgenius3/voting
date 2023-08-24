const router = require("express").Router();

const {
  RegisterNewUser,
  LoginUser,
  getUserById,
} = require("../controller/auth");

const { newContactMessageSent } = require("../controller/contact");

router.post("/register", RegisterNewUser);
router.post("/login", LoginUser);
router.get("/:id", getUserById);
router.post("/contact_message", newContactMessageSent);

module.exports = router;

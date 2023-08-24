const verifyToken = require("../middleware/admin");
const verifyUserToken = require("../middleware/auth");
const router = require("express").Router();

const {
  uploadedAutoMobile,
  getAllAutomobile,
  getParticularAutomobile,
  deleteAutomobile,
  automobilePayment,
} = require("../controller/automobile");

router.get("/", getAllAutomobile);

router.get("/:id", verifyUserToken, getParticularAutomobile);
router.get("/payment/automobile", verifyUserToken, automobilePayment);

router.post("/", verifyToken, uploadedAutoMobile);
router.delete("/:id", verifyToken, deleteAutomobile);

module.exports = router;

const express = require("express");
const {
  registerUser,
  loginUser,
  currentUser,
} = require("../controllers/usersController");
const validateToken = require("../middleware/verifyTokenHandler");
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/current", validateToken, currentUser);

module.exports = router;

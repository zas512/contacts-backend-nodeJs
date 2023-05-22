const express = require("express");
const router = express.Router();

const {
  getAllContacts,
  getContact,
  createContact,
  updateContact,
  deleteContact,
} = require("../controllers/contactController");
const validateToken = require("../middleware/verifyTokenHandler");

router.use(validateToken);
router.route("/").get(getAllContacts).post(createContact);
router.route("/:id").get(getContact).put(updateContact).delete(deleteContact);

module.exports = router;

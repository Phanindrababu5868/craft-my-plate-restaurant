const express = require("express");
const {
  getProfile,
  updateProfile,
  addAddress,
} = require("../controllers/userController");
const { authenticateJWT } = require("../middleware/authMiddleware");
const router = express.Router();

router.get("/profile", authenticateJWT, getProfile);
router.put("/profile", authenticateJWT, updateProfile);
router.post("/profile/address", authenticateJWT, addAddress);

module.exports = router;

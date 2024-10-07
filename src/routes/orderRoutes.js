const express = require("express");
const {
  createOrder,
  getOrder,
  updateOrderStatus,
  getOrdersForUser,
  trackOrderStatus,
} = require("../controllers/orderController");
const { authenticateJWT } = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/orders", authenticateJWT, createOrder);
router.get("/orders/:orderId", authenticateJWT, getOrder);
router.put("/orders/:orderId/status", authenticateJWT, updateOrderStatus);
router.get("/orders/:orderId/track", authenticateJWT, trackOrderStatus);
router.get("/orders", authenticateJWT, getOrdersForUser);

module.exports = router;

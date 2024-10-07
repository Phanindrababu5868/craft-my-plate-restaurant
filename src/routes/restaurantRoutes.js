const express = require("express");
const {
  createRestaurant,
  updateRestaurant,
  addMenuItem,
  updateMenuItem,
} = require("../controllers/restaurantController");
const router = express.Router();

router.post("/restaurants", createRestaurant);
router.put("/restaurants/:restaurantId", updateRestaurant);
router.post("/restaurants/:restaurantId/menu", addMenuItem);
router.put("/restaurants/:restaurantId/menu/:itemId", updateMenuItem);

module.exports = router;

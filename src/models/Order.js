const mongoose = require("mongoose");

const orderItemSchema = new mongoose.Schema({
  itemName: String,
  quantity: Number,
  price: Number,
});

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  restaurantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Restaurant",
    required: true,
  },
  items: [orderItemSchema],
  deliveryAddress: String,
  totalCost: Number,
  status: {
    type: String,
    enum: [
      "Pending",
      "Confirmed",
      "In Progress",
      "Out for Delivery",
      "Delivered",
    ],
    default: "Pending",
  },
  estimatedDeliveryTime: String,
});

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;

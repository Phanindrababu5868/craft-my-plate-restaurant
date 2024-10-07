const Order = require("../models/Order");

let io;
exports.setSocketIO = (socketIOInstance) => {
  io = socketIOInstance;
};

exports.createOrder = async (req, res) => {
  const {
    restaurantId,
    items,
    deliveryAddress,
    totalCost,
    estimatedDeliveryTime,
  } = req.body;
  const { _id } = req.user;
  if (
    !restaurantId ||
    !items ||
    !deliveryAddress ||
    !totalCost ||
    !estimatedDeliveryTime ||
    !_id
  )
    return res.status(404).json({ message: "fill all details" });
  try {
    const order = new Order({
      userId: req.user._id,
      restaurantId: restaurantId,
      items: items,
      deliveryAddress: deliveryAddress,
      totalCost: totalCost,
      estimatedDeliveryTime: estimatedDeliveryTime,
    });
    await order.save();
    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({
      message: er.message || "something went wrong!! Please try gain later",
    });
  }
};

exports.getOrder = async (req, res) => {
  const { orderId } = req.params;
  try {
    if (!orderId) return res.status(404).json({ message: "orderId required" });
    const order = await Order.findById(orderId);
    res.json(order);
  } catch (er) {
    res.status(500).json({
      message: er.message || "something went wrong!! Please try gain later",
    });
  }
};

exports.updateOrderStatus = async (req, res) => {
  const { status } = req.body;
  const orderId = req.params.orderId;

  try {
    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    order.status = status;
    await order.save();

    io.emit("orderStatusUpdate", { status: order.status, orderId: order._id });

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.getOrdersForUser = async (req, res) => {
  const { _id } = req.user;

  try {
    if (!_id) return res.status(404).json({ message: "user id required" });
    const orders = await Order.find({ userId: _id });
    res.json(orders);
  } catch (er) {
    res.status(500).json({
      message: er.message || "something went wrong!! Please try gain later",
    });
  }
};

exports.trackOrderStatus = async (req, res) => {
  const orderId = req.params.orderId;

  try {
    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.json({ status: order.status });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

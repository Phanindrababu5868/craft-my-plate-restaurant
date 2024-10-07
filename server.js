const app = require("./app");
const http = require("http");
const socketIO = require("socket.io");
const Order = require("./src/models/Order");
const orderController = require("./src/controllers/orderController");

const server = http.createServer(app);
const io = socketIO(server);

orderController.setSocketIO(io);

io.on("connection", (socket) => {
  console.log("Client connected to WebSocket");

  socket.on("trackOrder", (orderId) => {
    Order.findById(orderId, (err, order) => {
      if (err || !order) {
        socket.emit("error", "Order not found");
      } else {
        socket.emit("orderStatusUpdate", { status: order.status });
      }
    });
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected from WebSocket");
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const express = require("express");
const connectDB = require("./src/config/db");
const dotenv = require("dotenv");
const authRoutes = require("./src/routes/authRoutes");
const userRoutes = require("./src/routes/userRoutes");
const restaurantRoutes = require("./src/routes/restaurantRoutes");
const orderRoutes = require("./src/routes/orderRoutes");

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", restaurantRoutes);
app.use("/api", orderRoutes);

app.get("/", (req, res) => res.send("API is running"));

module.exports = app;

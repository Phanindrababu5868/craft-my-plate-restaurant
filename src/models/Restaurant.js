const mongoose = require("mongoose");

const menuItemSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  availability: Boolean,
  category: {
    type: String,
    enum: ["Starters", "Main Course", "Beverages", "Soups"],
    default: "Main Course",
  },
  pic: {
    type: String,
    required: [true, "item image required"],
  },
});

const restaurantSchema = new mongoose.Schema({
  name: { type: String, required: [true, "name required"] },
  location: { type: String, required: [true, "Location required"] },
  menu: [menuItemSchema],
});

const Restaurant = mongoose.model("Restaurant", restaurantSchema);
module.exports = Restaurant;

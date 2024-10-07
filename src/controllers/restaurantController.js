const Restaurant = require("../models/Restaurant");

exports.createRestaurant = async (req, res) => {
  const { name, location } = req.body;
  try {
    if (!name || !location)
      return res.status(404).json({ message: "Please add all fields" });
    const restaurant = new Restaurant(req.body);
    await restaurant.save();
    res.status(201).json(restaurant);
  } catch (er) {
    res.status(500).json({
      message: er.message || "something went wrong!! Please try gain later",
    });
  }
};

exports.updateRestaurant = async (req, res) => {
  const { restaurantId } = req.params;
  try {
    if (!restaurantId)
      return res.status(404).json({ message: "restaurantId required" });

    const restaurant = await Restaurant.findById(restaurantId);
    restaurant.name = req.body.name || restaurant.name;
    restaurant.location = req.body.location || restaurant.location;
    await restaurant.save();
    res.json(restaurant);
  } catch (er) {
    res.status(500).json({
      message: er.message || "something went wrong!! Please try gain later",
    });
  }
};

exports.addMenuItem = async (req, res) => {
  const { restaurantId } = req.params;
  try {
    if (!restaurantId)
      return res.status(404).json({ message: "restaurantId required" });

    const restaurant = await Restaurant.findById(restaurantId);
    const { name, price, availability, pic } = req.body;
    if (!name || !price || !availability || !pic)
      return res.status(404).json({ message: "Please add all fields" });
    restaurant.menu.push(req.body);
    await restaurant.save();
    res.json(restaurant);
  } catch (er) {
    console.log(er);
    res.status(500).json({
      message: er.message || "something went wrong!! Please try gain later",
    });
  }
};

exports.updateMenuItem = async (req, res) => {
  const { restaurantId, itemId } = req.params;
  try {
    if (!restaurantId)
      return res.status(404).json({ message: "restaurantId required" });

    const restaurant = await Restaurant.findById(req.params.restaurantId);

    if (!itemId) return res.status(404).json({ message: "itemId required" });
    const menuItem = restaurant.menu.id(req.params.itemId);

    menuItem.name = req.body.name || menuItem.name;
    menuItem.price = req.body.price || menuItem.price;
    menuItem.category = req.body.category || menuItem.category;
    menuItem.description = req.body.description || menuItem.description;
    menuItem.pic = req.body.pic || menuItem.pic;
    menuItem.availability =
      req.body.availability !== undefined
        ? req.body.availability
        : menuItem.availability;
    await restaurant.save();
    res.json(menuItem);
  } catch (er) {
    res.status(500).json({
      message: er.message || "something went wrong!! Please try gain later",
    });
  }
};

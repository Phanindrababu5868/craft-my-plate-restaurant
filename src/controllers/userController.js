const User = require("../models/User");

exports.getProfile = async (req, res) => {
  const { _id } = req.user;
  try {
    if (!_id) return res.status(404).json({ message: "user id required" });
    const user = await User.findById(_id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user);
  } catch (er) {
    res.status(500).json({
      message: er.message || "something went wrong!! Please try gain later",
    });
  }
};

exports.addAddress = async (req, res) => {
  const { street, city, zip } = req.body;
  const { _id } = req.user;
  try {
    if (!street || !city || !zip)
      return res.status(404).json({ message: "Please fill all fields" });
    if (!_id) res.status(404).json({ message: "user id required" });
    const user = await User.findById(req.user._id).select("-password");
    if (!user) return res.status(404).json({ message: "user not found" });
    user.addresses.push({ zip, street, city });
    await user.save();
    res.status(201).json(user);
  } catch (er) {
    res.status(500).json({
      message: er.message || "something went wrong!! Please try gain later",
    });
  }
};

exports.updateProfile = async (req, res) => {
  const { _id } = req.user;
  try {
    if (!_id) return res.status(404).json({ message: "user id required" });
    const user = await User.findById(req.user._id).select("-password");
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.phone = req.body.phone || user.phone;
    if (req.body.addresses) {
      user.addresses = req.body.addresses;
    }
    user.pic = req.body.pic || user.pic;
    await user.save();
    res.json(user);
  } catch (er) {
    res.status(500).json({
      message: er.message || "something went wrong!! Please try gain later",
    });
  }
};

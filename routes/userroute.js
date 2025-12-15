const express = require("express");
const router = express.Router();
const User = require("../models/User");
const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");

// 👀 View all users (Admin + Manager)
router.get("/", auth, role("admin", "manager"), async (req, res) => {
  const users = await User.find().select("-password");
  res.json(users);
});

// 👤 View own profile (User)
router.get("/me", auth, async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");
  res.json(user);
});

module.exports = router;

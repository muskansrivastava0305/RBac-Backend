const express = require("express");
const router = express.Router();
const User = require("../models/User");
const auth = require("../middleware/authmiddleware");
const role = require("../middleware/rolemiddleware");

// 👀 Admin + Manager → View all users
router.get("/", auth, role("admin", "manager"), async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 👤 Any logged-in user → View own profile
router.get("/me", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;












// const express = require("express");
// const router = express.Router();
// const User = require("../models/User");
// const auth = require("../middleware/authMiddleware");
// const role = require("../middleware/roleMiddleware");

// // 👀 View all users (Admin + Manager)
// router.get("/", auth, role("admin", "manager"), async (req, res) => {
//   const users = await User.find().select("-password");
//   res.json(users);
// });

// // 👤 View own profile (User)
// router.get("/me", auth, async (req, res) => {
//   const user = await User.findById(req.user.id).select("-password");
//   res.json(user);
// });

// module.exports = router;

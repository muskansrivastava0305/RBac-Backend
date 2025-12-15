const jwt = require("jsonwebtoken");
const User = require("../models/User");

const auth = (roles = []) => {
  return async (req, res, next) => {
    try {
      const authHeader = req.header("Authorization");
      if (!authHeader) {
        return res.status(401).json({ message: "No token provided" });
      }

      const token = authHeader.split(" ")[1];
      if (!token) {
        return res.status(401).json({ message: "Token missing" });
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.id).select("-password");

      if (!user) {
        return res.status(401).json({ message: "User not found" });
      }

      if (roles.length && !roles.includes(user.role)) {
        return res.status(403).json({ message: "Not authorized" });
      }

      req.user = {
        id: user._id,
        role: user.role,
        email: user.email
      };

      next();
    } catch (err) {
      console.error("Auth Middleware Error:", err.message);
      res.status(401).json({ message: "Invalid token" });
    }
  };
};

module.exports = auth;















// const jwt = require("jsonwebtoken");
// const User = require("../models/user");

// const auth = (roles = []) => {
//   return async (req, res, next) => {
//     try {
//       const authHeader = req.header("Authorization");
//       if (!authHeader) {
//         return res.status(401).json({ message: "No token provided" });
//       }

//       const token = authHeader.split(" ")[1];
//       if (!token) {
//         return res.status(401).json({ message: "Token missing" });
//       }

//       const decoded = jwt.verify(token, process.env.JWT_SECRET);

//       const user = await User.findById(decoded.id);
//       if (!user) {
//         return res.status(401).json({ message: "User not found" });
//       }

//       if (roles.length && !roles.includes(user.role)) {
//         return res.status(403).json({ message: "Not authorized" });
//       }

//       req.user = user;
//       next();
//     } catch (err) {
//       console.error("Auth Middleware Error:", err.message);
//       res.status(401).json({ message: "Invalid token" });
//     }
//   };
// };

// module.exports = auth;

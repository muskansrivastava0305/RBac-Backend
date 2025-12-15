const jwt = require('jsonwebtoken');
const User = require('../models/user');

const auth = (roles = []) => {
    return async (req, res, next) => {
        const token = req.header('Authorization')?.split(' ')[1];
        if (!token) return res.status(401).json({ message: 'No token' });

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.id);
            if (roles.length && !roles.includes(req.user.role)) {
                return res.status(403).json({ message: 'Not authorized' });
            }
            next();
        } catch (err) {
            res.status(401).json({ message: 'Invalid token' });
        }
    };
};

module.exports = auth;

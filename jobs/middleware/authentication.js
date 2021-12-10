const jwt = require('jsonwebtoken');

const User = require('../models/User');
const { UnauthenticatedError } = require('../errors');

const auth = async (req, res, next) => {
  // check header
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer '))
    throw new UnauthenticatedError('Authentication is invalid.');

  const token = authHeader.split(' ')[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    // const user = await User.findById(payload.id).select('-password');
    req.user = {
      userId: payload.userId,
      name: payload.name,
    };

    next();
  } catch (error) {
    throw new UnauthenticatedError('Authentication is invalid.');
  }
};

module.exports = auth;

const { createToken, isTokenValid, attachCookiesToResponse } = require('./jwt');
const createTokenUser = require('./createUserToken');
const checkPermissions = require('./checkPermissions');

module.exports = {
  createToken,
  isTokenValid,
  attachCookiesToResponse,
  createTokenUser,
  checkPermissions,
};

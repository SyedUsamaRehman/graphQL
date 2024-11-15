// authMiddleware.js
const { getUserFromToken } = require('../utils/auth');

const authMiddleware = (req) => {
  const token = req.headers.authorization || '';
  const user = getUserFromToken(token);
  if (!user) {
    throw new Error('Unauthorized');
  }
  return user;
};

const isAdmin = (resolve, parent, args, context, info) => {
  if (context.user.role !== 'admin') {
    throw new Error('Admin access required');
  }
  return resolve(parent, args, context, info);
};

module.exports = { authMiddleware, isAdmin };

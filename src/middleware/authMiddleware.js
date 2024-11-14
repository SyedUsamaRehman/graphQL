// // middleware/authMiddleware.js
// const { getUserFromToken } = require('../utils/auth');

// const authMiddleware = (resolve, parent, args, context, info) => {
//   const token = context.req.headers.authorization || '';
//   const user = getUserFromToken(token);

//   if (!user) {
//     throw new Error('Unauthorized');
//   }

//   context.user = user;  // Add user info to context for resolvers
//   return resolve(parent, args, context, info);
// };

// const isAdmin = (resolve, parent, args, context, info) => {
//   if (!context.user || context.user.role !== 'admin') {
//     throw new Error('Admin access required');
//   }
//   return resolve(parent, args, context, info);
// };

// module.exports = { authMiddleware, isAdmin };














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

// // resolvers/userResolver.js
const { hashPassword, validatePassword, generateToken } = require('../utils/auth');
const User = require('../models/user');

const userResolver = {
  Mutation: {
    register: async (_, { username, password, role }) => {
      // Hash the password before storing it
      const hashedPassword = await hashPassword(password);
      
      // Create the user in the database
      const user = await User.create({ username, password: hashedPassword, role });
      
      // Generate and return the token
      const token = generateToken(user);  // Assuming generateToken is a function that creates a JWT or similar
      
      // Return the token inside the AuthPayload object
      return { token };
    },
    login: async (_, { username, password }) => {
      // Find the user by username
      const user = await User.findOne({ where: { username } });
      
      // Check if the user exists and if the password is correct
      if (!user || !(await validatePassword(password, user.password))) {
        throw new Error('Invalid credentials');
      }
      
      // Generate and return the token
      const token = generateToken(user);
      return { token };
    },
  },
};

module.exports = userResolver;

require('dotenv').config();
const express = require('express');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const sequelize  = require('./config/database'); // Assuming models/index.js exports sequelize
const {typeDefs,resolvers}=require('./graphql')
const { authMiddleware } = require('./middleware/authMiddleware'); // Add auth middleware if needed
const { makeExecutableSchema } = require('@graphql-tools/schema');
const authDirective = require('./utils/authDirectives')
const cors = require('cors'); // Allow cross-origin requests

(async () => {
  try {
    // Connect to the database
    await sequelize.authenticate();
    console.log('Database connected successfully!');
    
    // Sync models
    await sequelize.sync({ alter: true });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    process.exit(1);
  }

  const app = express();

  // Middleware for parsing JSON and enabling CORS
  app.use(express.json());
  app.use(cors());

  const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
    directives:authDirective,
  });


  // Set up ApolloServer with schema and resolvers
  const server = new ApolloServer({
    schema,
  });

  await server.start();

  


  app.use('/graphql', expressMiddleware(server, {
    context: ({ req }) => {
      const user = authMiddleware(req);
      return { user };
    }
  }));




  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}/graphql`);
  });
})();

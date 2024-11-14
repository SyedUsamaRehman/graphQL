// const { SchemaDirectiveVisitor } = require('@apollo/server');
// const { defaultFieldResolver } = require('graphql');

// class AuthDirective extends SchemaDirectiveVisitor {
//   visitFieldDefinition(field) {
//     const { resolve = defaultFieldResolver } = field;

//     // Add the authorization logic before the field resolution
//     field.resolve = async function (...args) {
//       const context = args[2]; // The third argument is the context in resolvers

//       // Get the user from the context (assumes user is added to context via authentication middleware)
//       const user = context.user;

//       if (!user) {
//         throw new Error('Authentication required');
//       }

//       // Check if the user has the required role
//       const { requires } = this.args;
//       if (requires && user.role !== requires) {
//         throw new Error('You do not have permission to access this resource');
//       }

//       // If user is authorized, resolve the field
//       return resolve.apply(this, args);
//     };
//   }
// }

// module.exports = AuthDirective;







const authDirective = {
    auth: {

      async resolve(next, parent, args, context, info) {
        const user = context.user; // Get the user from context
  
        if (!user) {
          throw new Error('Authentication required');
        }
  
        // Check if the user has the required role
        const { requires } = args;
        if (requires && user.role !== requires) {
          throw new Error('You do not have permission to access this resource');
        }
  
        // Proceed to the resolver if the user is authorized
        return next();
      },
    },
  };
  

  module.exports = authDirective
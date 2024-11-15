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
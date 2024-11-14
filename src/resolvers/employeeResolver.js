const  Employee  = require('../models/employee');
const { GraphQLJSON } = require('graphql-type-json');


 const employeeResolver = {
    JSON: GraphQLJSON,
  Query: {
    employees: async (_, { page = 1, size = 10 }) => {
      const offset = (page - 1) * size;
      return Employee.findAll({ limit: size, offset });
    },
    employee: (_, { id }) => Employee.findByPk(id),
  },
  Mutation: {
    addEmployee: (_, args) => Employee.create(args),
    updateEmployee: async (_, { id, ...data }) => {
      await Employee.update(data, { where: { id } });
      return Employee.findByPk(id);
    },
  },
};


module.exports=employeeResolver
// // resolvers/studentResolver.js
const Student = require('../models/student');
const { isAdmin } = require('../middleware/authMiddleware');

// const studentResolver = {
//   Query: {
//     students: async (_, { page = 1, size = 10 }, context) => {
//       const offset = (page - 1) * size;
//       return await Student.findAll({ limit: size, offset });
//     },
//     student: (_, { id }) => Student.findByPk(id),
//   },
//   Mutation: {
//     addStudent: isAdmin(async (_, { name, age, class: className }) => {
//       return Student.create({ name, age, class: className });
//     }),
//     updateStudent: isAdmin(async (_, { id, ...data }) => {
//       await Student.update(data, { where: { id } });
//       return Student.findByPk(id);
//     }),
//   },
// };

// module.exports = studentResolver;







const studentResolver = {
  Query: {
    students: async (_, { page = 1, size = 10 }, context) => {
      const offset = (page - 1) * size;
      return await Student.findAll({ limit: size, offset });
    },
    student: (_, { id }) => Student.findByPk(id),
  },
  Mutation: {
    addStudent: async (parent, { name, age, class: className }, context, info) => {
      await isAdmin(() => {}, parent, { name, age, class: className }, context, info); // Check admin access
      return Student.create({ name, age, class: className });
    },
    updateStudent: async (parent, { id, ...data }, context, info) => {
      await isAdmin(() => {}, parent, { id, ...data }, context, info); // Check admin access
      await Student.update(data, { where: { id } });
      return Student.findByPk(id);
    },
  },
};

module.exports = studentResolver;


const { mergeResolvers , mergeTypeDefs} = require('@graphql-tools/merge');
const employeeResolver=require('../resolvers/employeeResolver');
const studentResolver=require('../resolvers/studentResolver');
const userResolver=require('../resolvers/userResolver');
const employeeSchema = require('../schema/employeeSchema');
const studentSchema = require('../schema/studentSchema');
const userSchema = require('../schema/userSchems');



// const resolvers =mergeResolvers([userResolver,employeeResolver,studentResolver]);
const resolvers =mergeResolvers([userResolver]);
const typeDefs = mergeTypeDefs([userSchema]);

// const typeDefs = mergeTypeDefs([userSchema,employeeSchema,studentSchema]);


module.exports = {typeDefs,resolvers};

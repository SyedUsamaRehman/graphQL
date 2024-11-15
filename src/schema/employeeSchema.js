const { gql } = require('graphql-tag'); // Use graphql-tag for the gql tag

const employeeSchema = gql`
  scalar JSON
  type Employee {
    id: ID!
    name: String!
    age: Int!
    class: String
    subjects: [String]
    attendance: JSON
  }

  type Query {
    employees(page: Int, size: Int): [Employee]
    employee(id: ID!): Employee
  }

  type Mutation {
    addEmployee(name: String!, age: Int!, class: String, subjects: [String], attendance: JSON): Employee
    updateEmployee(id: ID!, name: String, age: Int, class: String, subjects: [String], attendance: JSON): Employee
  }
`;

module.exports = employeeSchema;

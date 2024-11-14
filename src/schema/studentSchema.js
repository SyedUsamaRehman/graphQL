const { gql } = require('graphql-tag'); // Use graphql-tag for the gql tag

// const studentSchema = gql`
//   scalar JSON

//  directive @auth(requires: Role = ADMIN) on FIELD_DEFINITION

//   enum Role {
//     ADMIN
//     EMPLOYEE
//   }


//   type Student {
//     id: ID!
//     name: String!
//     age: Int!
//     class: String
//     subjects: [String]
//     attendance: JSON
//   }

//   type Query {
//     students(page: Int, size: Int): [Student] @auth(requires: EMPLOYEE) # Accessible by both roles
//     student(id: ID!): Student @auth(requires: EMPLOYEE)
//   }

//   type Mutation {
//     addStudent(name: String!, age: Int!, class: String, subjects: [String], attendance: JSON): Student @auth(requires: ADMIN)
//     updateStudent(id: ID!, name: String, age: Int, class: String, subjects: [String], attendance: JSON): Student @auth(requires: ADMIN)
//   }
// `;






const studentSchema = gql`
  scalar JSON

  directive @auth(requires: Role = ADMIN) on FIELD_DEFINITION

  enum Role {
    ADMIN
    EMPLOYEE
  }

  type Student {
    id: ID!
    name: String!
    age: Int!
    class: String
    subjects: [String]
    attendance: JSON
  }

  type Query {
    students(page: Int, size: Int): [Student] @auth(requires: EMPLOYEE) # Accessible by EMPLOYEE and ADMIN
    student(id: ID!): Student @auth(requires: EMPLOYEE) # Accessible by EMPLOYEE and ADMIN
  }

  type Mutation {
    addStudent(name: String!, age: Int!, class: String, subjects: [String], attendance: JSON): Student @auth(requires: ADMIN) # Accessible by ADMIN only
    updateStudent(id: ID!, name: String, age: Int, class: String, subjects: [String], attendance: JSON): Student @auth(requires: ADMIN) # Accessible by ADMIN only
  }
`;








module.exports = studentSchema;
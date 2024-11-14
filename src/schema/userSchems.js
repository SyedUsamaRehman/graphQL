const { gql } = require('graphql-tag'); // Use graphql-tag for the gql tag
const userSchema = gql`
  scalar JSON

  directive @auth(requires: Role = ADMIN) on FIELD_DEFINITION

  enum Role {
    ADMIN
    EMPLOYEE
  }

  type User {
    id: ID!
    username: String!
    role: Role!
  }

  type AuthPayload {  # Define a custom payload type for token response
    token: String!
  }

  type Query {
    users: [User] @auth(requires: ADMIN) # Accessible by admin only
  }

  type Mutation {
    # addUser(username: String!, password: String!, role: Role!): User @auth(requires: ADMIN)
    register(username: String!, password: String!, role: Role!): AuthPayload  # Correct return type for register
    login(username: String!, password: String!): AuthPayload  # Correct return type for login
  }
`;



module.exports = userSchema;

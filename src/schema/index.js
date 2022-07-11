const { gql } = require('apollo-server');

const typeDefs = gql`
    type Query {
        doNothing: Boolean
        GetUser(name: String): User
    },
    type Mutation {
        addUser(name: String!, email: String!): Boolean!
    },
    # should these be made nullable so its obvious when its failed
    type User {
        name: String
        email: String
        errors: [Error!]
    },
    type Error {
        message: String!
    }
`;

exports.schema = typeDefs;

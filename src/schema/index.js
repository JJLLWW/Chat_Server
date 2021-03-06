const { gql } = require('apollo-server');

const typeDefs = gql`
    # should these be made nullable so its obvious when its failed
    type User {
        name: String
        email: String
        errors: [Error!]
    },
    type Error {
        message: String!
    },
    type LoginResponse {
        success: Boolean!,
        token: String
        errors: [Error!]
    },
    type Query {
        doNothing: Boolean
        GetUser(name: String): User
    },
    type Mutation {
        AddUser(name: String!, email: String!): Boolean!
        TryLogin(name: String!, password: String!): LoginResponse!
    },
    type Subscription {
        TestSubscription: String!
    }
`;

exports.typeDefs = typeDefs;

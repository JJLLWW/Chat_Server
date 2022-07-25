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
    type MsgResponse {
        success: Boolean!
        errors: [Error!]
    },
    type Message {
        text: String!
    },
    type Query {
        doNothing: Boolean
        GetUser(name: String): User
    },
    type Mutation {
        AddUser(name: String!, email: String!): Boolean!
        TryLogin(name: String!, password: String!): LoginResponse!
        SendMsg(text: String!): MsgResponse
    },
    type Subscription {
        TestSubscription: String,
        MsgSub: Message,
    }
`;

exports.typeDefs = typeDefs;

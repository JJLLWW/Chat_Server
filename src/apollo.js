const { ApolloServer } = require('apollo-server-express');

const { resolvers } = require('./resolvers');
const { schema } = require('./schema');

// const server = new ApolloServer({ typeDefs: schema, resolvers });
const server = new ApolloServer({ typeDefs: schema, resolvers });

exports.GqlServer = server;

const { ApolloServerPluginDrainHttpServer } = require('apollo-server-core');

const { ApolloServer } = require('apollo-server-express');
const { makeExecutableSchema } = require('@graphql-tools/schema');

const { useServer } = require('graphql-ws/lib/use/ws');
const { WebSocketServer } = require('ws');

const { resolvers } = require('./resolvers');
const { typeDefs } = require('./schema');

function StartGQLServer(HttpServer) {
  const schema = makeExecutableSchema({ typeDefs, resolvers });
  const WsServer = new WebSocketServer({
    server: HttpServer,
    path: '/graphql',
  });
  const serverCleanup = useServer({ schema }, WsServer);
  const GqlServer = new ApolloServer({
    schema,
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer: HttpServer }),
      {
        async serverWillStart() {
          return {
            async drainServer() {
              await serverCleanup.dispose();
            },

          };
        },
      },
    ],
  });
  return GqlServer;
}

exports.StartGQLServer = StartGQLServer;

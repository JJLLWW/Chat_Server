const { User } = require('../models');

// every resolver takes arguments (parent, gql_args, context, info)
const resolvers = {
  Query: {
    doNothing: (parent, {}, ctxt, info) => true,
    GetUser: async (parent, { name }, ctxt, info) => {
      const user = await User.findOne({
        where: {
          name,
        },
      });
      // no error
      if (user !== null) {
        return user;
      }
      // error
      return { name: null, email: null, errors: [{ message: 'user does not exist' }] };
    },
  },
  Mutation: {
    addUser: (parent, { name, email }, ctxt, info) => {
      // how to do error checking? what if user already present?
      const user = User.create({ name, email });
      return true;
    },
  },
};

exports.resolvers = resolvers;

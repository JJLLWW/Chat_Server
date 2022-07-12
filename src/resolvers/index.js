const bcrypt = require('bcryptjs');
const { User } = require('../models');
const { TryLoginResolver } = require('./login');
const { GetUserResolver } = require('./getuser');

// at no point should the client ever be able to access a user's password
const resolvers = {
  Query: {
    doNothing: (parent, {}, ctxt, info) => true,
    GetUser: GetUserResolver,
  },
  Mutation: {
    AddUser: (parent, { name, email, password }, ctxt, info) => {
      // how to do error checking? what if user already present?
      const user = User.create({ name, email, password: bcrypt.hashSync(password) });
      return true;
    },
    TryLogin: TryLoginResolver,
  },
};

exports.resolvers = resolvers;

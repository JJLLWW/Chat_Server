const bcrypt = require('bcryptjs');
const { User } = require('../models');
const { TryLoginResolver } = require('./login');
const { GetUserResolver } = require('./getuser');
const { PubSub } = require('graphql-subscriptions')

const pubsub = new PubSub;

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
    SendMsg: (parent, { text }, ctxt, info) => {
        // console.log(`trying to send ${text}`)
        pubsub.publish('MESSAGE_SENT', {MsgSub: {text: text}})
    }
  },
  Subscription: {
    TestSubscription: {
        // client only recieves 'h' and 'o' even though this is called once for each.
      subscribe: async function* () {
        console.log("TestSubscription subscribe called")
        for await (const c of 'abcdefghijklmnopqrstivwxyz'.repeat(100)) {
          yield {TestSubscription: c};
        }
      },
    },
    // the message subscription should be triggered whenever a message is sent.
    MsgSub: {
        subscribe: () => {
            // console.log("SUBSCRIBED")
            const it = pubsub.asyncIterator('MESSAGE_SENT')
            return it
        }
    }
  },
};

exports.resolvers = resolvers;

const bcrypt = require('bcryptjs');
const { User } = require('../models');

async function GetUser(parent, { name }, ctxt, info) {
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
}

exports.GetUserResolver = GetUser;

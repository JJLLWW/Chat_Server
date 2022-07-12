const bcrypt = require('bcryptjs');
const { User } = require('../models');
const { GenJwt } = require('../auth');

async function TryLogin(parent, { name, password }, ctxt, info) {
  console.log('called', name, password);
  const output = { success: false, token: '', errors: [] };
  const user = await User.findOne({
    where: {
      name,
    },
  });
    // verify user
  if (user === null) {
    output.errors.push({ message: 'user not found' });
    return output;
  }
  // verify password
  const match = await bcrypt.compare(password, user.password);
  if (match === false) {
    output.errors.push({ message: 'wrong password' });
    return output;
  }
  // generate the JWT
  const token = await GenJwt(user);
  output.token = token;
  output.success = true;
  return output;
}

exports.TryLoginResolver = TryLogin;

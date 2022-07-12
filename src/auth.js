const jwt = require('jsonwebtoken');

const SECRET = 'generate this properly at some point but this is ok for now';

async function GenJwt(user) {
  const token = jwt.sign({
    user,
  }, SECRET, {
    expiresIn: '3h',
  });
  return token;
}

exports.GenJwt = GenJwt;

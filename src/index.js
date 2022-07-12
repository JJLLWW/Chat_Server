const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const { GqlServer } = require('./apollo');
const { sequelize } = require('./sequelize');
const { User } = require('./models');

const SERV_PORT = 8080;

async function start() {
  await GqlServer.start();
  const app = express();
  // enables CORS for all routes!
  app.use(cors());
  GqlServer.applyMiddleware({ app });
  // update all models if necessary, for now drop all tables as well.
  await sequelize.sync({ force: true });
  User.create({ name: 'Test User', email: 'bob@bob.com', password: bcrypt.hashSync('bad_pass') });
  app.listen(SERV_PORT, () => {
    console.log(`server listening on port ${SERV_PORT}`);
  });
}

start();

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'postgres',
  database: 'chatdb',
  username: 'postgres',
  password: 'password',
});

exports.sequelize = sequelize;

const { DataTypes } = require('sequelize');
const { sequelize } = require('../sequelize');

const User = sequelize.define('user', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
});

exports.User = User;

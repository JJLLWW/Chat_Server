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
  password: {
    // bcrypt hashes strings into strings
    type: DataTypes.STRING,
    allowNull: false,
  },
});

exports.User = User;

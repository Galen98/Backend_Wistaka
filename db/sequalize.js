const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('dinpar', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
});

module.exports = sequelize;
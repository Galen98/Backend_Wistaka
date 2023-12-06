const { DataTypes } = require('sequelize');
const sequelize = require('../db/sequalize')

const artikelModel = sequelize.define('Article', {
  judul: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  shortdeskripsi: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  fulldeskripsi: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  created_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  updated_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
}, {
  timestamps: false,
});

module.exports = artikelModel;
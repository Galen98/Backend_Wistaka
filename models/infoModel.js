const { DataTypes } = require("sequelize");
const sequelize = require("../db/sequalize");

const infoModel = sequelize.define('Info',{
    judul: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    isi: {
        type:DataTypes.STRING,
        allowNull: false,
    },
    penulis:{
        type:DataTypes.STRING,
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
})

module.exports = infoModel
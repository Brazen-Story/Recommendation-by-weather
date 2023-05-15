const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('database', 'username', 'password', {
  host: 'localhost',
  dialect: 'mysql'
});

const AdInformation = sequelize.define('AdInformation', {
    Ad_ID: {
      type: DataTypes.STRING(45),
      primaryKey: true,
      autoIncrement: true
    },
    Ad_Name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    Ad_Iamge: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    Ad_link: {
      type: DataTypes.STRING(255),
      allowNull: false
    }
  });
  
  module.exports = AdInformation;
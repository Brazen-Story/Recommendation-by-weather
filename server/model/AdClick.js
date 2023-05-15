const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('database', 'username', 'password', {
  host: 'localhost',
  dialect: 'mysql'
});

const AdClick = sequelize.define('AdClick', {
    Ad_ID: {
      type: DataTypes.STRING(45),
      primaryKey: true,
      autoIncrement: true
    },
    Click_Time: {
     type: DataTypes.DATE,
      allowNull: false
    },
    Click_Count: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });
  
  module.exports = AdClick;
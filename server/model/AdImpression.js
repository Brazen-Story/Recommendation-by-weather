const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('database', 'username', 'password', {
  host: 'localhost',
  dialect: 'mysql'
});

const AdImpression = sequelize.define('AdImpression', {
    Ad_ID: {
      type: DataTypes.STRING(45),
      primaryKey: true,
      autoIncrement: true
    },
    Impression_Time: {
     type: DataTypes.DATE,
      allowNull: false
    },
    Impression_Count: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    Impression_Revenue: {
      type: DataTypes.FLOAT,
      allowNull: false
    }
  });
  
  module.exports = AdImpression;
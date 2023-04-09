// const { DataTypes } = require('sequelize');
// const sequelize = require('../db/config');

const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('database', 'username', 'password', {
  host: 'localhost',
  dialect: 'mysql'
});


const Report = sequelize.define('Report', {
  name: {
    type: DataTypes.STRING(45),
    primaryKey: true,
    autoIncrement: true
  },
  date: {
    type: DataTypes.STRING(45),
    allowNull: false
  },
  state: {
    type: DataTypes.STRING(45),
  },
  fashion: {
    type: DataTypes.STRING(45),
  },
  temperature: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false
  },
  Additional_explanation: {
    type: DataTypes.STRING(45),
  },
  rain: {
    type: DataTypes.STRING(45),
    primaryKey: true,
    allowNull: false
  },
  wind: {
    type: DataTypes.STRING(45),
  }
});

module.exports = Report;
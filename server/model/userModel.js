const { Sequelize } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
      id: {
        type: Sequelize.STRING(45),
        primaryKey: true,
        autoIncrement: true
      },
      pw: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      name: {
        type: Sequelize.STRING(45),
        allowNull: false
      },
      phone_number: {
        type: Sequelize.INTEGER,
        allowNull: false
      }
    });
    
    return User;
  };
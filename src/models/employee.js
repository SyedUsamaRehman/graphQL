require('dotenv').config();
const { DataTypes } = require('sequelize');
const sequelize=require('../config/database')

// Initialize Sequelize connection

// Define the Employee model
const Employee = sequelize.define('Employee', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  age: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  class: {
    type: DataTypes.STRING,
  },
  subjects: {
    type: DataTypes.ARRAY(DataTypes.STRING),
  },
  attendance: {
    type: DataTypes.JSON,
  },
});

module.exports = Employee;
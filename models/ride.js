const { DataTypes } = require('sequelize');
const db = require('../db');

const Ride = db.define('rides', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  driverId: {
    type: DataTypes.INTEGER,
    allowNull: true, // Initially null until assigned
  },
  pickup: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  destination: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  distance: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  duration: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  fare: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'requested',
  }
}, {
  tableName: 'rides',
  timestamps: false
});

module.exports = Ride;

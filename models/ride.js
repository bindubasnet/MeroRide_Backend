// const { DataTypes } = require('sequelize');
// const db = require('../config/db');

// const User = require('./User');
// const Driver = require('./driver');

// const Ride = db.define('rides', {
//   id: {
//     type: DataTypes.INTEGER,
//     autoIncrement: true,
//     primaryKey: true,
//   },
//   userId: {
//     type: DataTypes.INTEGER,
//     allowNull: false,
//   },
//   driverId: {
//     type: DataTypes.INTEGER,
//     allowNull: true,
//   },
//   pickup: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   destination: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   distance: {
//     type: DataTypes.FLOAT,
//     allowNull: false,
//   },
//   duration: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   fare: {
//     type: DataTypes.FLOAT,
//     allowNull: false,
//   },
//   status: {
//     type: DataTypes.STRING,
//     allowNull: false,
//     defaultValue: 'requested',
//     validate:{
//       isIn: [['requested', 'accepted', 'ongoing', 'completed', 'cancelled']],
//     }
//   },
//   paymentMethod: {
//     type: DataTypes.STRING, // e.g., 'cash', 'card'
//     allowNull: true,
//   },
// }, {
//   tableName: 'rides',
//   timestamps: true,
// });

// Ride.belongsTo(User,{
//   foreignKey: 'userId'
// });
// Ride.belongsTo(Driver,{
//   foreignKey: 'driverId'
// });

// module.exports = Ride;

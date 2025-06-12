const { DataTypes } = require("sequelize");
const db = require("../config/db");

const Ride = require('./Ride');

const Driver = db.define("drivers", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  username: {
    type: DataTypes.STRING,
    allownull: false,
    unique: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phonenumber:{
    type: DataTypes.INTEGER,
    allowNull:false
  },
  isEmailVerified: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
},
  {
    tableName: "drivers",
    timestamps: false

  });

// Driver.hasMany(Ride, {
//   foreignKey: 'driverId'
// });

module.exports = Driver;
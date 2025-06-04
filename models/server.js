const Driver = require('./driver');
const DriverDocument = require('./driverdocuments');
const User = require('./user');
const Role = require('./role');
const OTP = require('./otp');
const db ={};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = require("./user");
db.Role = require("./role");
db.OTP = OTP;

// Call associate methods
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

Driver.hasMany(DriverDocument, {
    foreignKey: 'driverId',
    as:'documents',
    onDelete:'CASCADE',
});

DriverDocument.belongsTo(Driver, {
    foreignKey: 'driverId',
    as: 'driver'
});

module.exports = {Driver, DriverDocument};
// const Driver = require('./Driver');
// const DriverDocument = require('./DriverDocument');
// const User = require('./User');
// const Role = require('./Role');
// const OTP = require('./OTP');
// const db ={};

// db.Sequelize = Sequelize;
// db.sequelize = sequelize;

// db.User = require("./User");
// db.Role = require("./Role");
// db.OTP = OTP;

// // Call associate methods
// Object.keys(db).forEach(modelName => {
//   if (db[modelName].associate) {
//     db[modelName].associate(db);
//   }
// });

// Driver.hasMany(DriverDocument, {
//     foreignKey: 'driverId',
//     as:'documents',
//     onDelete:'CASCADE',
// });

// DriverDocument.belongsTo(Driver, {
//     foreignKey: 'driverId',
//     as: 'driver'
// });

// module.exports = {Driver, DriverDocument};
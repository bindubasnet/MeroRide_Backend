const {DataTypes} = require("sequelize");
const db = require("../db");

const DriverDocument = db.define('DriverDocument', {
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    vehicleType: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    vehicleNumber: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    billbook:{
        type:DataTypes.STRING,
        allowNull: false,
    },
    license:{
        type: DataTypes.STRING,
        allownull:false,
    },
    recentPhoto:{
        type: DataTypes.STRING,
        allowNull:false,
    },
    driverId:{
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    },{
        tableName:"driver_documents",
        timestamps: false,
});

module.exports = DriverDocument;
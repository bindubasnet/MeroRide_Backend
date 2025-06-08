const {DataTypes} = require("sequelize");
const db = require("../db");

const User = db.define("users", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull:false
    },
    username:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },

    isEmailVerified: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },

    phonenumber:{
        type: DataTypes.INTEGER,
        allowNull:false
    },

    address:{
        type: DataTypes.STRING,
        allowNull: false
    },
},{
    tableName: "users",
    timestamps:false
});

User.associate = (models)=>{
    User.belongsToMany(models.Role, {
        through: "UserRoles",
        foreignKey:"userId",
        otherKey:"roleId",
        as:"roles"
    });
};

module.exports = User;
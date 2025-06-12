const{DataTypes} = require("sequelize");
const db = require("../config/db");

const Role = db.define("role", {
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    roleName:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
},{
    tableName: "roles",
    timestamps: false
});

// Role.associate = (models)=>{
//     Role.belongsToMany(models.User, {
//         through:"UserRoles",
//         foreignKey: "roleId",
//         otherKey:"userId",
//         as:"users"
//     });
// };

module.exports = Role;
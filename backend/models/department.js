const { DataTypes} = require("sequelize/dataTypes");

const departmentModel = (sequelize) => {
    return sequelize.define('Department', {
        name : {
            type : DataTypes.STRING,
            allowNull : false,
            unique : true,
        },
    })
}

module.exports = departmentModel;
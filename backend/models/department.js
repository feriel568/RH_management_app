const { DataTypes } = require('sequelize'); // Import DataTypes from Sequelize

// Define the department model
const departmentModel = (sequelize) => {
  const Department = sequelize.define('Department', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  });

  

  return Department;
};

module.exports = departmentModel;

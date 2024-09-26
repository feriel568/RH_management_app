const DataTypes = require('sequelize')

const userModel = (sequelize) => {

    const User = sequelize.define('User', {
      
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
        },
        role: {
          type: DataTypes.ENUM('Employee', 'HRAdmin'), 
          allowNull: false,
        },
    
        phone: {
          type: DataTypes.STRING, 
          allowNull: true,
        },
        address: {
          type: DataTypes.STRING, 
          allowNull: true,
        },
        hireDate: {
          type: DataTypes.DATE, 
          allowNull: false,
        },
        salary: {
          type: DataTypes.DECIMAL(10, 2), 
          allowNull: true,
        },
        jobTitle: {
          type: DataTypes.STRING, 
          allowNull: true,
        },
        departmentId: {
          type: DataTypes.INTEGER, 
          allowNull: false,
        },
 
      });
     
      return User;
}

module.exports = userModel;
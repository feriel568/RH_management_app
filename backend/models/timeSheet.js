const { DataTypes } = require('sequelize'); 


const timeSheetModel = (sequelize) => {
  const TimeSheet = sequelize.define('TimeSheet', {
    workDays: {
      type: DataTypes.JSON, 
      allowNull: false,
      
    },
    totalHours: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    status: {
      type: DataTypes.ENUM('pending', 'approved', 'rejected'),
      allowNull: false,
      defaultValue: 'pending',
    },

    userId: {
      type: DataTypes.INTEGER, 
      allowNull: false,
    },
  })

  

  return TimeSheet;
};

module.exports = timeSheetModel;

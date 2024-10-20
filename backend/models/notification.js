const { DataTypes } = require('sequelize'); 

const notificationModel = (sequelize) => {
    const Notification = sequelize.define('Notification', {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      message: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      isRead: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    });
  

  
    return Notification;
  };
  
  module.exports = notificationModel;
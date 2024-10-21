const { DataTypes } = require('sequelize');

const EvaluationModel = (sequelize) => {
    const Evaluation = sequelize.define('Evaluation', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        dateevaluation: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        score: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        commentaire: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        userId: {
            type: DataTypes.INTEGER, 
            allowNull: false,
          },
    });

    return Evaluation;
};

module.exports = EvaluationModel;

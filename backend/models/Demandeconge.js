const DataTypes = require('sequelize');

const demandecongeModel = (sequelize) => {
    const DemandeConge = sequelize.define('DemandeConge', {
        datedebut: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        datefin: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        typeconge: {
            type: DataTypes.ENUM('Paid', 'unpaid', 'sick', 'Maternity'),
            allowNull: false,
        },
        statut: {
            type: DataTypes.ENUM('pending', 'approved', 'rejected'),
            allowNull: false,
        },
        motif: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        datedemande: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        userId: {
          type: DataTypes.INTEGER, 
          allowNull: false,
        },
    });

    return DemandeConge;
}

module.exports = demandecongeModel;

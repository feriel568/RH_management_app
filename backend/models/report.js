const {DataTypes} =require('sequelize');
const reportModel=(sequelize)=>{
    const report=sequelize.define('Report',{
        
        typerapport:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        dategeneration:{
            type:DataTypes.DATE,
            allowNull:false,
        },
        contenu:{
            type:DataTypes.TEXT,
            allowNull:false,
        },
        userId:{
            type:DataTypes.INTEGER,
            allowNull:false,
        }
    });
    return report;
};
module.exports=reportModel;
    
    
const express = require('express');
const dotenv = require('dotenv');
const mysql = require('mysql');

const {Sequelize , DataTypes } = require('sequelize');





dotenv.config()
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    port: process.env.DB_PORT
});

// Test the connection
sequelize.authenticate()
    .then(() => {
        console.log('Connection to MySQL using Sequelize has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

   
    
    const defineDepartmentModel = require('./models/department');
    const defineUserModel = require('./models/user');
    const Department = defineDepartmentModel(sequelize);
    const User = defineUserModel(sequelize);
    
    Department.hasMany(User, {
      as: 'users', 
      foreignKey: 'departmentId', 
    });
    
  
    User.belongsTo(Department, {
      as: 'department', 
      foreignKey: 'departmentId', 
    });
    
    sequelize.sync()
      .then(() => {
        console.log('Database synced successfully.');
      })
      .catch(err => {
        console.error('Error syncing database:', err);
      });
    
    
const departmentRoutes = require('./routes/departmentRoute'); 

 // Routes 
 app.use('/department', (req, res, next) => {
    req.Department = Department; 
    next();
  }, departmentRoutes);
app.listen(process.env.PORT,()=>{
    console.log('listening on port '+process.env.PORT);
})
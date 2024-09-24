const express = require('express');
const dotenv = require('dotenv');
const mysql = require('mysql');

const {Sequelize} = require('sequelize');


dotenv.config()
const app = express();

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
app.listen(process.env.PORT,()=>{
    console.log('listening on port '+process.env.PORT);
})
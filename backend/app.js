const express = require('express');
const dotenv = require('dotenv');
const mysql = require('mysql');


dotenv.config()
const app = express();

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT 

})

db.connect((err)=>{
    if(err){
        console.log("Error connecting to db",err);
        return;
    }
    console.log("Connected to the MYSQL database");

})
app.listen(process.env.PORT,()=>{
    console.log('listening on port '+process.env.PORT);
})
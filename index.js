//create server and connect to database mysql
const express = require('express');
const app = express();
const mysql = require('mysql');
const bodyParser = require('body-parser');
//const cors = require('cors');

// app.use(cors());
// app.use(bodyParser.json());

//create connection


const db = mysql.createConnection({

    host: 'localhost',
    user: 'root',
    password: 'root',
    
});




//connect to mysql

db.connect((err) => {
    if(err){
        throw err;
    }
    console.log('mysql connected');
});

//
app.listen(process.env.PORT||3000,()=>{
    console.log(`Server is running on Poert ${process.env.PORT||3000} `)
} )



//create database


app.get('/createdb', (req,res) => {

    let sql = 'CREATE DATABASE perimattic_assignment';
    db.query(sql, (err,result) => {
        if(err) throw err;
        console.log(result);
        res.send('database created');
    });
}

);

//create table


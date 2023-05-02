//create server and connect to database mysql
const express = require('express');
const app = express();
const mysql = require('mysql');
const bodyParser = require('body-parser');


const path = require('path');
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })

const axios =require('axios')



 //app.use(bodyParser.json());

//create connection


const db = mysql.createConnection({

    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'perimattic_assignment'
    
});




//connect to mysql

db.connect((err) => {
    if(err){
        throw err;
    }
    console.log('mysql connected');
});

//parse the json body
app.use(express.json());
//


// app.use('/api',route)



app.listen(process.env.PORT||3000,()=>{
    console.log(`Server is running on Poert ${process.env.PORT||3000} `)
} )




//upload data to mysql database=============================
app.get('/getdata', async function (req, res)  {
    const data = await axios.get('https://api.publicapis.org/entries')
    console.log(data.data.entries)
    const {entries} = data.data
    entries.forEach(async (element) => {
        const {API,Description,Auth,HTTPS,Cors,Link,Category} = element
        const data = await db.query("INSERT INTO api set API =? ,Description=?,Auth=?,HTTPS=?,Cors=?,Link=?,Category=?",[API,Description,Auth,HTTPS,Cors,Link,Category]);
    });
    res.send({})

})
















//=======================================================================
app.post('/insertUser', (req, res) => {
    // Get data from the request body
    console.log(req.body)
    const { name, email, phone, address } = req.body;
  
    // Insert data into the USER table
    const data = { name, email, phone, address };
    db.query('INSERT INTO USER SET ?', data, (err, result) => {
      if (err) throw err;
      console.log('Data inserted into USER table!');
  
      // Send response to client
      res.status(201).send('User created!');
    });
  });


  // get USERS===================================================================
    app.get('/getUsers', (req, res) => {
        // Get data from the database
        db.query('SELECT * FROM USER', (err, result) => {
            if (err) throw err;
            console.log(result);
            res.send(result);
        });
    });


    // get USER by id===================================================================
    app.get('/getUser/:id', (req, res) => {
        // Get data from the database
        db.query('SELECT * FROM USER WHERE id = ?', [req.params.id], (err, result) => {
            if (err) throw err;
            console.log(result);
            res.send(result);
        });
    });


    // update USER by id==================================================================
    app.put('/updateUser/:id', (req, res) => {
        // Get data from the request body
        const { name, email, phone, address } = req.body;
        // Get data from the database
        db.query(
            'UPDATE USER SET name = ?, email = ?, phone = ?, address = ? WHERE id = ?',
            [name, email, phone, address, req.params.id],
            (err, result) => {
                if (err) throw err;
                console.log(result);
                res.send(result);
            }
        );
            
    });


    // delete USER by id============================================================
    app.delete('/deleteUser/:id', (req, res) => {
        // Get data from the database
        db.query('DELETE FROM USER WHERE id = ?', [req.params.id], (err, result) => {
            if (err) throw err;
            console.log(result);
            res.send(result);
        });
    });



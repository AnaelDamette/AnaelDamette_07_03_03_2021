const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/user.js');
//const postRoutes = require('./routes/post.js');
const path = require('path');
const app = express();
const mysql = require('mysql');

const db = mysql.createConnection({
    host: "localhost",
    user: "groupoAdmin",
    password: "Pourquoi"
});

db.connect(function(err) {
    if(err) throw err;
    console.log("Vous êtes connecté à la base de donnée de Groupo'Twit");
})

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(bodyParser.json());
app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/api/auth', userRoutes);
//app.use('/api/post', postRoutes);

module.exports = app;
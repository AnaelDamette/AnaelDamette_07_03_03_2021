const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/user.js');
//const postRoutes = require('./routes/post.js');
const path = require('path');
const app = express();
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize("GroupoTwit", "groupoAdmin", "pourquoi", {
    dialect: "mysql",
    host: "localhost"
});

try {
    sequelize.authenticate();
    console.log('Connecté à la base de données MySQL!');
  } catch (error) {
    console.error('Impossible de se connecter, erreur suivante :', error);
  }
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
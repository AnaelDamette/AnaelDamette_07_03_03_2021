const bcrypt = require('bcrypt');
const User = require('../models/user.js');
const jwt = require('jsonwebtoken');
const models = require('../models');
let verifInput = require('../utils/verifInputs');
//let utils = require('../utils/jwtUtils');
const e = require('express');

var crypto = require('crypto'),
  algorithm = 'aes-256-ctr',
  password = 'aes-256-ctr';

function encrypt(text) {
  var cipher = crypto.createCipher(algorithm, password)
  var crypted = cipher.update(text, 'utf8', 'hex')
  crypted += cipher.final('hex');
  return crypted;
}

exports.signup = (req, res, next) => {
  // Valider les paramètres de la requète
  let mail = encrypt(req.body.mail);
  let username = req.body.username;
  let password = req.body.password;

  if (mail == null || username == null || password == null) {
    res.status(400).json({ error: 'il manque un paramètre' })
  }

  //TO DO => Vérification des saisies user
  let mailOk = verifInput.validEmail(req.body.mail);
  console.log("verif mail " + mailOk)
  let mdpOK = verifInput.validPassword(password);
  console.log("verif mdp " + mdpOK)
  let usernameOk = verifInput.validUsername(username);
  console.log("verif username " + usernameOk)
  if (mailOk == true && mdpOK == true && usernameOk == true) {
    //Vérification si user n'existe pas déjà
    //TO DO => Vérifier l'username et l'email
    models.User.findOne({
      attributes: ['username'],
      where: { username: username }
    })
      .then(() => {
        models.User.findOne({
          attributes: ['mail'],
          where: { mail: mail }
        })
      })
      .catch(error => {
        res.status(409).json({ error: 'mail' })
      })
      .then(user => {
        if (!user) {
          bcrypt.hash(password, 10)
            .then(hash => {
              let newUser = models.User.create({
                username: req.body.username,
                mail: mail,
                password: hash,
                isAdmin: false
              })
                .then(newUser => {
                  res.status(201).json({ 'Utilisateur crée ! id : ': newUser.id })
                  
                })
                .catch(error => {
                  res.status(409).json({ error: 'test pour voir sinon' })
                });
            })
            .catch(error => { res.status(500).json({ error }) })
        } else { res.status(409).json({ error: 'Cette utilisateur existe déjà' }) }
      })
      .catch(error => {
        res.status(409).json({ error: 'test pour voir si ' })
      })
  } else {
    console.log("la condition n'est pas remplis :Kappa");
  }
}
exports.login = (req, res, next) => {
  let username = req.body.username;
  let password = req.body.password;

  if (username == null || password == null) {
    res.status(400).json({ error: "Le document n'est pas complet" })
  }
  models.User.findOne({
    where: { username }
  })
    .then(user => {
      if (!user) {
        return res.status(404).json({ error: 'Utilisateur non trouvé !' });
      }
      bcrypt.compare(req.body.password, user.password)
        .then(valid => {
          if (!valid) {
            return res.status(403).json({ error: 'Mot de passe incorrect !' });
          }
          res.status(200).json({
            userId: user._id,
            token: jwt.sign(
              { userId: user._id },
              'RANDOM_TOKEN_SECRET',
              { expiresIn: '24h' }
            )
          });
        })
        .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};

//obtenir le profil d'un utilisateur 
exports.userProfil = (req, res) => {
  let id = utils.getUserId(req.headers.authorization)
  models.User.findOne({
      attributes: ['id', 'email', 'username','isAdmin'],
      where: { id: id }
  })
      .then(user => res.status(200).json(user))
      .catch(error => res.status(500).json(error))
};


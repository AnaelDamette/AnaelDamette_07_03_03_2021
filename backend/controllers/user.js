const bcrypt = require('bcrypt');
const User = require('../models/user.js');
const jwt = require('jsonwebtoken');
const models = require('../models')

var crypto = require('crypto'),
    algorithm = 'aes-256-ctr',
    password = 'aes-256-ctr';

function encrypt(text){
  var cipher = crypto.createCipher(algorithm,password)
  var crypted = cipher.update(text,'utf8','hex')
  crypted += cipher.final('hex');
  return crypted;
}

exports.signup = (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
    .then(hash => {
      let newUser = models.User.create({
        pseudo : req.body.pseudo,
        mail: encrypt(req.body.mail),
        password: hash,
        isAdmin : false
      })
        .then(newUser => res.status(201).json({ 'Utilisateur crée ! id : ': newUser.id }))
        .catch(error => {res.status(400).json({ error })});
    })
    .catch(error => res.status(500).json({ error }));
};
exports.login = (req, res, next) => {
  User.findOne({ email: encrypt(req.body.email) })
    .then(user => {
      if (!user) {
        return res.status(401).json({ error: 'Utilisateur non trouvé !' });
      }
      bcrypt.compare(req.body.password, user.password)
        .then(valid => {
          if (!valid) {
            return res.status(401).json({ error: 'Mot de passe incorrect !' });
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
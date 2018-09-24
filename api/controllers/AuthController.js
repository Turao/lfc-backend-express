'use strict'
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserController = require('./UserController');
const UserModel = require('../models/UserModel');


let AuthController = {

  signup: function (req, res) {
    bcrypt.hash(req.body.user.password, 10)
    .then( hash => {
      req.body.user.password = hash;
      UserController.create(req, res);
    })
    .catch( err => { 
      res.sendStatus(500); // internal error
      })
    },

    login: function (req, res) {
      UserModel.findOne({email: req.body.user.email})
      .exec()
      .then( user => {
        bcrypt.compare(user.password, req.body.user.password)
        .then( result => {
          // create jwt token
            let __superPrivateSecretKey = 'geromito';
            const JWTToken = jwt.sign({
              _id: user._id,
              email: user.email,
            }, __superPrivateSecretKey, {'expiresIn': '2h'});
            
            res.status(200).json({
              token: JWTToken,
            });
          })
      })
      .catch( err => {
        res.sendStatus(401); // unauthorized access
      })
  },

  authorize: function (req, res, next) {
    jwt.verify(req.headers.token, 'geromito', function(err, decoded) {
      if (err) { 
        res.sendStatus(401); // unauthorized access
      }
      else {
        next();
      } 
    })
  },

}



module.exports = AuthController;
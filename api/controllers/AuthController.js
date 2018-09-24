'use strict'
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserController = require('./UserController');
const UserModel = require('../models/UserModel');


let AuthController = {

  signup: async function (req, res) {
    try {
      let hash = await bcrypt.hash(req.body.user.password, 10);
      req.body.user.password = hash;
      UserController.create(req, res);
    } catch (err) {
      res.sendStatus(500); // internal error
    }
  },

    login: async function (req, res) {
      try {
        let user = await UserModel.findOne({email: req.body.user.email}).exec();
        let isSamePassword = await bcrypt.compare(req.body.user.password, user.password);
        if (isSamePassword) {
          let __superPrivateSecretKey = 'geromito';
          const JWTToken = jwt.sign({
            _id: user._id,
            email: user.email,
          }, __superPrivateSecretKey, {'expiresIn': '2h'});
          
          res.status(200).json({
            token: JWTToken,
          });
        }
        else {
          throw Error('Unauthorized Access'); // unauthorized access
        }
      } catch (err) {
        res.sendStatus(401); // unauthorized access 
      }
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
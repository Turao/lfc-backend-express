const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserController = require('./UserController');
const UserModel = require('../models/UserModel');


const AuthController = {

  signup: async (req, res) => {
    try {
      const hash = await bcrypt.hash(req.body.user.password, 10);
      req.body.user.password = hash;
      UserController.create(req, res);
    } catch (err) {
      res.sendStatus(500); // internal error
    }
  },

  login: async (req, res) => {
    try {
      const user = await UserModel.findOne({ email: req.body.user.email }).exec();
      const isSamePassword = await bcrypt.compare(req.body.user.password, user.password);
      if (isSamePassword) {
        const superPrivateSecretKey = 'geromito';
        const JWTToken = jwt.sign({
          // eslint-disable-next-line no-underscore-dangle
          _id: user._id,
          email: user.email,
        }, superPrivateSecretKey, { expiresIn: '2h' });

        res.status(200).json({
          token: JWTToken,
        });
      } else {
        throw Error('Unauthorized Access'); // unauthorized access
      }
    } catch (err) {
      res.sendStatus(401); // unauthorized access
    }
  },

  authorize: (req, res, next) => {
    jwt.verify(req.headers.token, 'geromito', (err) => {
      if (err) {
        res.sendStatus(401); // unauthorized access
      } else {
        next();
      }
    });
  },

};


module.exports = AuthController;

'use strict'
const UserModel = require('../models/UserModel');

let UserController = {
  get: function (req, res) {
    console.log('getting user of id:', req.params.id);
    
    UserModel.findById(req.params.id)
      .exec()
      .then( user => {
        if (!user) res.sendStatus(404); // not found
        else {
          user = user.toObject(); // otherwise cannot delete mongoose object properties
          delete user.password;
          res.json(user);
        } 
      })
      .catch( err => {
        res.sendStatus(400); // bad request
      })
  },


  create: function (req, res) {
    console.log('creating user:', req.body.user);

    let user = req.body.user;
    UserModel.create(user)
      .then( user => {
        res.sendStatus(200); // ok
      })
      .catch( err => {
        res.sendStatus(400); // bad request
      })
  },


  update: function (req, res) {
    console.log('updating user of id:', req.params.id);
    
    let user = req.body.user;
    UserModel.updateOne({_id: req.params.id}, user)
    .exec()
    .then( user => {
      res.sendStatus(200); // ok
    })
    .catch( err => {
      res.sendStatus(400); // bad request
    })
  },

  
  remove: function (req, res) {
    console.log('removing user of id:', req.params.id);
    
    UserModel.remove({_id: req.params.id})
    .exec()
    .then( user => {
      res.sendStatus(200); // ok
    })
    .catch( err => {
      res.sendStatus(400); // bad request
    })
  },


}


module.exports = UserController;
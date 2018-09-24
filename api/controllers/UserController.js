'use strict'
const UserModel = require('../models/UserModel');

let UserController = {
  get: function (req, res) {
    console.log('getting user of id:', req.params.id);
    
    UserModel.findById(req.params.id, (err, user) => {
      if (err) {
        res.sendStatus(400); // bad request
        return
      }

      if (!user) { 
        res.sendStatus(404);
        return // not found
      }

      res.json(user);
      return
    });
  },


  create: function (req, res) {
    console.log('creating user:', req.body.user);

    let user = req.body.user;
    UserModel.create(user, (err, user) => {
      if(err) { 
        res.sendStatus(400); // bad request
        return
      }

      res.sendStatus(200); // ok
      return
    });
  },


  update: function (req, res) {
    console.log('updating user of id:', req.params.id);
    
    let user = req.body.user;
    UserModel.updateOne({_id: req.params.id}, user, (err, user) => {
      if(err) { 
        res.sendStatus(400); // bad request
        return
      }
      
      res.sendStatus(200); // ok
      return
    });
  },

  
  remove: function (req, res) {
    console.log('removing user of id:', req.params.id);
    
    UserModel.remove({_id: req.params.id}, (err, user) => {
      if(err) { 
        res.sendStatus(400); // bad request
        return
      }
      
      res.sendStatus(200); // ok
      return
    });
  },


}


module.exports = UserController;
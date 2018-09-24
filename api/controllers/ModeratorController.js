'use strict'
const ModeratorModel = require('../models/ModeratorModel');
const UserModel = require('../models/UserModel');


let ModeratorController = {
  get: function (req, res) {
    console.log('getting moderator of id:', req.params.id);
    
    moderatorModel.findById(req.params.id, (err, moderator) => {
      if (err) {
        res.sendStatus(400); // bad request
        return
       };
      if (!moderator) { 
        res.sendStatus(404); // not found
        return
      }
      else {
        res.json(moderator);
        return
      }
    });
  },


  create: function (req, res) {
    console.log('creating moderator');
    
    UserModel.findById(req.body.moderator.user.id, (err, user) => {
      if (err | !user) {
        res.sendStatus(400); // bad request
        return
      }
      
      let moderator = req.body.moderator;
      moderator.user = user;
      moderatorModel.create(moderator, (err, moderator) => {
        if(err) { 
          res.sendStatus(400); // bad request
          return
        }
        
        res.sendStatus(200); // ok
        return
      });
    });


  },


  update: function (req, res) {
    console.log('updating moderator of id:', req.params.id);
    
    UserModel.findById(req.body.moderator.user.id, (err, user) => {
      if (err | !user) {
        res.sendStatus(400); // bad request
        return
      }
      
      let moderator = req.body.moderator;
      moderator.user = user;
      moderatorModel.update({_id: req.params.id}, moderator, (err, moderator) => {
        if(err) { 
          res.sendStatus(400); // bad request
          return
        }
        
        res.sendStatus(200); // ok
        return
      });
    });
  },

  
  remove: function (req, res) {
    console.log('removing moderator of id:', req.params.id);
    
    moderatorModel.remove({_id: req.params.id}, (err, moderator) => {
      if(err) { 
        res.sendStatus(400); // bad request
        return
      }

      res.sendStatus(200); // ok
      return
    });
  },


}


module.exports = ModeratorController;
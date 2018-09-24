'use strict'
const CheckerModel = require('../models/CheckerModel');
const UserModel = require('../models/UserModel');


let CheckerController = {
  get: function (req, res) {
    console.log('getting checker of id:', req.params.id);
    
    CheckerModel.findById(req.params.id, (err, checker) => {
      if (err) {
        res.sendStatus(400); // bad request
        return
       };
      if (!checker) { 
        res.sendStatus(404); // not found
        return
      }
      else {
        res.json(checker);
        return
      }
    });
  },


  create: function (req, res) {
    console.log('creating checker');
    
    UserModel.findById(req.body.checker.user.id, (err, user) => {
      if (err | !user) {
        res.sendStatus(400); // bad request
        return
      }
      
      let checker = req.body.checker;
      checker.user = user;
      CheckerModel.create(checker, (err, checker) => {
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
    console.log('updating checker of id:', req.params.id);
    
    UserModel.findById(req.body.checker.user.id, (err, user) => {
      if (err | !user) {
        res.sendStatus(400); // bad request
        return
      }
      
      let checker = req.body.checker;
      checker.user = user;
      CheckerModel.update({_id: req.params.id}, checker, (err, checker) => {
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
    console.log('removing checker of id:', req.params.id);
    
    CheckerModel.remove({_id: req.params.id}, (err, checker) => {
      if(err) { 
        res.sendStatus(400); // bad request
        return
      }

      res.sendStatus(200); // ok
      return
    });
  },


}


module.exports = CheckerController;
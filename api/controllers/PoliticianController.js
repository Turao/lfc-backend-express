'use strict'
const politicianModel = require('../models/politicianModel');
const UserModel = require('../models/UserModel');


let PoliticianController = {
  get: function (req, res) {
    console.log('getting politician of id:', req.params.id);
    
    politicianModel.findById(req.params.id, (err, politician) => {
      if (err) {
        res.sendStatus(400); // bad request
        return
       };
      if (!politician) { 
        res.sendStatus(404); // not found
        return
      }
      else {
        res.json(politician);
        return
      }
    });
  },


  create: function (req, res) {
    console.log('creating politician');
    
    UserModel.findById(req.body.politician.user.id, (err, user) => {
      if (err | !user) {
        res.sendStatus(400); // bad request
        return
      }
      
      let politician = req.body.politician;
      politician.user = user;
      politicianModel.create(politician, (err, politician) => {
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
    console.log('updating politician of id:', req.params.id);
    
    UserModel.findById(req.body.politician.user.id, (err, user) => {
      if (err | !user) {
        res.sendStatus(400); // bad request
        return
      }
      
      let politician = req.body.politician;
      politician.user = user;
      politicianModel.update({_id: req.params.id}, politician, (err, politician) => {
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
    console.log('removing politician of id:', req.params.id);
    
    politicianModel.remove({_id: req.params.id}, (err, politician) => {
      if(err) { 
        res.sendStatus(400); // bad request
        return
      }

      res.sendStatus(200); // ok
      return
    });
  },


}


module.exports = PoliticianController;
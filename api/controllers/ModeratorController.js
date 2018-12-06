'use strict'
const ModeratorModel = require('../models/ModeratorModel');

let ModeratorController = {
  get: function (req, res) {
    console.log('getting moderator of id:', req.params.id);
    
    ModeratorModel.findById(req.params.id)
      .populate('user')
      .exec()
      .then( moderator => {
        if (!moderator) res.sendStatus(404); // not found
        else res.json(moderator);
      })
      .catch( err => {
        res.sendStatus(400); // bad request
      })
  },


  create: function (req, res) {
    console.log('creating moderator:', req.body.moderator);

    let moderator = req.body.moderator;
    ModeratorModel.create(moderator)
      .then( moderator => {
        res.sendStatus(200); // ok   
      })
      .catch( err => {
        console.error(err);
        res.sendStatus(400); // bad request
      })
  },


  update: function (req, res) {
    console.log('updating moderator of id:', req.params.id);
    
    let moderator = req.body.moderator;
    ModeratorModel.updateOne({_id: req.params.id}, moderator)
    .exec()
    .then( moderator => {
      res.sendStatus(200); // ok
    })
    .catch( err => {
      res.sendStatus(400); // bad request
    })
  },

  
  remove: function (req, res) {
    console.log('removing moderator of id:', req.params.id);
    
    ModeratorModel.remove({_id: req.params.id})
    .exec()
    .then( moderator => {
      res.sendStatus(200); // ok
    })
    .catch( err => {
      res.sendStatus(400); // bad request
    })
  },


}


module.exports = ModeratorController;
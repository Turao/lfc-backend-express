'use strict'
const PartyModel = require('../models/PartyModel');

let PartyController = {
  get: function (req, res) {
    console.log('getting party of id:', req.params.id);
    
    PartyModel.findById(req.params.id)
      .exec()
      .then( party => {
        if (!party) res.sendStatus(404); // not found
        else res.json(party);
      })
      .catch( err => {
        res.sendStatus(400); // bad request
      })
  },


  create: function (req, res) {
    console.log('creating party:', req.body.party);

    let party = req.body.party;
    PartyModel.create(party)
      .then( party => {
        res.sendStatus(200); // ok
      })
      .catch( err => {
        res.sendStatus(400); // bad request
      })
  },


  update: function (req, res) {
    console.log('updating party of id:', req.params.id);
    
    let party = req.body.party;
    PartyModel.updateOne({_id: req.params.id}, party).exec()
    .then( party => {
      res.sendStatus(200); // ok
    })
    .catch( err => {
      res.sendStatus(400); // bad request
    })
  },

  
  remove: function (req, res) {
    console.log('removing party of id:', req.params.id);
    
    PartyModel.remove({_id: req.params.id}).exec()
    .then( party => {
      res.sendStatus(200); // ok
    })
    .catch( err => {
      res.sendStatus(400); // bad request
    })
  },


}


module.exports = PartyController;
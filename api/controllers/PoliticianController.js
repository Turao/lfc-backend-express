'use strict'
const PoliticianModel = require('../models/PoliticianModel');

let PoliticianController = {
  get: function (req, res) {
    console.log('getting politician of id:', req.params.id);
    
    PoliticianModel.findById(req.params.id)
      .populate('user')
      .populate('party')
      .exec()
      .then( politician => {
        if (!politician) res.sendStatus(404); // not found
        else res.json(politician);
      })
      .catch( err => {
        res.sendStatus(400); // bad request
      })
  },


  create: function (req, res) {
    console.log('creating politician:', req.body.politician);

    let politician = req.body.politician;
    PoliticianModel.create(politician)
      .then( politician => {
        res.sendStatus(200); // ok
      })
      .catch( err => {
        res.sendStatus(400); // bad request
      })
  },


  update: function (req, res) {
    console.log('updating politician of id:', req.params.id);
    
    let politician = req.body.politician;
    PoliticianModel.updateOne({_id: req.params.id}, politician)
    .exec()
    .then( politician => {
      res.sendStatus(200); // ok
    })
    .catch( err => {
      res.sendStatus(400); // bad request
    })
  },

  
  remove: function (req, res) {
    console.log('removing politician of id:', req.params.id);
    
    PoliticianModel.remove({_id: req.params.id})
    .exec()
    .then( politician => {
      res.sendStatus(200); // ok
    })
    .catch( err => {
      res.sendStatus(400); // bad request
    })
  },


}


module.exports = PoliticianController;
'use strict'
const FactCheckModel = require('../models/FactCheckModel');

let FactCheckController = {
  get: function (req, res) {
    console.log('getting factCheck of id:', req.params.id);
    
    FactCheckModel.findById(req.params.id)
      .exec()
      .then( factCheck => {
        if (!factCheck) res.sendStatus(404); // not found
        else res.json(factCheck);
      })
      .catch( err => {
        res.sendStatus(400); // bad request
      })
  },


  create: function (req, res) {
    console.log('creating factCheck:', req.body.factCheck);

    let factCheck = req.body.factCheck;
    FactCheckModel.create(factCheck)
      .then( factCheck => {
        res.sendStatus(200); // ok
      })
      .catch( err => {
        res.sendStatus(400); // bad request
      })
  },


  update: function (req, res) {
    console.log('updating factCheck of id:', req.params.id);
    
    let factCheck = req.body.factCheck;
    FactCheckModel.updateOne({_id: req.params.id}, factCheck)
    .exec()
    .then( factCheck => {
      res.sendStatus(200); // ok
    })
    .catch( err => {
      res.sendStatus(400); // bad request
    })
  },

  
  remove: function (req, res) {
    console.log('removing factCheck of id:', req.params.id);
    
    FactCheckModel.remove({_id: req.params.id})
    .exec()
    .then( factCheck => {
      res.sendStatus(200); // ok
    })
    .catch( err => {
      res.sendStatus(400); // bad request
    })
  },


}


module.exports = FactCheckController;
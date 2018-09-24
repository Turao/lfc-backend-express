'use strict'
const StatementModel = require('../models/StatementModel');

let StatementController = {
  get: function (req, res) {
    console.log('getting statement of id:', req.params.id);
    
    StatementModel.findById(req.params.id)
      .populate('politician')
      .populate('event')
      .exec()
      .then( statement => {
        if (!statement) res.sendStatus(404); // not found
        else res.json(statement);
      })
      .catch( err => {
        res.sendStatus(400); // bad request
      })
  },


  create: function (req, res) {
    console.log('creating statement:', req.body.statement);

    let statement = req.body.statement;
    StatementModel.create(statement)
      .then( statement => {
        res.sendStatus(200); // ok
      })
      .catch( err => {
        res.sendStatus(400); // bad request
      })
  },


  update: function (req, res) {
    console.log('updating statement of id:', req.params.id);
    
    let statement = req.body.statement;
    StatementModel.updateOne({_id: req.params.id}, statement)
    .exec()
    .then( statement => {
      res.sendStatus(200); // ok
    })
    .catch( err => {
      res.sendStatus(400); // bad request
    })
  },

  
  remove: function (req, res) {
    console.log('removing statement of id:', req.params.id);
    
    StatementModel.remove({_id: req.params.id})
    .exec()
    .then( statement => {
      res.sendStatus(200); // ok
    })
    .catch( err => {
      res.sendStatus(400); // bad request
    })
  },


}


module.exports = StatementController;
'use strict'
const CheckerModel = require('../models/CheckerModel');

let CheckerController = {
  get: function (req, res) {
    console.log('getting checker of id:', req.params.id);
    
    CheckerModel.findById(req.params.id)
      .exec()
      .then( checker => {
        if (!checker) res.sendStatus(404); // not found
        else res.json(checker);
      })
      .catch( err => {
        res.sendStatus(400); // bad request
      })
  },


  create: function (req, res) {
    console.log('creating checker:', req.body.checker);

    let checker = req.body.checker;
    CheckerModel.create(checker)
      .then( checker => {
        res.sendStatus(200); // ok
      })
      .catch( err => {
        res.sendStatus(400); // bad request
      })
  },


  update: function (req, res) {
    console.log('updating checker of id:', req.params.id);
    
    let checker = req.body.checker;
    CheckerModel.updateOne({_id: req.params.id}, checker)
    .exec()
    .then( checker => {
      res.sendStatus(200); // ok
    })
    .catch( err => {
      res.sendStatus(400); // bad request
    })
  },

  
  remove: function (req, res) {
    console.log('removing checker of id:', req.params.id);
    
    CheckerModel.remove({_id: req.params.id})
    .exec()
    .then( checker => {
      res.sendStatus(200); // ok
    })
    .catch( err => {
      res.sendStatus(400); // bad request
    })
  },


}


module.exports = CheckerController;
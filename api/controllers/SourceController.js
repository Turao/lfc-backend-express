'use strict'
const SourceModel = require('../models/SourceModel');

let SourceController = {
  get: function (req, res) {
    console.log('getting source of id:', req.params.id);
    
    SourceModel.findById(req.params.id)
      .populate('factCheck')
      .exec()
      .then( source => {
        if (!source) res.sendStatus(404); // not found
        else res.json(source);
      })
      .catch( err => {
        res.sendStatus(400); // bad request
      })
  },


  create: function (req, res) {
    console.log('creating source:', req.body.source);

    let source = req.body.source;
    SourceModel.create(source)
      .then( source => {
        res.sendStatus(200); // ok
      })
      .catch( err => {
        res.sendStatus(400); // bad request
      })
  },


  update: function (req, res) {
    console.log('updating source of id:', req.params.id);
    
    let source = req.body.source;
    SourceModel.updateOne({_id: req.params.id}, source)
    .exec()
    .then( source => {
      res.sendStatus(200); // ok
    })
    .catch( err => {
      res.sendStatus(400); // bad request
    })
  },

  
  remove: function (req, res) {
    console.log('removing source of id:', req.params.id);
    
    SourceModel.remove({_id: req.params.id})
    .exec()
    .then( source => {
      res.sendStatus(200); // ok
    })
    .catch( err => {
      res.sendStatus(400); // bad request
    })
  },


}


module.exports = SourceController;
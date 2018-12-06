'use strict'
const EventModel = require('../models/EventModel');

let EventController = {
  getLatest: function(req, res) {
    console.log('getting latest events');
    EventModel.find({}, null, {sort : {'created_at': -1}, limit: 20})
      .populate('organization', 'name')
      .then( events => {
        res.status(200).json({events});
      })
      .catch( err => {
        res.sendStatus(500); // internal error
      })
  },


  get: function (req, res) {
    console.log('getting event of id:', req.params.id);
    
    EventModel.findById(req.params.id)
      .populate('organization')
      .exec()
      .then( event => {
        if (!event) res.sendStatus(404); // not found
        else res.json(event);
      })
      .catch( err => {
        res.sendStatus(400); // bad request
      })
  },


  create: function (req, res) {
    console.log('creating event:', req.body.event);

    let event = req.body.event;
    EventModel.create(event)
      .then( event => {
        res.sendStatus(200); // ok
        })
      .catch( err => {
        res.sendStatus(400); // bad request
      })
  },


  update: function (req, res) {
    console.log('updating event of id:', req.params.id);
    
    let event = req.body.event;
    EventModel.updateOne({_id: req.params.id}, event)
    .exec()
    .then( event => {
      res.sendStatus(200); // ok
    })
    .catch( err => {
      res.sendStatus(400); // bad request
    })
  },

  
  remove: function (req, res) {
    console.log('removing event of id:', req.params.id);
    
    EventModel.remove({_id: req.params.id})
    .exec()
    .then( event => {
      res.sendStatus(200); // ok
    })
    .catch( err => {
      res.sendStatus(400); // bad request
    })
  },


}


module.exports = EventController;
'use strict'
const OrganizationModel = require('../models/OrganizationModel');

let OrganizationController = {
  get: function (req, res) {
    console.log('getting organization of id:', req.params.id);
    
    OrganizationModel.findById(req.params.id)
      .exec()
      .then( organization => {
        if (!organization) res.sendStatus(404); // not found
        else res.json(organization);
      })
      .catch( err => {
        res.sendStatus(400); // bad request
      })
  },


  create: function (req, res) {
    console.log('creating organization:', req.body.organization);

    let organization = req.body.organization;
    OrganizationModel.create(organization)
      .then( organization => {
        res.sendStatus(200); // ok
      })
      .catch( err => {
        res.sendStatus(400); // bad request
      })
  },


  update: function (req, res) {
    console.log('updating organization of id:', req.params.id);
    
    let organization = req.body.organization;
    OrganizationModel.updateOne({_id: req.params.id}, organization)
    .exec()
    .then( organization => {
      res.sendStatus(200); // ok
    })
    .catch( err => {
      res.sendStatus(400); // bad request
    })
  },

  
  remove: function (req, res) {
    console.log('removing organization of id:', req.params.id);
    
    OrganizationModel.remove({_id: req.params.id})
    .exec()
    .then( organization => {
      res.sendStatus(200); // ok
    })
    .catch( err => {
      res.sendStatus(400); // bad request
    })
  },


}


module.exports = OrganizationController;
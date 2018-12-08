const PartyModel = require('../models/PartyModel');

const PartyController = {
  get: (req, res) => {
    console.log('getting party of id:', req.params.id);

    PartyModel.findById(req.params.id)
      .exec()
      .then((party) => {
        if (!party) res.sendStatus(404); // not found
        else res.json(party);
      })
      .catch(() => {
        res.sendStatus(400); // bad request
      });
  },


  create: (req, res) => {
    console.log('creating party:', req.body.party);

    const { party } = req.body;
    PartyModel.create(party)
      .then(() => {
        res.sendStatus(200); // ok
      })
      .catch(() => {
        res.sendStatus(400); // bad request
      });
  },


  update: (req, res) => {
    console.log('updating party of id:', req.params.id);

    const { party } = req.body;
    PartyModel.updateOne({ _id: req.params.id }, party)
      .exec()
      .then(() => {
        res.sendStatus(200); // ok
      })
      .catch(() => {
        res.sendStatus(400); // bad request
      });
  },


  remove: (req, res) => {
    console.log('removing party of id:', req.params.id);

    PartyModel.remove({ _id: req.params.id })
      .exec()
      .then(() => {
        res.sendStatus(200); // ok
      })
      .catch(() => {
        res.sendStatus(400); // bad request
      });
  },
};

module.exports = PartyController;

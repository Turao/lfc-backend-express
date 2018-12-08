const StatementModel = require('../models/StatementModel');

const StatementController = {
  get: (req, res) => {
    console.log('getting statement of id:', req.params.id);

    StatementModel.findById(req.params.id)
      .populate('politician')
      .populate('event')
      .exec()
      .then((statement) => {
        if (!statement) res.sendStatus(404); // not found
        else res.json(statement);
      })
      .catch(() => {
        res.sendStatus(400); // bad request
      });
  },


  create: (req, res) => {
    console.log('creating statement:', req.body.statement);

    const { statement } = req.body;
    StatementModel.create(statement)
      .then(() => {
        res.sendStatus(200); // ok
      })
      .catch(() => {
        res.sendStatus(400); // bad request
      });
  },


  update: (req, res) => {
    console.log('updating statement of id:', req.params.id);

    const { statement } = req.body;
    StatementModel.updateOne({ _id: req.params.id }, statement)
      .exec()
      .then(() => {
        res.sendStatus(200); // ok
      })
      .catch(() => {
        res.sendStatus(400); // bad request
      });
  },


  remove: (req, res) => {
    console.log('removing statement of id:', req.params.id);

    StatementModel.remove({ _id: req.params.id })
      .exec()
      .then(() => {
        res.sendStatus(200); // ok
      })
      .catch(() => {
        res.sendStatus(400); // bad request
      });
  },
};

module.exports = StatementController;

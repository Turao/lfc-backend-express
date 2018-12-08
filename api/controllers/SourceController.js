const SourceModel = require('../models/SourceModel');

const SourceController = {
  get: (req, res) => {
    console.log('getting source of id:', req.params.id);

    SourceModel.findById(req.params.id)
      .populate('factCheck')
      .exec()
      .then((source) => {
        if (!source) res.sendStatus(404); // not found
        else res.json(source);
      })
      .catch(() => {
        res.sendStatus(400); // bad request
      });
  },


  create: (req, res) => {
    console.log('creating source:', req.body.source);

    const { source } = req.body;
    SourceModel.create(source)
      .then(() => {
        res.sendStatus(200); // ok
      })
      .catch(() => {
        res.sendStatus(400); // bad request
      });
  },


  update: (req, res) => {
    console.log('updating source of id:', req.params.id);

    const { source } = req.body;
    SourceModel.updateOne({ _id: req.params.id }, source)
      .exec()
      .then(() => {
        res.sendStatus(200); // ok
      })
      .catch(() => {
        res.sendStatus(400); // bad request
      });
  },


  remove: (req, res) => {
    console.log('removing source of id:', req.params.id);

    SourceModel.remove({ _id: req.params.id })
      .exec()
      .then(() => {
        res.sendStatus(200); // ok
      })
      .catch(() => {
        res.sendStatus(400); // bad request
      });
  },
};

module.exports = SourceController;

const FactCheckModel = require('../models/FactCheckModel');

const FactCheckController = {
  get: (req, res) => {
    console.log('getting factCheck of id:', req.params.id);

    FactCheckModel.findById(req.params.id)
      .populate('checker')
      .populate('statement')
      .populate('moderator')
      .populate('source')
      .exec()
      .then((factCheck) => {
        if (!factCheck) res.sendStatus(404); // not found
        else res.json(factCheck);
      })
      .catch(() => {
        res.sendStatus(400); // bad request
      });
  },

  getAll: (req, res) => {
    console.log('getting all factChecks');
    FactCheckModel.find({}, null, { sort: { created_at: -1 } })
      // .populate('user', '-password')
      .then((factChecks) => {
        res.status(200).json(factChecks);
      })
      .catch(() => {
        res.sendStatus(500); // internal error
      });
  },


  create: (req, res) => {
    console.log('creating factCheck:', req.body.factCheck);

    const { factCheck } = req.body;
    FactCheckModel.create(factCheck)
      .then(() => {
        res.sendStatus(200); // ok
      })
      .catch(() => {
        res.sendStatus(400); // bad request
      });
  },


  update: (req, res) => {
    console.log('updating factCheck of id:', req.params.id);

    const { factCheck } = req.body;
    FactCheckModel.updateOne({ _id: req.params.id }, factCheck)
      .exec()
      .then(() => {
        res.sendStatus(200); // ok
      })
      .catch(() => {
        res.sendStatus(400); // bad request
      });
  },


  remove: (req, res) => {
    console.log('removing factCheck of id:', req.params.id);

    FactCheckModel.remove({ _id: req.params.id })
      .exec()
      .then(() => {
        res.sendStatus(200); // ok
      })
      .catch(() => {
        res.sendStatus(400); // bad request
      });
  },
};

module.exports = FactCheckController;

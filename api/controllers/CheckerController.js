const CheckerModel = require('../models/CheckerModel');

const CheckerController = {
  get: (req, res) => {
    console.log('getting checker of id:', req.params.id);

    CheckerModel.findById(req.params.id)
      .populate('user', '-password')
      .exec()
      .then((checker) => {
        if (!checker) res.sendStatus(404); // not found
        else res.json(checker);
      })
      .catch(() => {
        res.sendStatus(400); // bad request
      });
  },


  getAll: (req, res) => {
    console.log('getting all checkers');
    CheckerModel.find({}, null, { sort: { created_at: -1 } })
      .populate('user', '-password')
      .then((checkers) => {
        res.status(200).json(checkers);
      })
      .catch(() => {
        res.sendStatus(500); // internal error
      });
  },


  create: (req, res) => {
    console.log('creating checker:', req.body.checker);

    const { checker } = req.body;
    CheckerModel.create(checker)
      .then(() => {
        res.sendStatus(200); // ok
      })
      .catch(() => {
        res.sendStatus(400); // bad request
      });
  },


  update: (req, res) => {
    console.log('updating checker of id:', req.params.id);

    const { checker } = req.body;
    CheckerModel.updateOne({ _id: req.params.id }, checker)
      .exec()
      .then(() => {
        res.sendStatus(200); // ok
      })
      .catch(() => {
        res.sendStatus(400); // bad request
      });
  },


  remove: (req, res) => {
    console.log('removing checker of id:', req.params.id);

    CheckerModel.remove({ _id: req.params.id })
      .exec()
      .then(() => {
        res.sendStatus(200); // ok
      })
      .catch(() => {
        res.sendStatus(400); // bad request
      });
  },
};

module.exports = CheckerController;

const ModeratorModel = require('../models/ModeratorModel');

const ModeratorController = {
  get: (req, res) => {
    console.log('getting moderator of id:', req.params.id);

    ModeratorModel.findById(req.params.id)
      .populate('user')
      .exec()
      .then((moderator) => {
        if (!moderator) res.sendStatus(404); // not found
        else res.json(moderator);
      })
      .catch(() => {
        res.sendStatus(400); // bad request
      });
  },

  getAll: (req, res) => {
    console.log('getting all moderators');
    ModeratorModel.find({}, null, { sort: { created_at: -1 } })
      .populate('user', '-password')
      .then((moderators) => {
        res.status(200).json(moderators);
      })
      .catch(() => {
        res.sendStatus(500); // internal error
      });
  },


  create: (req, res) => {
    console.log('creating moderator:', req.body.moderator);

    const { moderator } = req.body;
    ModeratorModel.create(moderator)
      .then(() => {
        res.sendStatus(200); // ok
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(400); // bad request
      });
  },


  update: (req, res) => {
    console.log('updating moderator of id:', req.params.id);

    const { moderator } = req.body;
    ModeratorModel.updateOne({ _id: req.params.id }, moderator)
      .exec()
      .then(() => {
        res.sendStatus(200); // ok
      })
      .catch(() => {
        res.sendStatus(400); // bad request
      });
  },


  remove: (req, res) => {
    console.log('removing moderator of id:', req.params.id);

    ModeratorModel.remove({ _id: req.params.id })
      .exec()
      .then(() => {
        res.sendStatus(200); // ok
      })
      .catch(() => {
        res.sendStatus(400); // bad request
      });
  },
};

module.exports = ModeratorController;

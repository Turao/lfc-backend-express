const PoliticianModel = require('../models/PoliticianModel');

const PoliticianController = {
  get: (req, res) => {
    console.log('getting politician of id:', req.params.id);

    PoliticianModel.findById(req.params.id)
      .populate('user', '-password')
      .populate('party')
      .exec()
      .then((politician) => {
        if (!politician) res.sendStatus(404); // not found
        else res.json({ politician });
      })
      .catch(() => {
        res.sendStatus(400); // bad request
      });
  },


  findByName: (req, res) => {
    console.log('getting all politicians matching:', req.params.name);
    const { name } = req.params;
    PoliticianModel.find({ name: { $regex: new RegExp(name, 'i') } })
      .sort({ created_at: -1 })
      .limit(5)
      .populate('user')
      .populate('party')
      .then((politicians) => {
        res.status(200).json({ politicians });
      })
      .catch(() => {
        res.sendStatus(500); // internal error
      });
  },


  getAll: (req, res) => {
    console.log('getting all politicians');
    PoliticianModel.find({}, null, { sort: { created_at: -1 } })
      .populate('user')
      .populate('party')
      .then((politicians) => {
        res.status(200).json({ politicians });
      })
      .catch(() => {
        res.sendStatus(500); // internal error
      });
  },


  create: (req, res) => {
    console.log('creating politician:', req.body.politician);

    const { politician } = req.body;
    PoliticianModel.create(politician)
      // eslint-disable-next-line no-shadow
      .then((politician) => {
        res.status(200).send({ politician }); // ok
      })
      .catch(() => {
        res.sendStatus(400); // bad request
      });
  },


  update: (req, res) => {
    console.log('updating politician of id:', req.params.id);

    const { politician } = req.body;
    PoliticianModel.updateOne({ _id: req.params.id }, politician)
      .exec()
      .then(() => {
        res.sendStatus(200); // ok
      })
      .catch(() => {
        res.sendStatus(400); // bad request
      });
  },


  remove: (req, res) => {
    console.log('removing politician of id:', req.params.id);

    PoliticianModel.remove({ _id: req.params.id })
      .exec()
      .then(() => {
        res.sendStatus(200); // ok
      })
      .catch(() => {
        res.sendStatus(400); // bad request
      });
  },
};

module.exports = PoliticianController;

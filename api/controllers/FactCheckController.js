const FactCheckModel = require('../models/FactCheckModel');

const FactCheckController = {
  getAll: async (req, res) => {
    console.log('getting all factchecks');
    try {
      const factcheck = await FactCheckModel.find({}, null, { sort: { created_at: -1 } })
        .populate('checker')
        .populate('statement')
        .populate('moderator')
        .exec();
      res.status(200).json({ factcheck });
    } catch (err) {
      res.sendStatus(500); // internal error
    }
  },


  get: async (req, res) => {
    console.log('getting factcheck of id:', req.params.id);

    try {
      const factCheck = FactCheckModel.findById(req.params.id)
        .populate('checker')
        .populate('statement')
        .populate('moderator')
        .exec();
      if (!factCheck) res.sendStatus(404); // not found
      else res.json({ factCheck });
    } catch (err) {
      res.sendStatus(400); // bad request
    }
  },


  create: async (req, res) => {
    console.log('creating factCheck:', req.body.factCheck);

    try {
      let { factCheck } = req.body;
      factCheck = await FactCheckModel.create(factCheck);
      res.send({ factCheck });
    } catch (err) {
      res.sendStatus(400); // bad request
    }
  },


  update: async (req, res) => {
    console.log('updating factCheck of id:', req.params.id);

    try {
      const { factCheck } = req.body;
      await FactCheckModel.findByIdAndUpdate(req.params.id, factCheck).exec();
      res.sendStatus(200); // ok
    } catch (err) {
      res.sendStatus(400); // bad request
    }
  },


  remove: async (req, res) => {
    console.log('removing factCheck of id:', req.params.id);

    try {
      await FactCheckModel.findByIdAndRemove(req.params.id).exec();
      res.sendStatus(200); // ok
    } catch (err) {
      res.sendStatus(400); // bad request
    }
  },
};

module.exports = FactCheckController;

const PartyModel = require('../models/PartyModel');

const UserModel = require('../models/UserModel'); // has many relatinship

const PartyController = {
  getAll: async (req, res) => {
    console.log('getting all parties');
    try {
      const parties = await PartyModel.find({}, null, { sort: { created_at: -1 } })
        .exec();
      res.status(200).json({ parties });
    } catch (err) {
      res.sendStatus(500); // internal error
    }
  },


  findByName: async (req, res) => {
    console.log('getting all parties matching:', req.params.name);
    try {
      const { name } = req.params;
      const parties = PartyModel.find({ name: { $regex: new RegExp(name, 'i') } })
        .sort({ created_at: -1 })
        .limit(5)
        .exec();
      res.status(200).json({ parties });
    } catch (err) {
      res.sendStatus(400); // bad request
    }
  },


  get: async (req, res) => {
    console.log('getting party of id:', req.params.id);

    try {
      const party = PartyModel.findById(req.params.id)
        .exec();
      if (!party) res.sendStatus(404); // not found
      else {
        // fill 'has many' reference arrays
        const politicians = await UserModel.find({ party: party.id });
        party.politicians = politicians;
        res.json({ party });
      }
    } catch (err) {
      res.sendStatus(400); // bad request
    }
  },


  create: async (req, res) => {
    console.log('creating party:', req.body.party);

    try {
      let { party } = req.body;
      party = await PartyModel.create(party);
      res.send({ party });
    } catch (err) {
      res.sendStatus(400); // bad request
    }
  },


  update: async (req, res) => {
    console.log('updating party of id:', req.params.id);

    try {
      const { party } = req.body;
      await PartyModel.findByIdAndUpdate(req.params.id, party).exec();
      res.sendStatus(200); // ok
    } catch (err) {
      res.sendStatus(400); // bad request
    }
  },


  remove: async (req, res) => {
    console.log('removing party of id:', req.params.id);

    try {
      await PartyModel.findByIdAndRemove(req.params.id).exec();
      res.sendStatus(200); // ok
    } catch (err) {
      res.sendStatus(400); // bad request
    }
  },
};

module.exports = PartyController;

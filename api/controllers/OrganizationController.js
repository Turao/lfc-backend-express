const OrganizationModel = require('../models/OrganizationModel');

const EventModel = require('../models/EventModel'); // has many relatinship

const OrganizationController = {
  getAll: async (req, res) => {
    console.log('getting all organizations');
    try {
      const organizations = await OrganizationModel.find({}, null, { sort: { created_at: -1 } })
        .populate('checker')
        .populate('statement')
        .populate('moderator')
        .exec();
      res.status(200).json({ organizations });
    } catch (err) {
      res.sendStatus(500); // internal error
    }
  },


  findByName: async (req, res) => {
    console.log('getting all organizations matching:', req.params.name);
    try {
      const { name } = req.params;
      const organizations = OrganizationModel.find({ name: { $regex: new RegExp(name, 'i') } })
        .sort({ created_at: -1 })
        .limit(5)
        .exec();
      res.status(200).json({ organizations });
    } catch (err) {
      res.sendStatus(400); // bad request
    }
  },


  get: async (req, res) => {
    console.log('getting organization of id:', req.params.id);

    try {
      const organization = OrganizationModel.findById(req.params.id)
        .populate('checker')
        .populate('statement')
        .populate('moderator')
        .exec();
      if (!organization) res.sendStatus(404); // not found
      else {
        // fill 'has many' reference arrays
        const events = await EventModel.find({ organization: organization.id });
        organization.events = events;
        res.json({ organization });
      }
    } catch (err) {
      res.sendStatus(400); // bad request
    }
  },


  create: async (req, res) => {
    console.log('creating organization:', req.body.organization);

    try {
      let { organization } = req.body;
      organization = await OrganizationModel.create(organization);
      res.send({ organization });
    } catch (err) {
      res.sendStatus(400); // bad request
    }
  },


  update: async (req, res) => {
    console.log('updating organization of id:', req.params.id);

    try {
      const { organization } = req.body;
      await OrganizationModel.findByIdAndUpdate(req.params.id, organization).exec();
      res.sendStatus(200); // ok
    } catch (err) {
      res.sendStatus(400); // bad request
    }
  },


  remove: async (req, res) => {
    console.log('removing organization of id:', req.params.id);

    try {
      await OrganizationModel.findByIdAndRemove(req.params.id).exec();
      res.sendStatus(200); // ok
    } catch (err) {
      res.sendStatus(400); // bad request
    }
  },
};

module.exports = OrganizationController;

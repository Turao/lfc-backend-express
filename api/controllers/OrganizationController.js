const OrganizationModel = require('../models/OrganizationModel');

const OrganizationController = {
  get: (req, res) => {
    console.log('getting organization of id:', req.params.id);

    OrganizationModel.findById(req.params.id)
      .exec()
      .then((organization) => {
        if (!organization) res.sendStatus(404); // not found
        else res.json(organization);
      })
      .catch(() => {
        res.sendStatus(400); // bad request
      });
  },


  getAll: (req, res) => {
    console.log('getting all organizations');
    OrganizationModel.find({}, null, { sort: { created_at: -1 } })
      .then((organizations) => {
        res.status(200).json(organizations);
      })
      .catch(() => {
        res.sendStatus(500); // internal error
      });
  },


  create: (req, res) => {
    console.log('creating organization:', req.body.organization);

    const { organization } = req.body;
    OrganizationModel.create(organization)
      .then(() => {
        res.sendStatus(200); // ok
      })
      .catch(() => {
        res.sendStatus(400); // bad request
      });
  },


  update: (req, res) => {
    console.log('updating organization of id:', req.params.id);

    const { organization } = req.body;
    OrganizationModel.updateOne({ _id: req.params.id }, organization)
      .exec()
      .then(() => {
        res.sendStatus(200); // ok
      })
      .catch(() => {
        res.sendStatus(400); // bad request
      });
  },


  remove: (req, res) => {
    console.log('removing organization of id:', req.params.id);

    OrganizationModel.remove({ _id: req.params.id })
      .exec()
      .then(() => {
        res.sendStatus(200); // ok
      })
      .catch(() => {
        res.sendStatus(400); // bad request
      });
  },
};

module.exports = OrganizationController;

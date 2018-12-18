const UserModel = require('../models/UserModel');

const FactCheckModel = require('../models/FactCheckModel'); // has many relatinship
const StatementModel = require('../models/StatementModel'); // has many relatinship

const UserController = {
  getAll: async (req, res) => {
    console.log('getting all users');
    try {
      const users = await UserModel.find({}, null, { sort: { created_at: -1 } })
        .exec();
      res.status(200).json({ users });
    } catch (err) {
      res.sendStatus(500); // internal error
    }
  },


  findByName: async (req, res) => {
    console.log('getting all users matching:', req.params.name);
    try {
      const { name } = req.params;
      const users = UserModel.find({ name: { $regex: new RegExp(name, 'i') } })
        .sort({ created_at: -1 })
        .limit(5)
        .exec();
      res.status(200).json({ users });
    } catch (err) {
      res.sendStatus(400); // bad request
    }
  },


  get: async (req, res) => {
    console.log('getting user of id:', req.params.id);

    try {
      const user = UserModel.findById(req.params.id)
        .exec();
      if (!user) res.sendStatus(404); // not found
      else {
        // fill 'has many' reference arrays
        const factChecks = await FactCheckModel.find({ checker: user.id });
        user.factChecks = factChecks;

        const moderated = await FactCheckModel.find({ moderator: user.id });
        user.moderated = moderated;

        const statements = await StatementModel.find({ politician: user.id });
        user.statements = statements;
        res.json({ user });
      }
    } catch (err) {
      res.sendStatus(400); // bad request
    }
  },


  create: async (req, res) => {
    console.log('creating user:', req.body.user);

    try {
      let { user } = req.body;
      user = await UserModel.create(user);
      res.send({ user });
    } catch (err) {
      res.sendStatus(400); // bad request
    }
  },


  update: async (req, res) => {
    console.log('updating user of id:', req.params.id);

    try {
      const { user } = req.body;
      await UserModel.findByIdAndUpdate(req.params.id, user).exec();
      res.sendStatus(200); // ok
    } catch (err) {
      res.sendStatus(400); // bad request
    }
  },


  remove: async (req, res) => {
    console.log('removing user of id:', req.params.id);

    try {
      await UserModel.findByIdAndRemove(req.params.id).exec();
      res.sendStatus(200); // ok
    } catch (err) {
      res.sendStatus(400); // bad request
    }
  },
};

module.exports = UserController;

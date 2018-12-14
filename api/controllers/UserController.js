const UserModel = require('../models/UserModel');

const UserController = {
  get: (req, res) => {
    console.log('getting user of id:', req.params.id);

    UserModel.findById(req.params.id)
      .exec()
      .then((user) => {
        if (!user) res.sendStatus(404); // not found
        else {
          res.json({ user });
        }
      })
      .catch(() => {
        res.sendStatus(400); // bad request
      });
  },


  findByName: (req, res) => {
    console.log('getting all users matching:', req.params.name);
    const { name } = req.params;
    UserModel.find({ name: { $regex: new RegExp(name, 'i') } })
      .sort({ created_at: -1 })
      .limit(5)
      .then((users) => {
        res.status(200).json({ users });
      })
      .catch(() => {
        res.sendStatus(500); // internal error
      });
  },


  create: (req, res) => {
    console.log('creating user:', req.body.user);

    const { user } = req.body;
    UserModel.create(user)
      // eslint-disable-next-line no-shadow
      .then((user) => {
        // eslint-disable-next-line no-param-reassign
        user = user.toObject();
        // eslint-disable-next-line no-param-reassign
        delete user.password;
        res.status(200).send({ user }); // ok
      })
      .catch(() => {
        res.sendStatus(400); // bad request
      });
  },


  update: (req, res) => {
    console.log('updating user of id:', req.params.id);

    const { user } = req.body;
    UserModel.updateOne({ _id: req.params.id }, user)
      .exec()
      .then(() => {
        res.sendStatus(200); // ok
      })
      .catch(() => {
        res.sendStatus(400); // bad request
      });
  },


  remove: (req, res) => {
    console.log('removing user of id:', req.params.id);

    UserModel.remove({ _id: req.params.id })
      .exec()
      .then(() => {
        res.sendStatus(200); // ok
      })
      .catch(() => {
        res.sendStatus(400); // bad request
      });
  },
};

module.exports = UserController;

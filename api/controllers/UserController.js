const UserModel = require('../models/UserModel');

const UserController = {
  get: (req, res) => {
    console.log('getting user of id:', req.params.id);

    UserModel.findById(req.params.id)
      .exec()
      .then((user) => {
        if (!user) res.sendStatus(404); // not found
        else {
          // eslint-disable-next-line no-param-reassign
          user = user.toObject(); // otherwise cannot delete mongoose object properties
          // eslint-disable-next-line no-param-reassign
          delete user.password;
          res.json(user);
        }
      })
      .catch(() => {
        res.sendStatus(400); // bad request
      });
  },


  create: (req, res) => {
    console.log('creating user:', req.body.user);

    const { user } = req.body;
    UserModel.create(user)
      .then(() => {
        res.sendStatus(200); // ok
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

const StatementModel = require('../models/StatementModel');

const FactCheckModel = require('../models/FactCheckModel'); // has many relationship

const StatementController = {
  getAll: async (req, res) => {
    console.log('getting all statements');
    try {
      const statements = await StatementModel.find({}, null, { sort: { created_at: -1 } })
        .populate('politician')
        .populate('event')
        .exec();
      res.status(200).json({ statements });
    } catch (err) {
      res.sendStatus(500); // internal error
    }
  },


  get: async (req, res) => {
    console.log('getting statement of id:', req.params.id);

    try {
      const statement = StatementModel.findById(req.params.id)
        .populate('politician')
        .populate('event')
        .exec();
      if (!statement) res.sendStatus(404); // not found
      else {
        // fill 'has many' reference arrays
        const factChecks = await FactCheckModel.find({ statement: statement.id });
        statement.factChecks = factChecks;
        res.json({ statement });
      }
    } catch (err) {
      res.sendStatus(400); // bad request
    }
  },


  create: async (req, res) => {
    console.log('creating statement:', req.body.statement);

    try {
      let { statement } = req.body;
      statement = await StatementModel.create(statement);
      res.send({ statement });
    } catch (err) {
      res.sendStatus(400); // bad request
    }
  },


  update: async (req, res) => {
    console.log('updating statement of id:', req.params.id);

    try {
      const { statement } = req.body;
      await StatementModel.findByIdAndUpdate(req.params.id, statement).exec();
      res.sendStatus(200); // ok
    } catch (err) {
      res.sendStatus(400); // bad request
    }
  },


  remove: async (req, res) => {
    console.log('removing statement of id:', req.params.id);

    try {
      await StatementModel.findByIdAndRemove(req.params.id).exec();
      res.sendStatus(200); // ok
    } catch (err) {
      res.sendStatus(400); // bad request
    }
  },
};

module.exports = StatementController;

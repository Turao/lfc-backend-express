const EventModel = require('../models/EventModel');
const StatementModel = require('../models/StatementModel'); // has many relatinship

const EventController = {
  getLatest: async (req, res) => {
    console.log('getting latest events');
    try {
      const events = await EventModel.find({}, null, { sort: { created_at: -1 }, limit: 10})
        .populate('organizations')
        .exec();
      res.status(200).json({ events });
    } catch (err) {
      res.sendStatus(500); // internal error
    }
  },


  findByName: async (req, res) => {
    console.log('getting all events matching:', req.params.name);
    try {
      const { name } = req.params;
      const events = EventModel.find({ name: { $regex: new RegExp(name, 'i') } })
        .sort({ created_at: -1 })
        .limit(5)
        .populate('organizations')
        .exec();
      res.status(200).json({ events });
    } catch (err) {
      res.sendStatus(400); // bad request
    }
  },


  getAll: async (req, res) => {
    console.log('getting all events');
    try {
      const events = await EventModel.find({}, null, { sort: { created_at: -1 } })
        .populate('organizations')
        .exec();
      res.status(200).json({ events });
    } catch (err) {
      res.sendStatus(500); // internal error
    }
  },


  get: async (req, res) => {
    console.log('getting event of id:', req.params.id);

    try {
      const event = EventModel.findById(req.params.id)
        .populate('organizations')
        .exec();
      if (!event) res.sendStatus(404); // not found
      else {
        // fill 'has many' reference arrays
        const statements = await StatementModel.find({ event: event.id });
        event.statements = statements;
        res.json({ event });
      }
    } catch (err) {
      res.sendStatus(400); // bad request
    }
  },


  create: async (req, res) => {
    console.log('creating event:', req.body.event);

    try {
      let { event } = req.body;
      event = await EventModel.create(event);
      res.send({ event });
    } catch (err) {
      res.sendStatus(400); // bad request
    }
  },


  update: async (req, res) => {
    console.log('updating event of id:', req.params.id);

    try {
      const { event } = req.body;
      await EventModel.findByIdAndUpdate(req.params.id, event).exec();
      res.sendStatus(200); // ok
    } catch (err) {
      res.sendStatus(400); // bad request
    }
  },


  remove: async (req, res) => {
    console.log('removing event of id:', req.params.id);

    try {
      await EventModel.findByIdAndRemove(req.params.id).exec();
      res.sendStatus(200); // ok
    } catch (err) {
      res.sendStatus(400); // bad request
    }
  },
};

module.exports = EventController;

const EventModel = require('../models/EventModel');

const EventController = {
  getLatest: (req, res) => {
    console.log('getting latest events');
    EventModel.find({}, null, { sort: { created_at: -1 }, limit: 10 })
      .populate('organizations')
      .then((events) => {
        res.status(200).json({ events });
      })
      .catch(() => {
        res.sendStatus(500); // internal error
      });
  },


  findByName: (req, res) => {
    console.log('getting all events matching:', req.params.name);
    const { name } = req.params;
    EventModel.find({ name: { $regex: new RegExp(name, 'i') } })
      .sort({ created_at: -1 })
      .limit(5)
      .populate('organizations')
      .then((events) => {
        res.status(200).json({ events });
      })
      .catch(() => {
        res.sendStatus(500); // internal error
      });
  },


  getAll: (req, res) => {
    console.log('getting all events');
    EventModel.find({}, null, { sort: { created_at: -1 } })
      .populate('organizations')
      .then((events) => {
        res.status(200).json({ events });
      })
      .catch(() => {
        res.sendStatus(500); // internal error
      });
  },


  get: (req, res) => {
    console.log('getting event of id:', req.params.id);

    EventModel.findById(req.params.id)
      .populate('organizations')
      .populate('moderators')
      .exec()
      .then((event) => {
        if (!event) res.sendStatus(404); // not found
        else res.json({ event });
      })
      .catch(() => {
        res.sendStatus(400); // bad request
      });
  },


  create: (req, res) => {
    console.log('creating event:', req.body.event);

    const { event } = req.body;
    EventModel.create(event)
      // eslint-disable-next-line no-shadow
      .then((event) => {
        res.status(200).send({ event }); // ok
      })
      .catch(() => {
        res.sendStatus(400); // bad request
      });
  },


  update: (req, res) => {
    console.log('updating event of id:', req.params.id);

    const { event } = req.body;
    EventModel.updateOne({ _id: req.params.id }, event)
      .exec()
      .then(() => {
        res.sendStatus(200); // ok
      })
      .catch(() => {
        res.sendStatus(400); // bad request
      });
  },


  remove: (req, res) => {
    console.log('removing event of id:', req.params.id);

    EventModel.remove({ _id: req.params.id })
      .exec()
      .then(() => {
        res.sendStatus(200); // ok
      })
      .catch(() => {
        res.sendStatus(400); // bad request
      });
  },
};

module.exports = EventController;

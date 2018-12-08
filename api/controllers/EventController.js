const EventModel = require('../models/EventModel');

const EventController = {
  getLatest: (req, res) => {
    console.log('getting latest events');
    EventModel.find({}, null, { sort: { created_at: -1 }, limit: 20 })
      .populate('organization', 'name')
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
      .populate('organization')
      .exec()
      .then((event) => {
        if (!event) res.sendStatus(404); // not found
        else res.json(event);
      })
      .catch(() => {
        res.sendStatus(400); // bad request
      });
  },


  create: (req, res) => {
    console.log('creating event:', req.body.event);

    const { event } = req.body;
    EventModel.create(event)
      .then(() => {
        res.sendStatus(200); // ok
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

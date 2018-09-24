'use strict'
const express = require('express');
const router = express.Router();


const UserController = require('../api/controllers/UserController');
router.get('/user/:id', UserController.get);
router.post('/user/', UserController.create);
router.put('/user/:id', UserController.update);
router.delete('/user/:id', UserController.remove);



const CheckerController = require('../api/controllers/CheckerController');
router.get('/checker/:id', CheckerController.get);
router.post('/checker/', CheckerController.create);
router.put('/checker/:id', CheckerController.update);
router.delete('/checker/:id', CheckerController.remove);


// const FactCheckController = require('../api/controllers/FactCheckController');
// router.get('/factChecks/:id', FactCheckController.get);
// router.post('/factChecks/:id', FactCheckController.create);
// router.put('/factChecks/:id', FactCheckController.update);
// router.delete('/factChecks/:id', FactCheckController.remove);




// const PoliticianController = require('../api/controllers/PoliticianController');
// router.get('/politicians/:id', PoliticianController.get);
// router.post('/politicians/:id', PoliticianController.create);
// router.put('/politicians/:id', PoliticianController.update);
// router.delete('/politicians/:id', PoliticianController.remove);


// const StatementController = require('../api/controllers/StatementController');
// router.get('/statements/:id', StatementController.get);
// router.post('/statements/:id', StatementController.create);
// router.put('/statements/:id', StatementController.update);
// router.delete('/statements/:id', StatementController.remove);




// const ModeratorController = require('../api/controllers/ModeratorController');
// router.get('/moderators/:id', ModeratorController.get);
// router.post('/moderators/:id', ModeratorController.create);
// router.put('/moderators/:id', ModeratorController.update);
// router.delete('/moderators/:id', ModeratorController.remove);


// const EventController = require('../api/controllers/EventController');
// router.get('/events/:id', EventController.get);
// router.post('/events/:id', EventController.create);
// router.put('/events/:id', EventController.update);
// router.delete('/events/:id', EventController.remove);



module.exports = router;

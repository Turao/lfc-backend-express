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


const FactCheckController = require('../api/controllers/FactCheckController');
router.get('/factCheck/:id', FactCheckController.get);
router.post('/factCheck/', FactCheckController.create);
router.put('/factCheck/:id', FactCheckController.update);
router.delete('/factCheck/:id', FactCheckController.remove);




const PartyController = require('../api/controllers/PartyController');
router.get('/party/:id', PartyController.get);
router.post('/party/', PartyController.create);
router.put('/party/:id', PartyController.update);
router.delete('/party/:id', PartyController.remove);


const PoliticianController = require('../api/controllers/PoliticianController');
router.get('/politician/:id', PoliticianController.get);
router.post('/politician/', PoliticianController.create);
router.put('/politician/:id', PoliticianController.update);
router.delete('/politician/:id', PoliticianController.remove);


const StatementController = require('../api/controllers/StatementController');
router.get('/statement/:id', StatementController.get);
router.post('/statement/', StatementController.create);
router.put('/statement/:id', StatementController.update);
router.delete('/statement/:id', StatementController.remove);




const OrganizationController = require('../api/controllers/OrganizationController');
router.get('/organization/:id', OrganizationController.get);
router.post('/organization/', OrganizationController.create);
router.put('/organization/:id', OrganizationController.update);
router.delete('/organization/:id', OrganizationController.remove);


const ModeratorController = require('../api/controllers/ModeratorController');
router.get('/moderator/:id', ModeratorController.get);
router.post('/moderator/', ModeratorController.create);
router.put('/moderator/:id', ModeratorController.update);
router.delete('/moderator/:id', ModeratorController.remove);


const EventController = require('../api/controllers/EventController');
router.get('/event/:id', EventController.get);
router.post('/event/', EventController.create);
router.put('/event/:id', EventController.update);
router.delete('/event/:id', EventController.remove);



module.exports = router;

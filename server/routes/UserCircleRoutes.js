const express = require('express');
const router = express.Router();
// Model types
const Types = require('../utils/Types') 
// CRUD Service
const CRUD = require('../utils/CRUD');
const UserCircle = require('../models/UserCircle');
//controller
const UserCircleController = require('../controllers/UserCircleController')


//router - /v1/crestera/circles/
// Create
// router.post('/', (req, res) => CRUD.create(req.body, Types.USERCIRCLE, res));
router.post('/', UserCircleController.create);

//get all
// router.get('/', (req, res) => CRUD.getByQuery({}, Types.USERCIRCLE, res));
router.route('/').get(UserCircleController.getAll);

//router - /v1/crestera/circles/id
// Update
router.put('/', (req, res) => CRUD.updateById(req.body._id, req.body,  Types.USERCIRCLE, res));

//add member
router.put('/member', (req, res) => UserCircleController.addMember(req, res));

// Get by id
router.get('/:id', (req, res) => CRUD.getById(req.params.id,  Types.USERCIRCLE, res));

// Delete
router.delete('/:id', (req, res) => CRUD.deleteById(req.params.id,  Types.USERCIRCLE, res));


module.exports=router;
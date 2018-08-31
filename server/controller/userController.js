const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

const verifyToken = require('./verifyToken');

const userServices = require('../services/user-services'); 

router.post('/register', userServices.registerUser);

router.get('/',verifyToken, userServices.getUsers);

router.put('/:id',verifyToken, userServices.updateUser);

router.delete('/:id',verifyToken, userServices.deleteUser);

router.post('/login', userServices.loginUsers);

router.get('/filter/:data', userServices.filterUsers);

router.get('/getuser/:id',verifyToken, userServices.getCurrentUser);

router.get('/logout', userServices.logoutUser);

module.exports = router;

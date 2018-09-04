const express = require('express');
const path = require('path');
const app = express();
const cors = require('cors')
const db = require('./db');

app.use(express.static(path.join(__dirname, '../build')));

app.use(cors("*"));
const UserController = require('./controller/userController');
app.use('/users', UserController);

module.exports = app;

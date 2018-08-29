const express = require('express');
const app = express();
const cors = require('cors')
const db = require('./db');

app.use(cors("*"));
const UserController = require('./controller/userController');
app.use('/users', UserController);

module.exports = app;

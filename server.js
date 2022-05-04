const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv/config');
const jwt = require('jsonwebtoken');

const classroomRoutes = require('./routes/classroom');
const userRoutes = require('./routes/user');
const loginRoutes = require('./routes/login');
const registerRoutes = require('./routes/register');
const reservationRoutes = require('./routes/reservation');


app.use(bodyParser.json());
app.use('/user', userRoutes);
app.use('/classroom', classroomRoutes);
app.use('/register', registerRoutes);
app.use('/login', loginRoutes);
app.use('/reservation', reservationRoutes);

mongoose.connect(process.env.CONNECTION_STRING, () => {
  console.log("connected to db");
});

const port = 8000;
app.listen(port, () => {
  console.log('Server started with port: ' + port);
});


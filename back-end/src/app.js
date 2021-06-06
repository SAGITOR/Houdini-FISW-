const express = require('express');
const cors = require('cors');

const app = express();

// Db connection
require('./db');
// Settings 
app.set('port', process.env.PORT || 4001);

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());//app.use(express.json());

app.use('/user', require('./routes/user'));
app.use('/admin', require('./routes/admin'));
app.use('/documents', require('./routes/documents'));
app.use('/api', require('./routes/apis'));

module.exports = app;
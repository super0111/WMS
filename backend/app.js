const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const path = require('path');
require('dotenv').config();

const indexRouter = require('./routes');
// initialize our express app
const app = express();
app.use(cors());


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/dashboard', indexRouter);
module.exports = app;
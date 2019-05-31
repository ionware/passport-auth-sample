const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const flash = require('connect-flash');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const expressValidator = require('express-validator');
const app = express();

// Take request payloads into body.
app.use(bodyParser.json());
app.use(bodyParser({ extended: true }));

// Let us have support for session.
app.use(session({
    secret: process.env.APP_KEY,
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection })
}));
// Flashing of messages to the session.
app.use(flash());
// Awesome validation on our requests.
app.use(expressValidator());
// Serve static assets from the public folder.
app.use(express.static(path.join(__dirname, 'public')));
// Configure our view engine to be Pug.
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

module.exports = app;
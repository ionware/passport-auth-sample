const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const flash = require('connect-flash');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();

// Take request payloads into body.
app.use(bodyParser({ extended: false }));
app.use(bodyParser.json());

// Let us have support for session.
app.use(session({
    secret: process.env.APP_KEY,
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection })
}));
// Flashing of messages to the session.
app.use(flash());
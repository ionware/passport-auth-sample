const passport = require('passport');
const mongoose = require('mongoose');
//const LocalStrategy = require('passport-local').Strategy;

const User = mongoose.model('User');

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
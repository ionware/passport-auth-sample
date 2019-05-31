const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const validator = require('validator');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName: {
        type: String,
        required: 'You must enter your name',
        trim: true,
    },
    lastName: {
        type: String,
        required: 'We need your last name too.',
        trim: true,
    },
    email: {
        type: String,
        required: 'An email address is required',
        trim: true,
        unique: true,
        validate: [validator.isEmail, 'Oops! That\'s an Invalid email address.'],
    }
});

// Apply passport-local-mongoose and set its default username field to be email.
userSchema.plugin(passportLocalMongoose, { usernameField: 'email' });

module.exports = mongoose.model('User', userSchema);
const { Schema, model } = require('mongoose');
const userSchema = require('/Thought');

const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: [/.+@.+\..+/, 'Must match an email address!']
        },
        thoughts: [thoughtSchema],
        friends: [this]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
    }
);

const User = model('User', userSchema);

module.exports = User;
   
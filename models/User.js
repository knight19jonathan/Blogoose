const { Schema, model, ObjectId } = require('mongoose');
const Thought = require('./Thought');

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
        thoughts: [ 
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought'
            }
        ],
        friends: [{
            type: Schema.Types.ObjectId,
            ref: 'user'
        }]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
    }
);

userSchema.virtual('friendCount').get(function() {
    return this.friends.length;
});


const User = model('user', userSchema);

module.exports = User;
   
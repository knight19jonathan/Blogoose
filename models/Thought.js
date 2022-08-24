const { ObjectId } = require('mongodb');
const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');


const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtVal => {
                const createdVal = createdAtVal.todateString();
                return createdVal
            }
            
        },
        username: {
            type: String,
            required: true,
            ref: 'user'
        },
        reactions: [reactionSchema]
    },
    {
        toJSON: {
            virtuals: true,
            
        },
    }
);

thoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
});

const Thought = model('thought', thoughtSchema);

module.exports = Thought;
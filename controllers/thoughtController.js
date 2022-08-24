const { ObjectId } = require('mongoose').Types;
const { User, Thought, Reaction } = require('../models');

// Aggregage function to get the number of thoughts.
const thoughtCount = async () =>
    Thought.aggregate()
        .count('thoughtCounter')
        .then((numberofThoughts) => numberofThoughts)

module.exports = {
// get all thoughts
    getAllThoughts(req, res) {
        Thought.find({})
            .populate({
                path: 'reactions',
                select: '-__v'
            })
            .select('-__v')
            .sort({ _id: -1 })
            .then(async (thoughts) => {
                const thoughtObj = {
                    thoughts,
                    thoughtCount: await thoughtCount(),
                };
                return res.json(thoughtObj)
            })
            .catch(err => {
                console.log(err);
                return res.status(500).json(err);
            }
            );
    },   
    
// get one thought by id
    getSingleThought(req, res) {
        Thought.findOne({ _id: req.params.id })
            .select('-__v')
            .then(async (thought) =>
                !thought
                    ? res.status(404).json({ message: 'No thought found with this id!' })
                    : res.json({
                        thought,
                        thoughtCount: await thoughtCount(),
                    })
            )
            .catch(err => {
                console.log(err);
                return res.status(500).json(err);
            });
    },

// create thought

    createThought(req, res) {
        Thought.create(req.body)
            .then(thought => res.json(thought))
            .catch(err => res.status(400).json(err));
    },

// update thought by id
    updateThought(req, res) {
        Thought.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
            .then(thought => {
                if (!thought) {
                    return res.status(404).json({ message: 'No thought found with this id!' });
                }
                return res.json(thought);
            })
            .catch(err => res.status(400).json(err));
    },

// delete thought by id
    deleteThought(req, res) {
        Thought.findOneAndDelete({ _id: req.params.id })
            .then(thought => {
                if (!thought) {
                    return res.status(404).json({ message: 'No thought found with this id!' });
                }
                return res.json(thought);
            })
            .catch(err => res.status(400).json(err));
    },

// add reaction to thought
    addReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.id },
            { $push: { reactions: req.body } },
            { new: true, runValidators: true }
        )
            .then(thought => {
                if (!thought) {
                    return res.status(404).json({ message: 'No thought found with this id!' });
                }
                return res.json(thought);
            })
            .catch(err => res.status(400).json(err));
    },

// delete reaction from thought by id
    deleteReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.id },
            { $pull: { reactions: { reactionId: req.params.reactionId } } },
            { new: true }
        )
            .then(thought => {
                if (!thought) {
                    return res.status(404).json({ message: 'No thought found with this id!' });
                }
                return res.json(thought);
            })
            .catch(err => res.status(400).json(err));
    },

// update reaction by id
    updateReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.id, 'reactions.reactionId': req.params.reactionId },
            { $set: { 'reactions.$.reactionBody': req.body.reactionBody } },
            { new: true }
        )
            .then(thought => {
                if (!thought) {
                    return res.status(404).json({ message: 'No thought found with this id!' });
                }
                return res.json(thought);
            })
            .catch(err => res.status(400).json(err));
    },

    // delete all thoughts
    deleteAllThoughts(req, res) {
        Thought.deleteMany({})
            .then(thoughts => {
                if (!thoughts) {
                    return res.status(404).json({ message: 'No thoughts found!' });
                }
                return res.json(thoughts);
            })
            .catch(err => res.status(400).json(err));
    },
};

// Language: javascript
// Path: controllers\userController.js
const { ObjectId } = require('mongoose').Types;
const { User, Thought, Reaction } = require('../models');

// Aggregage function to get the number of users. 
const userCount = async () => 
    User.aggregate()
        .count('userCounter')
        .then((numberofUsers) => numberofUsers)


module.exports = {
    // get all users
    getAllUsers(req, res) {
        User.find({})
            .populate({
                path: 'thoughts',
                select: '-__v'
            })
            .populate({
                path: 'friends',
                select: '-__v'
            })
            .select('-__v')
            .sort({ _id: -1 })
            .then(async (users) => {
                const userObj = {
                users,
                userCount: await userCount(),
            };
            return res.json(userObj)  
        })
            .catch(err => {
                console.log(err);
                return res.status(500).json(err);
            }
        );
    },
    // get one user by id
    getSingleUser(req, res) {
        User.findOne({ _id: req.params.id })
            .populate({
                path: 'thoughts',
                select: '-__v'
            })
            .populate({
                path: 'friends',
                select: '-__v'
            })  
            .select('-__v')
            .then(async (user) =>
                !user
                    ? res.status(404).json({ message: 'No user found with this id!' })
                    : res.json({
                        user,
                        userCount: await userCount(),
                    })
            )
        
               
            
            .catch(err => {
                console.log(err);
                return res.status(500).json(err);
            });
    },
    // create user
    createUser(req, res) {
        User.create(req.body)
            .then(user => res.json(user))
            .catch(err => res.status(400).json(err));
    },
    // update user by id
    updateUser(req, res) {
        User.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true, runValidators: true })
            .then(user => {
                if (!user) {
                    return res.status(404).json({ message: 'No user found with this id!' });
                }
                return res.json(user);
            })
            .catch(err => res.status(400).json(err));
    },
    // delete user
    deleteUser(req, res) {
        User.findOneAndDelete({ _id: req.params.id })
        .then((user) =>
            !user
            ? res.status(404).json({ message: 'No user found with this id!' })
            : Thought.deleteMany(
                { username: user.username },
                { $pull: { users: req.params.id } },
                )
            )
            .then((thought) =>
                !thought
                ? res.status(404).json({ message: 'No thought found with this id!' })
                : res.json({ message: 'User and thoughts deleted!' })
            )
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err);
            });
    },

    // add friend
    addFriend(req, res) {
        console.log('You are adding a friend!');
        console.log(req.body);
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $addToSet: { friends: req.body.friendId } },
            { new: true, runValidators: true }
        )
        .then(user => res.json(user))
        .catch((err) => res.status(500).json(err));
    },

    // remove friend
    deleteFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: { friends: req.body.friendId } },
            {  new: true, runValidators: true }
        )
        .then((user) =>
            !user
            ? res.status(404).json({ message: 'No user found with this id!' })
            : res.json(user)
        )
        .catch((err) => res.status(500).json(err));
    },
};
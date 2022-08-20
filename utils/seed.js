const connection = require('../config/connection');
const { User, Thought, Reaction } = require('../models');
const { getRandomName, getRandomReactions, getRandomThought } = require('./data');

connection.on('error', (err) => err);

connection.once('open', async () => {
    console.log('Connected to MongoDB!');

    // Delete all Thoughts
    await Thought.deleteMany({});

    // Delete all Users
    await User.deleteMany({});

    // Create Users
    const users = [];

    for (let i = 0; i < 20; i++) {
        const thoughts = getRandomThought(20);

        const fullname = getRandomName();
        const first = fullname.split(' ')[0];
        const last = fullname.split(' ')[1];

        users.push({
            first,
            last,
            thoughts,
        });
    }

    await User.collection.insertMany(users);

    // Create Thoughts
    await Thought.collection.insertMany(thoughts);

    console.table(users);
    console.ingo('Database seeded!');
    process.exit(0);
});
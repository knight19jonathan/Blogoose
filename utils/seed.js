const connection = require('../config/connection');
const { User , Thought, reactionSchema } = require('../models');
const { getRandomName, getRandomReactions, getRandomThought } = require('./data');

connection.on('error', (err) => err);

// Start the seeding runtime timer
console.time('seeding');

connection.once('open', async () => {
    console.log('Connected to MongoDB!');

    // Delete all Thoughts
    await Thought.deleteMany({});

    // Delete all Users
    await User.deleteMany({});

    // Create Users
    const users = [];
    for (let i = 0; i < 10; i++) {
        const username = getRandomName(20);
        const first = username.split(' ')[0];
        const last = username.split(' ')[1];

        users.push({
            first,
            last,
            emailss: `${first.toLowerCase()}.${last.toLowerCase()}@gmail.com`,
        });
    }

    await User.collection.insertMany(users);
    
    // Create Thoughts
    await Thought.collection.insertOne({
        thoughtText: 'This is a test thought',
        username: 'Test User',
        createdAt: new Date(),
        reactions: [],

    });
    
    console.table(users);
    console.info('Database seeded!');
    process.exit(0);

});
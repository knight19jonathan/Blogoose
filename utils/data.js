const names = [
    'Aaran',
    'Aaren',
    'Aarez',
    'Aarman',
    'Aaron',
    'Aaron-James',
    'Aarron',
    'Aaryan',
    'Aaryn',
    'Aayan',
    'Aazaan',
    'Abaan',
    'Abbas',
    'Abdallah',
    'Abdalroof',
    'Abdihakim',
    'Abdirahman',
    'Abdisalam',
    'Abdul',
    'Abdul-Aziz',
    'Abdulbasir',
    'Abdulkadir',
    'Abdulkarem',
    'Smith',
    'Jones',
    'Coollastname',
    'enter_name_here',
    'Ze',
    'Zechariah',
    'Zeek',
    'Zeeshan',
    'Zeid',
    'Zein',
    'Zen',
    'Zendel',
    'Zenith',
    'Zennon',
    'Zeph',
    'Zerah',
    'Zhen',
    'Zhi',
    'Zhong',
    'Zhuo',
    'Zi',
    'Zidane',
    'Zijie',
    'Zinedine',
    'Zion',
    'Zishan',
    'Ziya',
    'Ziyaan',
    'Zohaib',
    'Zohair',
    'Zoubaeir',
    'Zubair',
    'Zubayr',
    'Zuriel',
    'Xander',
    'Jared',
    'Courtney',
    'Gillian',
    'Clark',
    'Jared',
    'Grace',
    'Kelsey',
    'Tamar',
    'Alex',
    'Mark',
    'Tamar',
    'Farish',
    'Sarah',
    'Nathaniel',
    'Parker',
];

const thoughts = [
    'Decision Trackers are awesome',
    'Find My Phone is a useful app',
    'Learn Piano is not very good for learning Piano',
    'Starbase Defender is a great game, I love it',
    'Tower Defense is okay',
    'Monopoly Money is better than real money IMO',
    'Movie trailers are just the best parts of a movie distilled into 90 seconds',
    'Hello world, this is a comment',
    'Social media is a big waste of time',
    'Notes is my most used app',
    'Messages is open on my computer 24/7',
    'Email is open on my computer',
    'Compass is never opened',
    'Firefox is great for privacy',
];

const reactions = [
    'I love this',
    'This is awesome',
    'This is the best',
    'This is the worst',
    'I hate this',
    'This is terrible',
    'This is the worst thing I have ever seen',
    'This is the best thing I have ever seen',
    'This is the worst thing I have ever heard',
    'This is the best thing I have ever heard',
    'This is the worst thing I have ever tasted',
    'This is the best thing I have ever tasted',
    'This is the worst thing I have ever smelled',
    'This is the best thing I have ever smelled',
    'This is the worst thing I have ever touched',
    'This is the best thing I have ever touched',
    'This is the worst thing I have ever felt',
    'This is the best thing I have ever felt',
    'This is the worst thing I have ever thought',
    'This is the best thing I have ever thought',
    'This is the worst thing I have ever said',
    'This is the best thing I have ever said',
    'This is the worst thing I have ever done',
    'This is the best thing I have ever done',
    'This is the worst thing I have ever made',
    'This is the best thing I have ever made',
    'This is the worst thing I have ever bought',
    'This is the best thing I have ever bought',
    'This is the worst thing I have ever sold',
    'This is the best thing I have ever sold',
    'This is the worst thing I have ever given',
    'This is the best thing I have ever given',
    'This is the worst thing I have ever received',
    'This is the best thing I have ever received',
    'This is the worst thing I have ever worn',
    'This is the best thing I have ever worn',
    'This is the worst thing I have ever used',
    'This is the best thing I have ever used',

];

const lorum = [
    'lorem',
    'imsum',
    'dolor',
    'sit',
    'amet',
    'consectetur',
    'adipiscing',
    'elit',
    'curabitur',
    'vel',
    'hendrerit',
    'libero',
    'eleifend',
    'blandit',
    'nunc',
    'ornare',
    'odio',
    'ut',
    'orci',
    'gravida',
    'imperdiet',
    'nullam',
    'purus',
    'lacinia',
    'a',
    'pretium',
    'quis',
];

const genRandomIndex = (arr) => Math.floor(Math.random() * arr.length);

const getRandomWord = () => `${lorum[genRandomIndex(lorum)]}`;

const getRandomThought = (words) => {
    let thought = '';
    for (let i = 0; i < words; i++) {
        thought += ` ${getRandomWord()}`;
    }
    return thought;
};


// Get a random item given an array
const getRandomArrItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

// Gets a random full name
const getRandomName = () =>
  `${getRandomArrItem(names)} ${getRandomArrItem(names)}`;

// Function to generate random comments given a number (ex. 10 comments === getRandomReactions(10))
const getRandomReactions = (int) => {
  const results = [];
  for (let i = 0; i < int; i++) {
    results.push({
      text: getRandomArrItem(reactions),
      username: getRandomName().split(' ')[0],
    });
  }
  return results;
};

module.exports = {
    getRandomReactions,
    getRandomThought,
    getRandomName,
    getRandomWord,
    getRandomArrItem,
    genRandomIndex,
};  // Export the functions so they can be used in other files
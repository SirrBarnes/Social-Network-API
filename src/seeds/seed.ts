import connection from '../config/connection.js';
import { User, Thought } from '../models/index.js';

import { getRandomName, getRandomThought, getRandomReaction, getRandomArrItem } from './data.js';

const { uuid } = require('uuidv4');

connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connected');
  // Delete the collections if they exist
  let thoughtCheck = await connection.db?.listCollections({ name: 'thoughts' }).toArray();
  if (thoughtCheck?.length) {
    await connection.dropCollection('thoughts');
  }

  let userCheck = await connection.db?.listCollections({ name: 'users' }).toArray();
  if (userCheck?.length) {
    await connection.dropCollection('users');
  }


  const users: any[] = [];
  const thoughts: any[] = [];
  const reactions: any[] = [];

  for(let i = 0; i < 10; i++) {
    const username = getRandomName();
    users.push({

      username,
      email: `${username}@gmail.com`,
      thoughts: [],
      friends: [],
    })
  }
  
  // Function to generate random thouhts that we can add to user object.
  const makeThought = (x: number) => {
    let results = [];
    for (let i = 0; i < x; i++) {
      results.push({
        thoughtText: getRandomThought(),
        createdAt: new Date(),
        username: getRandomName(),
        reactions: [reactions[getRandomArrItem(reactions)]._id],
      });
    }
    return results;
  };

  for (let i = 0; i < 10; i++) {
    const reactionBody = getRandomReaction();

    reactions.push({
      reactionId: uuid(),
      reactionBody,
      username: getRandomName(),
      createdAt: new Date(),
    });
  }
    


  await User.collection.insertMany(users);
  users.forEach((() => makeThought(3)));

  await Thought.collection.insertMany(thoughts);
  
  // loop through the saved videos, for each video we need to generate a video response and insert the video responses
  console.table(users);
  console.table(thoughts);
  console.info('Seeding complete! 🌱');
  process.exit(0);
});

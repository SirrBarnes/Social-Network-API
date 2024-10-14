import connection from '../config/connection.js';
import { User, Thought } from '../models/index.js';

import { getRandomName, getRandomThought } from './data.js';

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
  const thoughts = getRandomThought(20);
  // const reactions: any[] = [];

  for(let i = 0; i < 10; i++) {
    const username = getRandomName();
    
    users.push({
      username,
      email: `${username}@gmail.com`.replace(/\s/g, '').toLowerCase(),
      // thoughts: [...getRandomThought(3)],
      // friends: [],
    });
  }

  await User.collection.insertMany(users);
  await Thought.collection.insertMany(thoughts);

  // loop through the saved videos, for each video we need to generate a video response and insert the video responses
  console.table(users);
  console.table(thoughts);
  console.info('Seeding complete! 🌱');
  process.exit(0);
});

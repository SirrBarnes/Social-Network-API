import db from '../config/connection.js';
import { User, Thought } from '../models/index.js';
import cleanDB from './cleanDB.js';

import { getRandomName, getRandomReaction, getRandomArrItem, thoughts } from './data.js';


try {
  await db();
  await cleanDB();


  const thoughtArray: any[] = [];
  const userArray: any[] = [];

  for ( let i = 0; i < 20; i++) {
    thoughtArray.push({
      thoughtText:  getRandomArrItem(thoughts),
      createdAt: new Date(),
      username: getRandomName(),
      reactions: [...getRandomReaction(3)],
    });
  }

  for (let i = 0; i < 10; i++) {
    const username = getRandomName();

    userArray.push({
      username,
      email: `${username}@gmail.com`.replace(/\s/g, '').toLowerCase(),
    })
  }

  await User.collection.insertMany(userArray);
  await Thought.collection.insertMany(thoughtArray);

  // loop through the saved videos, for each video we need to generate a video response and insert the video responses
  console.table(userArray);
  console.table(thoughtArray);
  console.info('Seeding complete! 🌱');
  process.exit(0);
} catch(error) {
  console.error('Error seeding database: ', error);
  process.exit(1);
}
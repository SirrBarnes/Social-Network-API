import db from '../config/connection.js';
import { User, Thought } from '../models/index.js';
import cleanDB from './cleanDB.js';
import { getRandomName, getRandomThought } from './data.js';

try {
  await db();
  await cleanDB();

  // Create empty array to hold the students
  const thoughts = [];

  // Loop 20 times -- add students to the students array
  for (let i = 0; i < 20; i++) {
    // Get some random assignment objects using a helper function that we imported from ./data
    const assignments = getRandomThought(20);

    const fullName = getRandomName();
    const first = fullName.split(' ')[0];
    const last = fullName.split(' ')[1];
    const github = `${first}${Math.floor(Math.random() * (99 - 18 + 1) + 18)}`;

    thoughts.push({
      first,
      last,
      github,
      assignments,
    });
  }

  // Add students to the collection and await the results
  const userData = await User.create(thoughts);

  // Add courses to the collection and await the results
  await Thought.create({
    name: 'UCLA',
    inPerson: false,
    thoughts: [...userData.map(({ _id }: { [key: string]: any }) => _id)],
  });

  // Log out the seed data to indicate what should appear in the database
  console.table(thoughts);
  console.info('Seeding complete! 🌱');
  process.exit(0);
} catch (error) {
  console.error('Error seeding database:', error);
  process.exit(1);
}


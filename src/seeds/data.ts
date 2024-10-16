import { uuid } from 'uuidv4';

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
  'Sam',
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
  "Why do we rarely see baby pigeons?",
  "If humans could breathe underwater, would cities exist beneath the ocean?",
  "What if dreams are parallel universe versions of ourselves living different lives?",
  "Do dogs think in barks the way humans think in words?",
  "If we could travel at the speed of light, would time feel different?",
  "What if the color I see as 'blue' is someone else's 'red'?",
  "Could we ever truly understand what it’s like to be a tree?",
  "How does the internet weigh nothing but contains everything?",
  "Why do we call it 'getting cold feet' when we hesitate?",
  "What if time is just a construct to keep everything from happening all at once?",
  "Is the universe infinite or just really, really big?",
  "If everyone blinked at the same time, would the world momentarily disappear?",
  "What if the stars are just holes poked in the night sky by someone on the other side?",
  "How does music make us feel emotions without any tangible connection?",
  "If time travel is possible, could time tourists be walking among us right now?",
  "Why do we wake up from dreams just before something exciting or scary happens?",
  "What if we could communicate with plants, and they’re constantly judging us?",
  "How would life change if gravity were cut in half?",
  "Do fish ever get bored of swimming in circles?",
  "Why are we more creative when we're about to fall asleep?"
];

const reactions = [
  "Wow, I’ve never thought about that!",
  "That’s mind-blowing!",
  "Hmm, that's a really interesting perspective.",
  "Now I can't stop thinking about it!",
  "That would completely change how we view the world.",
  "I wonder if there’s any way to actually know that.",
  "Makes me feel like the universe is so mysterious.",
  "I love how deep that gets!",
  "I’m definitely going to ponder this for a while.",
  "That just blew my mind!",
  "The possibilities are endless!",
  "That’s a super trippy idea.",
  "Wow, I’m actually questioning reality now!",
  "That's a pretty wild thought!",
  "Now I’m curious what science would say about this.",
  "That could open up a whole new way of thinking.",
  "That's so fascinating to think about!",
  "It's kind of unsettling but also so cool.",
  "I've never considered that before.",
  "I need more coffee to wrap my head around this!"
];

// Get a random item given an array
const getRandomArrItem = (arr: any[]) => {
  return arr[Math.floor(Math.random() * arr.length)];
}

// Gets a random full name
const getRandomName = () => {
  return `${getRandomArrItem(names)} ${getRandomArrItem(names)}`;
}

const getRandomReaction = (x: number) => {
  if (x === 1) {
    return getRandomArrItem(reactions);
  }
  
  const results = [];
  for (let i = 0; i < x; i++) {
    results.push({
      reactionId: uuid(),
      reactionBody: getRandomArrItem(reactions),
      username: getRandomName(),
      createdAt: new Date(),
    });
  }
  return results;
};

export { getRandomName, getRandomReaction, getRandomArrItem, thoughts };
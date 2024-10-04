import express from 'express';
import routes from './routes/index.js';
import db from './config/connection.js';

const cwd = process.cwd();

const PORT = process.env.PORT || 3001;
const app = express();

const activity = cwd.includes('Social-Network-API')
  ? cwd.split('Social-Network-API')[1]
  : cwd;

app.use(express.urlencoded({ extended: true}));
app.use(express.json());
app.use(routes);

db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server ${activity} running on port ${PORT}!`);
  });
});

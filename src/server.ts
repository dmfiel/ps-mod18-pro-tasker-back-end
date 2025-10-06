import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';
import db from './config/connection';
import usersRouter from './routes/userRoutes';
import projectsRouter from './routes/projectRoutes';
import tasksRouter from './routes/taskRoutes';
import testRoutes from './routes/testRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan('dev'));
// use cors to specify where the front-end server can be located
const allowedOrigins = [
  'https://fiel.us',
  'http://fiel.us',
  'https://github.com'
];

// allowed !orgin (undefined) to accept Postman transactions
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error(`Origin site (${origin}) not allowed by CORS`));
    }
  }
};
app.use(cors(corsOptions));

app.use('/', testRoutes);
app.use('/api/users', usersRouter);
app.use('/api/projects', projectsRouter);
app.use('/api/tasks', tasksRouter);

db.once('open', () => {
  app.listen(PORT, () => console.log(`🌍 Now listening on localhost:${PORT}`));
});

import express, { Request, Response } from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { connectToDatabase } from './config/database';
import { Activity, LeaderboardEntry, Team, User, Workout } from './models';

const app = express();
const PORT = 8000;
const codespaceName = process.env.CODESPACE_NAME;
const baseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : `http://localhost:${PORT}`;

app.use(cors({
  origin: true,
  credentials: true,
}));
app.use(express.json());

app.get('/api/health', (_req: Request, res: Response) => {
  res.json({
    status: 'ok',
    message: 'Octofit Tracker API is running',
    apiBaseUrl: baseUrl
  });
});

app.get('/api', (_req: Request, res: Response) => {
  res.json({
    name: 'Octofit Tracker API',
    baseUrl,
    codespaceName: codespaceName || null,
    routes: [
      '/api/health',
      '/api/users/',
      '/api/teams/',
      '/api/activities/',
      '/api/leaderboard/',
      '/api/workouts/'
    ]
  });
});

function createCollectionRouter<T extends { _id?: mongoose.Types.ObjectId }>(resourceName: string, model: mongoose.Model<T>) {
  const router = express.Router();

  router.get('/', async (_req: Request, res: Response) => {
    try {
      const data = await model.find({}).lean();
      res.json({ resource: resourceName, data, count: data.length });
    } catch (error) {
      res.status(500).json({ message: `Failed to fetch ${resourceName}`, error });
    }
  });

  router.get('/:id', async (req: Request, res: Response) => {
    try {
      const item = await model.findById(req.params.id).lean();

      if (!item) {
        res.status(404).json({ message: `${resourceName.slice(0, -1)} not found` });
        return;
      }

      res.json(item);
    } catch (error) {
      res.status(400).json({ message: `Invalid ${resourceName.slice(0, -1)} id`, error });
    }
  });

  return router;
}

app.use('/api/users', createCollectionRouter('users', User));
app.use('/api/teams', createCollectionRouter('teams', Team));
app.use('/api/activities', createCollectionRouter('activities', Activity));
app.use('/api/leaderboard', createCollectionRouter('leaderboard', LeaderboardEntry));
app.use('/api/workouts', createCollectionRouter('workouts', Workout));

async function startServer() {
  try {
    await connectToDatabase();
    app.listen(PORT, () => {
      console.log(`Server listening on ${baseUrl}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();

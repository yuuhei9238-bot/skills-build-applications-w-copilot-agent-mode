import express, { Request, Response } from 'express';
import mongoose from 'mongoose';

const app = express();
const PORT = 8000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

app.use(express.json());

app.get('/api/health', (_req: Request, res: Response) => {
  res.json({ status: 'ok', message: 'Octofit Tracker API is running' });
});

async function startServer() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB at', MONGODB_URI);

    app.listen(PORT, () => {
      console.log(`Server listening on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
    process.exit(1);
  }
}

startServer();

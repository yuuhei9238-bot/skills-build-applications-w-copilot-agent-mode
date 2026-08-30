import mongoose from 'mongoose';
import { Activity, LeaderboardEntry, Team, User, Workout } from '../models';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);
    console.log('Connected to octofit_db');

    await User.deleteMany({});
    await Team.deleteMany({});
    await Activity.deleteMany({});
    await LeaderboardEntry.deleteMany({});
    await Workout.deleteMany({});

    const createdUsers = await User.insertMany([
      {
        name: 'Avery Chen',
        email: 'avery.chen@merington.edu',
        team: 'Marathon Crew',
        fitnessLevel: 'Advanced',
        goals: ['Run a 10K', 'Improve recovery']
      },
      {
        name: 'Jordan Smith',
        email: 'jordan.smith@merington.edu',
        team: 'Cycling Club',
        fitnessLevel: 'Intermediate',
        goals: ['Longer intervals', 'Strength balance']
      },
      {
        name: 'Priya Patel',
        email: 'priya.patel@merington.edu',
        team: 'Strength Squad',
        fitnessLevel: 'Advanced',
        goals: ['Lift heavier', 'Increase mobility']
      }
    ]);

    const teams = await Team.insertMany([
      {
        name: 'Marathon Crew',
        members: 12,
        goal: 'Build endurance and consistency',
        activity: 'Running'
      },
      {
        name: 'Cycling Club',
        members: 9,
        goal: 'Improve sprint performance',
        activity: 'Cycling'
      },
      {
        name: 'Strength Squad',
        members: 15,
        goal: 'Increase power and mobility',
        activity: 'Strength'
      }
    ]);

    await Activity.insertMany([
      {
        userId: createdUsers[0]._id,
        type: 'Running',
        minutes: 45,
        date: '2026-08-28',
        calories: 520
      },
      {
        userId: createdUsers[1]._id,
        type: 'Cycling',
        minutes: 60,
        date: '2026-08-29',
        calories: 610
      },
      {
        userId: createdUsers[2]._id,
        type: 'Strength',
        minutes: 50,
        date: '2026-08-30',
        calories: 480
      },
      {
        userId: createdUsers[0]._id,
        type: 'Cross Training',
        minutes: 35,
        date: '2026-08-30',
        calories: 410
      }
    ]);

    await LeaderboardEntry.insertMany([
      { username: 'avery.chen', points: 920, streak: 8, rank: 1 },
      { username: 'priya.patel', points: 890, streak: 6, rank: 2 },
      { username: 'jordan.smith', points: 860, streak: 5, rank: 3 }
    ]);

    await Workout.insertMany([
      { title: 'Cardio Sprint Circuit', level: 'Intermediate', duration: 30, focus: 'Conditioning' },
      { title: 'Core Stability Flow', level: 'Beginner', duration: 25, focus: 'Mobility' },
      { title: 'Leg Power Builder', level: 'Advanced', duration: 40, focus: 'Strength' },
      { title: 'Recovery Ride', level: 'Beginner', duration: 20, focus: 'Endurance' }
    ]);

    console.log(`Seeded ${createdUsers.length} users, ${teams.length} teams, and related activity data.`);
    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();

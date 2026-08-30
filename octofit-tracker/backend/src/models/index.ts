import mongoose, { Schema, type InferSchemaType } from 'mongoose';

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    team: { type: String, required: true },
    fitnessLevel: { type: String, default: 'Intermediate' },
    goals: { type: [String], default: [] }
  },
  { timestamps: true }
);

const teamSchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    members: { type: Number, required: true },
    goal: { type: String, required: true },
    activity: { type: String, default: 'Training' }
  },
  { timestamps: true }
);

const activitySchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, required: true },
    minutes: { type: Number, required: true },
    date: { type: String, required: true },
    calories: { type: Number, default: 0 }
  },
  { timestamps: true }
);

const leaderboardSchema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    points: { type: Number, required: true },
    streak: { type: Number, default: 0 },
    rank: { type: Number, default: 1 }
  },
  { timestamps: true }
);

const workoutSchema = new Schema(
  {
    title: { type: String, required: true },
    level: { type: String, required: true },
    duration: { type: Number, required: true },
    focus: { type: String, default: 'Full body' }
  },
  { timestamps: true }
);

export type UserDocument = InferSchemaType<typeof userSchema>;
export type TeamDocument = InferSchemaType<typeof teamSchema>;
export type ActivityDocument = InferSchemaType<typeof activitySchema>;
export type LeaderboardEntryDocument = InferSchemaType<typeof leaderboardSchema>;
export type WorkoutDocument = InferSchemaType<typeof workoutSchema>;

export const User = mongoose.models.User || mongoose.model('User', userSchema);
export const Team = mongoose.models.Team || mongoose.model('Team', teamSchema);
export const Activity = mongoose.models.Activity || mongoose.model('Activity', activitySchema);
export const LeaderboardEntry = mongoose.models.LeaderboardEntry || mongoose.model('LeaderboardEntry', leaderboardSchema);
export const Workout = mongoose.models.Workout || mongoose.model('Workout', workoutSchema);

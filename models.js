import mongoose from 'mongoose';

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/dsa_insights';

let connected = false;

export async function connectDB() {
  if (connected) return;
  try {
    await mongoose.connect(MONGO_URI);
    connected = true;
    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    console.log('Running without database — data will use localStorage fallback');
  }
}

export function isConnected() {
  return connected;
}

const userSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true, index: true },
  name: { type: String, default: 'User' },
  email: { type: String, default: '' },
  profile: {
    totalSolved: { type: Number, default: 0 },
    currentStreak: { type: Number, default: 0 },
    lastActiveDate: { type: String, default: '' },
    dailyHistory: [{ date: String, solved: Number }],
  },
  solvedProblems: [{ type: Number }],
}, { timestamps: true });

const codeSchema = new mongoose.Schema({
  userId: { type: String, required: true, index: true },
  problemId: { type: Number, required: true },
  language: { type: String, required: true },
  code: { type: String, default: '' },
}, { timestamps: true });

codeSchema.index({ userId: 1, problemId: 1, language: 1 }, { unique: true });

export const User = mongoose.model('User', userSchema);
export const Code = mongoose.model('Code', codeSchema);

import mongoose from 'mongoose';
import { env } from './env';

export async function connectDB(): Promise<void> {
  mongoose.set('strictQuery', true);
  try {
    await mongoose.connect(env.mongoUri, { autoIndex: true });
    console.log('[db] connected:', mongoose.connection.name);
  } catch (err) {
    console.error('[db] connection failed:', (err as Error).message);
    throw err;
  }
}

export async function disconnectDB(): Promise<void> {
  await mongoose.disconnect();
}

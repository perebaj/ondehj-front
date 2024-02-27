import mongoose, { Mongoose } from 'mongoose'

interface MongooseConnection {
  conn: Mongoose | null
  promise: Promise<Mongoose> | null
}

const MONGODB_URL = process.env.MONGODB_URL

if (!MONGODB_URL) {
  throw new Error('Please define the MONGODB_URL environment variable inside')
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let cached: MongooseConnection = (global as any).mongoose

if (!cached) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  cached = (global as any).mongoose = {
    conn: null,
    promise: null,
  }
}

export const connectToDatabase = async () => {
  if (cached.conn) return cached.conn

  cached.promise =
    cached.promise ||
    mongoose.connect(MONGODB_URL, {
      dbName: 'ondehoje',
      bufferCommands: false,
      socketTimeoutMS: 5000,
      serverSelectionTimeoutMS: 5000,
      connectTimeoutMS: 5000,
    })

  cached.conn = await cached.promise

  return cached.conn
}

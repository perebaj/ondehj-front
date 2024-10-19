import { MongoClient, ObjectId, ServerApiVersion } from 'mongodb'

const MONGODB_URL = process.env.MONGODB_URL

if (!MONGODB_URL) {
  throw new Error('Please define the MONGODB_URL environment variable inside')
}

export const client = new MongoClient(MONGODB_URL, {
  connectTimeoutMS: 5000,
  waitQueueTimeoutMS: 5000,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 5000,
  serverApi: {
    version: ServerApiVersion.v1,

    strict: true,
    deprecationErrors: true,
  },
})

export type Event = {
  _id?: ObjectId
  eventDate: Date
  createdAt: Date
  description: string
  name: string
  instagramURL?: string
  type?: string
  clerkId?: string
  email?: string
  likes: { userId: ObjectId }[] // Adicionando um campo para armazenar os likes
}

export type GetEvent = {
  _id: ObjectId
  eventDate: Date
  createdAt: Date
  description: string
  name: string
  instagramURL?: string
  type: string
  clerkId: string
  email: string
}

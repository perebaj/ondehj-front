'use server'
import { MongoClient, ObjectId, ServerApiVersion } from 'mongodb'

const MONGODB_URL = process.env.MONGODB_URL

if (!MONGODB_URL) {
  throw new Error('Please define the MONGODB_URL environment variable inside')
}

const client = new MongoClient(MONGODB_URL, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
})

export type Event = {
  id?: ObjectId
  eventDate: Date
  createdAt: Date
  description: string
  name: string
  instagramURL: string
  type: string
}

export async function getEvents(): Promise<Event[]> {
  //
  try {
    await client.connect()
    const events = await client
      .db('ondehoje')
      .collection<Event>('events')
      .find({
        createdAt: {
          $gt: new Date(Date.now() - 1000 * 60 * 60 * 24),
        },
      })
      .toArray()

    console.log(events)

    return events
  } finally {
    await client.close()
  }
}

export async function saveEvent(event: Event): Promise<void> {
  try {
    await client.connect()
    await client.db('ondehoje').collection<Event>('events').insertOne(event)
    console.log('Event saved')
  } finally {
    await client.close()
  }
}

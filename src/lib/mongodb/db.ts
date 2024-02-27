'use server'
import { MongoClient, ObjectId, ServerApiVersion } from 'mongodb'

import { handleError } from '../utils'

const MONGODB_URL = process.env.MONGODB_URL

if (!MONGODB_URL) {
  throw new Error('Please define the MONGODB_URL environment variable inside')
}

const client = new MongoClient(MONGODB_URL, {
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

export async function getEvents(): Promise<GetEvent[]> {
  //
  try {
    await client.connect()
    const events = await client
      .db('ondehoje')
      .collection<GetEvent>('events')
      .find({
        eventDate: {
          $gt: new Date(Date.now() - 1000 * 60 * 60 * 24),
        },
      })
      .toArray()

    return events
  } catch (error) {
    console.error('Error getting events', error)
    throw error
  } finally {
    await client.close()
  }
}

export async function saveEvent(event: Event): Promise<void> {
  try {
    await client.connect()
    await client.db('ondehoje').collection<Event>('events').insertOne(event)
    console.log('Event saved')
  } catch (error) {
    console.error('Error saving event', error)
    throw error
  } finally {
    await client.close()
  }
}

export async function editEvent(event: Event): Promise<void> {
  try {
    await client.connect()
    const o_id = new ObjectId(event._id)
    delete event._id
    await client
      .db('ondehoje')
      .collection<Event>('events')
      .updateOne({ _id: o_id }, { $set: event })
    console.log('Event edited')
  } catch (error) {
    console.error('Error editing event', error)
    handleError(error)
    throw error
  } finally {
    await client.close()
  }
}

export async function deleteEvent(id: ObjectId): Promise<void> {
  try {
    await client.connect()
    const o_id = new ObjectId(id)

    await client
      .db('ondehoje')
      .collection<Event>('events')
      .deleteOne({ _id: o_id })
    console.log('Event deleted')
  } catch (error) {
    console.error('Error deleting event', error)
    throw error
  } finally {
    await client.close()
  }
}

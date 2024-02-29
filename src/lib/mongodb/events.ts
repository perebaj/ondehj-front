'use server'
import { ObjectId } from 'mongodb'

import { handleError } from '../utils'
import { client, Event, GetEvent } from './db'
export async function getEvents(): Promise<GetEvent[]> {
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
      .sort({ eventDate: 1 }) // Sort by eventDate in descending order
      .toArray()

    return events
  } catch (error) {
    console.error('Error getting events', error)
    throw error
  } finally {
    await client.close()
  }
}

export type PromoteEvent = {
  _id?: ObjectId
  eventId: ObjectId
  promotionCount: number
  users: string[]
}

export async function promoteEvent(
  eventId: ObjectId,
  userId: string,
): Promise<void> {
  try {
    await client.connect()

    const o_eventId = new ObjectId(eventId)

    // verify if the promoted event exists
    const pEvent = await client
      .db('ondehoje')
      .collection<PromoteEvent>('promotedEvents')
      .findOne({ eventId: o_eventId })
    // if not exists, create it
    if (!pEvent) {
      await client
        .db('ondehoje')
        .collection<PromoteEvent>('promotedEvents')
        .insertOne({
          eventId: o_eventId,
          promotionCount: 1,
          users: [userId],
        })
      console.log('Event promoted created')
    } else {
      await client
        .db('ondehoje')
        .collection<PromoteEvent>('promotedEvents')
        .findOneAndUpdate(
          { eventId: o_eventId, users: { $nin: [userId] } },
          {
            $inc: { promotionCount: 1 },
            $push: { users: userId },
          },
        )

      console.log('Event promoted')
    }
  } catch (error) {
    console.error('Error promoting event', error)
    throw error
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

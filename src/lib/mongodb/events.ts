'use server'
import { ObjectId } from 'mongodb'

import { handleError } from '../utils'
import { client, Event, GetEvent } from './db'
export async function getEvents(): Promise<GetEvent[]> {
  try {
    await client.connect()
    const events = await client
      .db()
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

export async function saveEvent(event: Event): Promise<void> {
  try {
    await client.connect()
    await client.db().collection<Event>('events').insertOne(event)
    console.log('Event saved')
    event.likes = [] // Inicializa o array de likes
  } catch (error) {
    console.error('Error saving event', error)
    throw error
  } finally {
    await client.close()
  }
}

export async function editEvent(event: Event, userId: ObjectId): Promise<void> {
  try {
    await client.connect()
    const o_id = new ObjectId(event._id)
    delete event._id

    // Verifica se o usuário já deu like
    const existingEvent = await client
      .db()
      .collection<Event>('events')
      .findOne({ _id: o_id })

    if (
      existingEvent &&
      !existingEvent.likes.some((like) => like.userId.equals(userId))
    ) {
      // Adiciona o like se o usuário não tiver dado like
      await client
        .db()
        .collection<Event>('events')
        .updateOne({ _id: o_id }, { $push: { likes: { userId } } })
      console.log('Like added')
    } else {
      console.log('User has already liked this event')
    }
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

    await client.db().collection<Event>('events').deleteOne({ _id: o_id })
    console.log('Event deleted')
  } catch (error) {
    console.error('Error deleting event', error)
    throw error
  } finally {
    await client.close()
  }
}

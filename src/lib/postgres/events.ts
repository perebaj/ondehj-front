// All database operations related to events will be defined here.
'use server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// EventCreateSchema should be used to validate the event data before creating the event.
export interface EventCreateSchema {
  name: string
  type?: string
  description: string
  university_name: string
  instagram_url: string
  user_id: string
  event_date: Date
}

// EventUpdateSchema should be used to update the event data. All fields are optional.
export interface EventUpdateSchema {
  id: string
  name?: string
  type?: string
  description?: string
  university_name?: string
  instagram_url?: string
  user_id: string
  event_date?: Date
}

export async function createEvent(event: EventCreateSchema) {
  try {
    await prisma.event.create({ data: event })
  } catch (error) {
    console.error(error)
  }
}

export async function getEventById(id: string) {
  return await prisma.event.findUnique({
    where: { id },
  })
}

// getAllEvents
export async function getAllEvents(university_name: string) {
  return await prisma.event.findMany({
    where: {
      AND: [
        {
          university_name,
        },
        {
          event_date: {
            gt: new Date(Date.now() - 1000 * 60 * 60 * 24),
          },
        },
      ],
    },
    orderBy: {
      event_date: 'asc',
    },
  })
}

export async function updateEvent(event_data: EventUpdateSchema) {
  return await prisma.event.update({
    where: { id: event_data.id },
    data: event_data,
  })
}

export async function deleteEvent(id: string) {
  return await prisma.event.delete({
    where: { id },
  })
}

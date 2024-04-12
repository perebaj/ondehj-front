// All database operations related to events will be defined here.
'use server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export interface EventCreateSchema {
  name: string
  type?: string
  description: string
  university_name: string
  instagram_url: string
  user_id: string
  event_date: Date
}

// Create
export async function createEvent(event: EventCreateSchema) {
  try {
    await prisma.event.create({ data: event })
  } catch (error) {
    console.error(error)
  }
}

// // Read
export async function getEventById(id: string) {
  return await prisma.event.findUnique({
    where: { id },
  })
}

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

// // Update
// export async function updateEvent(id: string, updatedData: ) {
//   return await prisma.event.update({
//     where: { id },
//     data: updatedData,
//   })
// }

// // Delete
export async function deleteEvent(id: string) {
  return await prisma.event.delete({
    where: { id },
  })
}

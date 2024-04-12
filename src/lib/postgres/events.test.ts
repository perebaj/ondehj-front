// All tests related to events operations will be placed here.

import prisma from './db'
import { createEvent, getAllEvents } from './events'
import { createUser, UserCreateSchema } from './users'
afterEach(async () => {
  const deleteAllUsers = prisma.user.deleteMany()
  const deleteAllEvents = prisma.event.deleteMany()

  await prisma.$transaction([deleteAllEvents, deleteAllUsers])

  await prisma.$disconnect()
})

test('createEvent', async () => {
  await prisma.user.create({
    data: {
      email: 'test@gmail.com',
      role: 'USER',
      user_id: '1234',
      first_name: 'test',
      last_name: 'test',
      profile_image_url: 'test',
    },
  })

  await createEvent({
    name: 'test',
    description: 'test',
    university_name: 'test',
    instagram_url: 'test',
    user_id: '1234',
    type: 'academico',
    event_date: new Date(),
  })

  const got = await prisma.event.findFirst({
    where: {
      name: 'test',
    },
  })

  expect(got?.name).toEqual('test')
  expect(got?.description).toEqual('test')
  expect(got?.university_name).toEqual('test')
  expect(got?.instagram_url).toEqual('test')
  expect(got?.user_id).toEqual('1234')
})

test('getAllEvents', async () => {
  const user: UserCreateSchema = {
    email: 't@gmail.com',
    role: 'USER',
    user_id: '1234',
    first_name: 'test',
    last_name: 'test',
    profile_image_url: 'test',
  }

  await createUser(user)

  await createEvent({
    name: 'event1',
    description: 'event1',
    university_name: 'ufscar',
    instagram_url: 'event1instagram',
    user_id: user.user_id,
    event_date: new Date(),
    type: 'academico',
  })

  // the getAllEvents function have a filter to get only events that happened starting from 1 day ago to the future
  const twoDaysAgo = new Date()
  twoDaysAgo.setDate(twoDaysAgo.getDate() - 2)

  await createEvent({
    name: 'event2',
    description: 'event2',
    university_name: 'ufscar',
    instagram_url: 'event2instagram',
    user_id: user.user_id,
    event_date: twoDaysAgo,
    type: 'academico',
  })

  const twoDaysAfter = new Date()
  twoDaysAfter.setDate(twoDaysAfter.getDate() + 2)
  await createEvent({
    name: 'event3',
    description: 'event3',
    university_name: 'ufscar',
    instagram_url: 'event3instagram',
    user_id: user.user_id,
    event_date: twoDaysAfter,
    type: 'academico',
  })

  const got = await getAllEvents('ufscar')

  expect(got.length).toEqual(2)
  // The order of the events is ordered by the event_data, starting from the most closest to right now to the future
  expect(got[0].name).toEqual('event1')
  expect(got[0].description).toEqual('event1')
  expect(got[0].university_name).toEqual('ufscar')
  expect(got[0].instagram_url).toEqual('event1instagram')
  expect(got[0].user_id).toEqual(user.user_id)
  // event3 is the second event because it is the closest to the future
  expect(got[1].name).toEqual('event3')
  expect(got[1].description).toEqual('event3')
  expect(got[1].university_name).toEqual('ufscar')
  expect(got[1].instagram_url).toEqual('event3instagram')
  expect(got[1].user_id).toEqual(user.user_id)
})

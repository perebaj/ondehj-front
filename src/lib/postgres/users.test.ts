import prisma from './db'
import { createUser, deleteUser, getUserById, UserCreateSchema } from './users'

// clean up the database after each test
// This approach to cleaning up, it's the best, I think that create a new database for each test and after that delete the whole db
// it's more perfomatic than run a transaction in the end of each test
// This approach wan't implement because prisma doesn't support run migration programmatically
afterEach(async () => {
  const deleteAllUsers = prisma.user.deleteMany()

  await prisma.$transaction([deleteAllUsers])

  await prisma.$disconnect()
})

test('createUser', async () => {
  // create a user
  const want: UserCreateSchema = {
    email: 't@gmail.com',
    role: 'USER',
    user_id: '1234',
    first_name: 'test',
    last_name: 'test',
    profile_image_url: 'test',
  }

  await createUser(want)

  const got = await prisma.user.findUnique({
    where: {
      user_id: want.user_id,
    },
  })

  // assert got fields with want fields
  expect(want.email).toEqual(got?.email)
  expect(want.role).toEqual(got?.role)
  expect(want.user_id).toEqual(got?.user_id)
  expect(want.first_name).toEqual(got?.first_name)
  expect(want.last_name).toEqual(got?.last_name)
  expect(want.profile_image_url).toEqual(got?.profile_image_url)
})

test('getUserById_NotExist', async () => {
  const got = await getUserById('1234')

  expect(got).toBeNull()
})

test('getUserById', async () => {
  // create a user
  const want: UserCreateSchema = {
    email: 't@gmail.com',
    role: 'USER',
    user_id: '1234',
    first_name: 'test',
    last_name: 'test',
    profile_image_url: 'test',
  }

  await prisma.user.create({ data: want })

  const got = await getUserById(want.user_id)

  expect(want.email).toEqual(got?.email)
  expect(want.role).toEqual(got?.role)
  expect(want.user_id).toEqual(got?.user_id)
  expect(want.first_name).toEqual(got?.first_name)
  expect(want.last_name).toEqual(got?.last_name)
  expect(want.profile_image_url).toEqual(got?.profile_image_url)
})

test('deleteUser', async () => {
  const want: UserCreateSchema = {
    email: 'test@gmail.com',
    role: 'USER',
    user_id: '1234',
    first_name: 'test',
    last_name: 'test',
    profile_image_url: 'test',
  }

  await prisma.user.create({ data: want })

  const result: object[] = await prisma.$queryRaw`SELECT * FROM public.user`

  expect(result.length).toBe(1)

  await deleteUser(want.user_id)

  const resultAfterDelete: object[] =
    await prisma.$queryRaw`SELECT * FROM public.user`

  expect(resultAfterDelete.length).toBe(0)
})

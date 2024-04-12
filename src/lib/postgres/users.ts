'use server'

import prisma from './db'

export interface UserCreateSchema {
  email: string
  first_name?: string
  last_name?: string
  profile_image_url?: string
  role: string
  user_id: string
}

declare type UpdateUserParams = {
  first_name?: string
  last_name?: string
  profile_image_url?: string
  role?: string
}

export async function createUser(user: UserCreateSchema) {
  try {
    await prisma.user.create({ data: user })
  } catch (error) {
    console.error(error)
  }
}

export async function getUserById(userId: string) {
  try {
    const user = await prisma.user.findUnique({ where: { user_id: userId } })
    return user
  } catch (error) {
    console.error(error)
  }
}

export async function users() {
  try {
    const users = await prisma.user.findMany()
    console.log('Users found')
    return users
  } catch (error) {
    console.error(error)
  }
}

export async function updateUser(clerkId: string, user: UpdateUserParams) {
  try {
    const updatedUser = await prisma.user.update({
      where: { user_id: clerkId },
      data: user,
    })
    console.log('User updated')
    return updatedUser
  } catch (error) {
    console.error(error)
  }
}

export async function deleteUser(clerkId: string) {
  try {
    await prisma.user.delete({ where: { user_id: clerkId } })
    console.log('User deleted')
  } catch (error) {
    console.error(error)
  }
}

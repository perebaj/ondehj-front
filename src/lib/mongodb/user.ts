'use server'

import { DeleteResult, WithId } from 'mongodb'
import { revalidatePath } from 'next/cache'

import { handleError } from '../utils'
import { client } from './db'

declare type CreateUserParams = {
  clerkId: string
  email: string
  firstName: string
  lastName: string
  photo: string
}

declare type UpdateUserParams = {
  firstName?: string
  lastName?: string
  photo?: string
}

export async function createUser(user: CreateUserParams) {
  try {
    await client.connect()

    await client
      .db('ondehoje')
      .collection<CreateUserParams>('users')
      .insertOne(user)
    console.log('user created')
  } catch (error) {
    handleError(error)
  }
}

export async function getUserById(
  userId: string,
): Promise<WithId<CreateUserParams> | null | undefined> {
  try {
    await client.connect()

    const user = await client
      .db('ondehoje')
      .collection<CreateUserParams>('users')
      .findOne({ clerkId: userId })

    console.log('User found')
    return user
  } catch (error) {
    handleError(error)
  }
}

export async function updateUser(
  clerkId: string,
  user: UpdateUserParams,
): Promise<CreateUserParams | undefined> {
  try {
    await client.connect()

    const updatedUser = await client
      .db('ondehoje')
      .collection<CreateUserParams>('users')
      .findOneAndUpdate(
        { clerkId },
        { $set: user },
        { returnDocument: 'after' },
      )

    if (!updatedUser) throw new Error('User update failed')
    console.log('User updated')
    return updatedUser
  } catch (error) {
    handleError(error)
  }
}

export async function deleteUser(
  clerkId: string,
): Promise<DeleteResult | undefined> {
  try {
    await client.connect()

    const userToDelete = await getUserById(clerkId)

    if (!userToDelete) {
      throw new Error('User not found')
    }

    const deletedUser = await client
      .db('ondehoje')
      .collection<CreateUserParams>('users')
      .deleteOne({ clerkId: userToDelete.clerkId })

    revalidatePath('/')
    console.log('User deleted')

    return deletedUser
  } catch (error) {
    handleError(error)
  }
}

// export async function updateCredits(userId: string, creditFee: number) {
//   try {
//     await connectToDatabase()

//     const updatedUserCredits = await User.findOneAndUpdate(
//       { _id: userId },
//       { $inc: { creditBalance: creditFee } },
//       { new: true },
//     )

//     if (!updatedUserCredits) throw new Error('User credits update failed')

//     return JSON.parse(JSON.stringify(updatedUserCredits))
//   } catch (error) {
//     handleError(error)
//   }
// }

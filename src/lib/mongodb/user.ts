'use server'

import { model, models, Schema } from 'mongoose'
import { revalidatePath } from 'next/cache'

import { handleError } from '../utils'
// import User from '../database/models/user.model'
import { connectToDatabase } from './mongoose'

const UserSchema = new Schema({
  clerkId: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  photo: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  planId: {
    type: Number,
    default: 1,
  },
  creditBalance: {
    type: Number,
    default: 10,
  },
})

const User = models?.User || model('User', UserSchema, 'users')

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

// CREATE
export async function createUser(user: CreateUserParams) {
  try {
    await connectToDatabase()
    console.log('await')

    const newUser = await User.create(user)
    console.log('user created')
    return JSON.parse(JSON.stringify(newUser))
  } catch (error) {
    handleError(error)
  }
}

// READ
export async function getUserById(userId: string) {
  try {
    await connectToDatabase()

    const user = await User.findOne({ clerkId: userId })

    if (!user) throw new Error('User not found')

    return JSON.parse(JSON.stringify(user))
  } catch (error) {
    handleError(error)
  }
}

// UPDATE
export async function updateUser(clerkId: string, user: UpdateUserParams) {
  try {
    await connectToDatabase()

    const updatedUser = await User.findOneAndUpdate({ clerkId }, user, {
      new: true,
    })

    if (!updatedUser) throw new Error('User update failed')

    return JSON.parse(JSON.stringify(updatedUser))
  } catch (error) {
    handleError(error)
  }
}

// DELETE
export async function deleteUser(clerkId: string) {
  try {
    await connectToDatabase()

    // Find user to delete
    const userToDelete = await User.findOne({ clerkId })

    if (!userToDelete) {
      throw new Error('User not found')
    }

    // Delete user
    const deletedUser = await User.findByIdAndDelete(userToDelete._id)
    revalidatePath('/')

    return deletedUser ? JSON.parse(JSON.stringify(deletedUser)) : null
  } catch (error) {
    handleError(error)
  }
}

// USE CREDITS
export async function updateCredits(userId: string, creditFee: number) {
  try {
    await connectToDatabase()

    const updatedUserCredits = await User.findOneAndUpdate(
      { _id: userId },
      { $inc: { creditBalance: creditFee } },
      { new: true },
    )

    if (!updatedUserCredits) throw new Error('User credits update failed')

    return JSON.parse(JSON.stringify(updatedUserCredits))
  } catch (error) {
    handleError(error)
  }
}

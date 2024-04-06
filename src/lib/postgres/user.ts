// import { z } from 'zod'
'use server'
import prisma from './db'

// const userProps = z.object({
//   email: z
//     .string()
//     .email({ message: 'Invalid email' })
//     .nonempty()
//     .describe('User email'),
//   first_name: z
//     .string()
//     .regex(/^[a-zA-Z]+$/, { message: 'First name must only contain letters' })
//     .describe('User first name'),
//   profile_image_url: z
//     .string()
//     .url({ message: 'Invalid URL' })
//     .optional()
//     .describe('User profile image URL'),
// })

// type userProps = z.infer<typeof userProps>

// function userCreate(user: userProps) {
//   return prisma.user.create({
//     data: {
//       email: user.email,
//       first_name: user.first_name,
//       profile_image_url: user.profile_image_url,
//     },
//   })
// }

export async function getUsers() {
  return prisma.user.findMany()
}

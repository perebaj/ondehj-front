import { WebhookEvent } from '@clerk/nextjs/server'
import { headers } from 'next/headers'
import { NextResponse } from 'next/server'
import { Webhook } from 'svix'

import {
  createUser,
  deleteUser,
  getUserById,
  updateUser,
} from '@/lib/postgres/users'

export async function POST(req: Request) {
  // You can find this in the Clerk Dashboard -> Webhooks -> choose the webhook
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET

  if (!WEBHOOK_SECRET) {
    throw new Error(
      'Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local',
    )
  }

  // Get the headers
  const headerPayload = headers()
  const svix_id = headerPayload.get('svix-id')
  const svix_timestamp = headerPayload.get('svix-timestamp')
  const svix_signature = headerPayload.get('svix-signature')

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Error occured -- no svix headers', {
      status: 400,
    })
  }

  // Get the body
  const payload = await req.json()
  const body = JSON.stringify(payload)

  // Create a new Svix instance with your secret.
  const wh = new Webhook(WEBHOOK_SECRET)

  let evt: WebhookEvent

  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    }) as WebhookEvent
  } catch (err) {
    console.error('Error verifying webhook:', err)
    return new Response('Error occured', {
      status: 400,
    })
  }

  const eventType = evt.type

  console.log(body)
  if (eventType === 'user.created' || eventType === 'user.updated') {
    try {
      const {
        id,
        first_name,
        last_name,
        image_url,
        email_addresses,
        public_metadata,
      } = evt.data

      const u = await getUserById(id)
      if (!u) {
        await createUser({
          email: email_addresses[0].email_address,
          first_name,
          last_name,
          profile_image_url: image_url,
          role: public_metadata.role as string,
          user_id: id,
        })

        return NextResponse.json({ message: 'User created' }, { status: 200 })
      } else {
        await updateUser(id, {
          first_name,
          last_name,
          profile_image_url: image_url,
          role: public_metadata.role as string,
        })

        return NextResponse.json({ message: 'User updated' }, { status: 200 })
      }
    } catch (error) {
      console.error(error)
      return NextResponse.json({ message: 'Error occured' }, { status: 500 })
    }
  } else if (eventType === 'user.deleted') {
    try {
      const { id } = evt.data
      if (!id) {
        return NextResponse.json({ message: 'User not found' }, { status: 404 })
      }

      const u = await getUserById(id)

      if (u) {
        await deleteUser(id)

        return NextResponse.json({ message: 'User deleted' }, { status: 200 })
      } else {
        return NextResponse.json({ message: 'User not found' }, { status: 404 })
      }
    } catch (error) {
      console.error(error)
      return NextResponse.json({ message: 'Error occured' }, { status: 500 })
    }
  } else {
    return NextResponse.json({ message: 'Event not handled' }, { status: 405 })
  }
}

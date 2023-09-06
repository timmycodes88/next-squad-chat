'use server'

import { MemberRole } from '@prisma/client'
import { currentProfile } from '../current-profile'
import { db } from '../db'
import { v4 as uuidv4 } from 'uuid'

interface CreateServerPayload {
  name: string
  imageUrl: string
}

export async function createServer({ name, imageUrl }: CreateServerPayload) {
  try {
    const profile = await currentProfile()

    if (!profile) return { error: 'You must be logged in to create a server' }

    const server = await db.server.create({
      data: {
        profileId: profile.id,
        name,
        imageUrl,
        inviteCode: uuidv4(),
        channels: {
          create: [{ name: 'general', profileId: profile.id }],
        },
        members: {
          create: [{ profileId: profile.id, role: MemberRole.ADMIN }],
        },
      },
    })

    return { server }
  } catch (err: any) {
    console.error('[CREATE SERVER ERROR]: ', err)
    return { error: err.message }
  }
}

import { currentProfile } from '@/lib/current-profile'
import { db } from '@/lib/db'
import { redirectToSignIn } from '@clerk/nextjs'
import { ChannelType } from '@prisma/client'
import { redirect } from 'next/navigation'
import ServerHeader from './ServerHeader'

interface ServerSidebarProps {
  serverId: string
}
export default async function ServerSidebar({ serverId }: ServerSidebarProps) {
  const profile = await currentProfile()

  if (!profile) return redirectToSignIn()

  const server = await db.server.findUnique({
    where: {
      id: serverId,
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
    include: {
      channels: {
        orderBy: {
          createdAt: 'asc',
        },
      },
      members: {
        include: {
          profile: true,
        },
        orderBy: {
          role: 'asc',
        },
      },
    },
  })

  if (!server) return redirect('/')

  const textChannels = server?.channels.filter(c => c.type === ChannelType.TEXT)
  const audioChannels = server?.channels.filter(
    c => c.type === ChannelType.AUDIO
  )
  const videoChannels = server?.channels.filter(
    c => c.type === ChannelType.VIDEO
  )
  const members = server?.members.filter(m => m.profileId !== profile.id)

  const role = server?.members.find(m => m.profileId === profile.id)?.role

  return (
    <div className='flex flex-col h-full text-primary w-full dark:bg-[#2B2D31] bg-[#F2F3F5]'>
      <ServerHeader server={server} role={role} />
    </div>
  )
}

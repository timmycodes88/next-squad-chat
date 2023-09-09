import ChatHeader from '@/components/chat/ChatHeader'
import { getConversation } from '@/lib/conversation'
import { currentProfile } from '@/lib/current-profile'
import { db } from '@/lib/db'
import { redirectToSignIn } from '@clerk/nextjs'
import { redirect } from 'next/navigation'

interface ConversationPageProps {
  params: { serverId: string; memberId: string }
}

export default async function page({
  params: { serverId, memberId },
}: ConversationPageProps) {
  const profile = await currentProfile()

  if (!profile) return redirectToSignIn()

  const currMember = await db.member.findFirst({
    where: {
      serverId,
      profileId: profile.id,
    },
    include: {
      profile: true,
    },
  })

  if (!currMember) return redirect('/')

  const conversation = await getConversation(currMember.id, memberId)

  if (!conversation) return redirect(`/servers/${serverId}`)

  const { memberOne, memberTwo } = conversation

  const otherMember = memberOne.id === currMember.id ? memberTwo : memberOne

  return (
    <div className='bg-white dark:bg-[#313338] flex flex-col h-full'>
      <ChatHeader
        name={otherMember.profile.name}
        serverId={serverId}
        type='conversation'
        imageUrl={otherMember.profile.imageUrl}
      />
    </div>
  )
}